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
    const column = props.board.column[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(index, 1);

    const tasks = props.state.tasks;
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
    })
  }

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {provided => (
        <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {props.task.content}
          <span>&nbsp;&nbsp;X</span>
        </Container>
      )}
    </Draggable>
  );
}

export default Task;