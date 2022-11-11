import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import AddTask from './AddTask';

const Container = styled.div`
  margin: 8px;
  border: 1px solid black;
  border-radius: 2px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  background-color: white;
`;

const Title = styled.h3`
  padding: 5px;
`;

const TaskList = styled.div`
  padding: 8px;
`;

function Column(props) {
  const deleteColumn = (columnId, index) => {
    if(window.confirm('컬럼을 삭제하시겠습니까?')) {
      const columnTasks = props.board.columns[columnId].taskIds;

      const finalTasks = columnTasks.reduce((previousValue, currentaValue) => {
        const { [currentaValue]: oldTask, ...newTasks } = previousValue;
        return newTasks;
      }, props.board.tasks);

      const columns = props.board.columns;
      const { [columnId]: oldColumn, ...newColumns } = columns;

      const newColumnOrder = Array.from(props.board.columnOrder);
      newColumnOrder.splice(index, 1);

      props.setBoard({
        tasks: {
          ...finalTasks
        },
        columns: {
          ...newColumns
        },
        columnOrder: newColumnOrder
      });
      
      alert("컬럼을 삭제합니다.");
    } else {
      alert("삭제를 취소합니다.");
    }
  }
  

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>
            {props.column.title}
            <span onClick={() => deleteColumn(props.column.id, props.index)}>&nbsp;&nbsp;X</span>
          </Title>
          <Droppable droppableId={props.column.id} type='task'>
            {provided => (
              <TaskList {...provided.draggableProps} ref={provided.innerRef}>
                {
                  props.tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} columnId={props.column.id} board={props.board} setBoard={props.setBoard} />
                  ))
                }
                {provided.placeholder}
                <AddTask columnId={props.column.id} board={props.board} setBoard={props.setBoard} />
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}

export default Column;