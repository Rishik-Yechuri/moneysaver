from datetime import datetime, timedelta, timezone
from dateutil.relativedelta import relativedelta

save = ['']
variable = ['GENERAL_SERVICES', ]
fixed = ['LOAN_PAYMENTS', 
         'BANK_FEES', 
         'MEDICAL', 
         'GOVERNMENT_AND_NON_PROFIT',
         'GENERAL_MERCHANDISE.GENERAL_MERCHANDISE_SUPERSTORES',
         'GENERAL_MERCHANDISE.GENERAL_MERCHANDISE_DEPARTMENT_STORES',
         'HOME_IMPROVEMENT',
         'GENERAL_SERVICES',
         'TRANSPORTATION',
         'RENT_AND_UTILITIES',
         ]

def fetch_oldest_time(income_response):
    
    oldest_date = datetime.now(timezone.utc)
    for income_unit in income_response['bank_income']['historical_summary']:
        
        #aggregate for income 
        start_date = datetime.strptime(income_unit['start_date'], "%Y-%m-%d").date()
        if start_date<oldest_date:
            oldest_date = start_date
    
    return oldest_date

def factor_1(user_data, income_response, expense_response, date=datetime.now(timezone.utc)):
    
    end_date = date
    start_date = date - relativedelta(month=1)
    monthly_variableCost = 0
    monthly_fixedCost = 0
    monthly_debt = 0
    monthly_income = 0

    for income_unit in income_response['bank_income'][0]['bank_income_summary']['historical_summary']:
        
        # Monthly income
        if datetime.strptime(income_unit['start_date'], '%Y-%m-%d').month==start_date.month:
            #aggregate for income 
            start_date = datetime.strptime(income_unit['start_date'], "%Y-%m-%d").date()
            #end_date = datetime.strptime(income_unit['end_date'], "%Y-%m-%d").date()
            monthly_income = income_unit['total_amount']

    for expense_unit in expense_response['transactions']: #response = client.transactions_get(request)
        # Monthly debt
        if '.'.join(expense_unit['category']).startswith('LOAN'):
            monthly_debt = expense_unit['amount']
        
        # Monthly fixed/variable expense
        if datetime.strptime(expense_unit['date'], '%Y-%m-%d').month==start_date.month:
            #aggregate for expense
            exp_date = datetime.strptime(expense_unit['date'], "%Y-%m-%d").date()
            if '.'.join(expense_unit['category']) in fixed:
                monthly_fixedCost = expense_unit['amount']
            elif '.'.join(expense_unit['category']) in variable:
                monthly_variableCost = expense_unit['amount']
    
    result_score = (monthly_variableCost/monthly_fixedCost)*(monthly_debt/monthly_income)
    
    return result_score

def factor_2(user_date, asset_response, liability_response, expense_response, date=datetime.now(timezone.utc)):
    
    total_asset = 0
    total_liability = 0
    yearly_expense = 0
    
    #Last year
    last_year = date.year
    
    #Total Asset
    for account in asset_response['report']['items']:
        total_asset += account['current']
    
    #Total liability
    for liability_unit in [lia for lia in liability_response if 'origination_principal_amount' in lia]:
        total_liability += liability_unit['origination_principal_amount']
    
    #Yearly expense
    for expense_unit in expense_response['transactions'][0]:
        exp_date = datetime.strptime(expense_unit['date'], "%Y-%m-%d").date()
        if exp_date.year == last_year:
            yearly_expense += expense_unit['amount']
    
    result_score = total_liability/total_asset/yearly_expense/4
    
    return result_score