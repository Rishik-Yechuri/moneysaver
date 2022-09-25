from fastapi import FastAPI
app = FastAPI()
import investScore as inS
import transactionScore as trS
import json

mockData = "mockTransaction.json"
rawDataInvestment = json.load(open(mockData))

# import requests
# x = requests.get('http://localhost:8000/api/holdings')
# print(x.json())

iSjson = {"investment Score":inS.getinvestmentScore()}
# iSjson = x.json()


@app.get("/investmentScore")
def test():
    return iSjson


@app.post("/getInvestmentScore")
def test():
    return iSjson

# to run api, command is
# [ uvicorn main:app --host 0.0.0.0 --port 8080 ]
# need to connect the plaid
@app.get("/factor1")
def test():
    return {"factor1":trS.factor1(user_data = mockData,income_response = [],expense_response = [])}

@app.get("/factor2")
def test():
    return {"factor2":trS.factor2(user_date = mockData, asset_response = [], liability_response = [],expense_response = [])}
