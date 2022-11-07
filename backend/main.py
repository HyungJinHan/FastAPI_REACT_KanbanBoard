from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = {
    "http://localhost",
    "http://localhost:3000",
}

app.add_middleware(
   CORSMiddleware,
    allow_origins = origins,
    allow_credentials =True,
    allow_methods = ["*"],
    allow_headers= ["*"],
)

@app.get('/board')

def get_board():
  board_data = {
    'tasks': {
      'task-1': {'id': 'task-1', 'content': 'write profile'},
      'task-2': {'id': 'task-2', 'content': 'study FastAPI'},
      'task-3': {'id': 'task-3', 'content': 'make PPT'},
      'task-4': {'id': 'task-4', 'content': 'prepare project'}
    },
    'columns': {
      'column-1': {
        'id': 'column-1',
        'title': 'To Do 🤞',
        'taskIds': ['task-1', 'task-2']
      },
      'column-2': {
        'id': 'column-2',
        'title': 'Doing 🚶',
        'taskIds': ['task-3', 'task-4']
      }
    },
    'columnOrder': ['column-1', 'column-2']
  }

  return {'board': board_data}