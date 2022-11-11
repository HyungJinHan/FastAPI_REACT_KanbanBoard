import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid black;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`

function Task(props) {
  function deleteTask(columnId, index, taskId) {
    if(window.confirm('내용을 삭제하시겠습니까?')) {
      const column = props.board.columns[columnId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(index, 1);

      const tasks = props.board.tasks;
      const {[taskId]: oldTask, ...newTasks} = tasks;

      props.setBoard({
        ...props.board,
        tasks: {
          ...newTasks
        },
        columns: {
          ...props.board.columns,
          [columnId]: {
            ...column,
            taskIds: newTaskIds
          }
        }
      });

      alert("내용을 삭제합니다.");
    } else {
      alert("삭제를 취소합니다.");
    }
  }

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {provided => (
        <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {props.task.content}
          <span onClick={() => deleteTask(props.columnId, props.index, props.task.id)}>&nbsp;&nbsp;X</span>
        </Container>
      )}
    </Draggable>
  );
}

export default Task;