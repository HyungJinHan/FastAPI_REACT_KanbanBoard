from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tortoise import fields
from tortoise.contrib.fastapi import register_tortoise
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model
from typing import Dict

app = FastAPI()

origins = {
  "http://localhost",
  "http://localhost:3000",
}

app.add_middleware(
  CORSMiddleware,
  allow_origins = origins,
  allow_credentials = True,
  allow_methods = ["*"],
  allow_headers = ["*"],
)

class Task(BaseModel):
  id: str
  content: str


class Tasks(BaseModel): 
  __root__: Dict[str, Task]
  # 예제에서는 dict[str, Task] 사용
  # -> from typing import Dict 입력 후, dict를 Dict로 수정


class Column(BaseModel):
  id: str
  title: str
  taskIds: list


class Columns(BaseModel):
  __root__: Dict[str, Column]


class Board(BaseModel):
  tasks: Tasks
  columns: Columns
  columnOrder: list


class User(Model):
  id = fields.IntField(pk=True)
  username = fields.CharField(50, unique=True)
  password = fields.CharField(200)
  board = fields.JSONField(default={"tasks": {}, "columns": {}, "columnOrder": []})

User_Pydantic = pydantic_model_creator(User, name='User')
UserIn_Pydantic = pydantic_model_creator(User, name='UserIn', exclude_readonly=True, exclude=('board', ))

@app.get('/board')
async def get_board():
  user = await User.get(id=1)
  return {'board': user.board}

@app.post('/board')
async def save_board(board: Board):
  user = await User.get(id=1)
  user.board = board.json()
  await user.save()

  return {"status": "success"}

register_tortoise(
  app,
  db_url='mysql://root:123456@localhost:3306/kanbanboard',
  modules={'models': ['main']},
  generate_schemas=True,
  add_exception_handlers=True
)