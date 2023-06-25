from typing import Union

from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import openai

app = FastAPI()

origins = [
"http://localhost:3000/",
"http://localhost:8000/","*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Data(BaseModel):
    name:str | None = None
    dob:str  | None = None
    race:str  | None = None
    gender:str | None = None
    height:str | None = None
    weight:str | None = None
    a1c:str    | None = None
    medicine:str | None = None


import json
@app.post("/")
async def data(data : Data):
    dict_obj = {
            "name":data.name,
            "dob":data.dob,
            "race":data.race,
            "gender":data.gender,
            "height":data.height,
            "weight":data.weight,
            "a1c":data.a1c,
            "medicine":data.medicine,
                }
    with open('user_data.json','w') as fp:
        json.dump(dict_obj, fp)
    return data

class Ques(BaseModel):
    que : str

@app.post("/prompt")
async def get_question(que : Ques):
    temp= que.__str__()
    temp = temp.split('=')
    with open('questions.json','w') as fp:
        json.dump(str(temp[1]), fp)
    return que




@app.get("/prompt")

async def prompt():
    
    with open('questions.json','r') as fp:
        questions = json.load(fp)
    fp = open('questions.json', 'w')
    fp.close()

    with open("user_data.json") as fp:
        data = json.load(fp)
    
    user_data = data['medicine']

    final_question = f"my prescription is {user_data} and my question is {questions} explain in points"

    return final_question
    '''
    def pass_question(final_question):
        openai.api_key = ""
        completion = openai.Completion.create(
            model='text-davinci-003',
            prompt=final_question,
            max_tokens=1024,
            n=1,
            temperature=0.5,
            stop=None
            )
        response = completion.choices[0].text
        print(final_question)
        return response

    return pass_question(final_question)
    '''
