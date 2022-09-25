import json
import pandas as pd
import matplotlib.pyplot as plt

mockData = 'mockInvestment.json'
plaidData = 'something.json'
rawDataInvestment = json.load(open(mockData))

currHolding = []
for i in rawDataInvestment['holdings']:
    targetCol = ['cost_basis','institution_price','institution_value','quantity','security_id']
    temp = {}
    for col in targetCol:
        temp[col]=i[col]
    currHolding.append(temp)
currHoldingDf = pd.DataFrame(currHolding)

currSecurity = []
for i in rawDataInvestment['securities']:
    targetCol = ['close_price','ticker_symbol','type','name','security_id']
    temp = {}
    for col in targetCol:
        temp[col]=i[col]
    currSecurity.append(temp)
currSecurityDf = pd.DataFrame(currSecurity)

totalInvestmentDf = currHoldingDf.merge(currSecurityDf,on='security_id')

totalAmountOfInvestment = sum(totalInvestmentDf[totalInvestmentDf['type']!='cash']['institution_value'])
totalAmountOfnonInvest = sum(totalInvestmentDf[totalInvestmentDf['type']=='cash']['institution_value'])
temp = [totalInvestmentDf['type']=='cash'][0]
cashIndex = []
for i in range(len(temp)):
  if temp[i] == True:
    cashIndex.append(i)
# print(cashIndex)
totalInvestmentDf.drop(cashIndex,inplace=True)
totalAmountOfStock = sum(totalInvestmentDf[totalInvestmentDf['type']!='cryptocurrency']['institution_value'])
totalAmountOfCrypto = sum(totalInvestmentDf[totalInvestmentDf['type']=='cryptocurrency']['institution_value'])

# print("total amount of invest: ",totalAmountOfInvestment)
# print("total amount of cash in investaccount: ",totalAmountOfnonInvest)
# print("total amount of stock in USD: ",totalAmountOfStock)
# print("total amount of crypto in USD: ",totalAmountOfCrypto)
# print("checking the calculation: ",totalAmountOfInvestment == (totalAmountOfStock + totalAmountOfCrypto))

# labels = 'Cash','Stock','Crypto'
# sizes = [totalAmountOfnonInvest, totalAmountOfStock,totalAmountOfCrypto]
# explode=(0,0.1,0)
# fig1, ax1 = plt.subplots()
# ax1.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',shadow=True, startangle=90)
# ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
# plt.show()

aggressiveIdealInvestRatio = {"Cash":0.15,"Stock":0.8,"Crypto":0.05}
defensiveIdealInvestRatio = {"Cash":0.68,"Stock":0.3,"Crypto":0.02}
currInvestRatio = {"Cash":0,"Stock":0,"Crypto":0}
totalAmountInvestAccount = totalAmountOfInvestment+totalAmountOfnonInvest
currInvestRatio["Cash"] = round(totalAmountOfnonInvest / totalAmountInvestAccount,4)
currInvestRatio["Stock"] = round(totalAmountOfInvestment / totalAmountInvestAccount,4)
currInvestRatio["Crypto"] = round(totalAmountOfCrypto / totalAmountInvestAccount,4)
# print(currInvestRatio)

if currInvestRatio['Cash'] > 0.5:
    idealInvestRatio = defensiveIdealInvestRatio
else:
    idealInvestRatio = aggressiveIdealInvestRatio

investmentScore = 500

investmentScore -= ((currInvestRatio["Cash"] - idealInvestRatio["Cash"])  * 20)**2
investmentScore -= ((currInvestRatio["Stock"] - idealInvestRatio["Stock"]) * 20)**2
investmentScore -= ((currInvestRatio["Crypto"] - idealInvestRatio["Crypto"])* 40)**2

# print(investmentScore)

def getinvestmentScore():
    return investmentScore