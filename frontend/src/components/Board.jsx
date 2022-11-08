import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components'
import Column from './Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  display: flex;
`;

function Board(props) {
  const initialData = { tasks: {}, columns: {}, columnOrder: [] };

  const [board, setBoard] = useState(initialData)

  // const [board, setBoard] = useState({
  //   tasks: {},
  //   columns: {},
  //   columnOrder: []
  // }); // or useState(initialData)

  useEffect(() => {
    fetchBoard().then(
      data => setBoard(data)
    );
  }, []);

  async function fetchBoard() {
    const response = await fetch('http://localhost:8000/board');
    const data = await response.json();
    // console.log(data);
    return data.board;
  }

  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setBoard({
        ...board,
        columnOrder: newColumnOrder
      })

      return;
    }
    // 큰 보드 드래그 & 드랍 후 자리 유지하는 작업

    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.tastIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      setBoard({
        ...board,
        columns: {
          ...board.columns,
          [newColumn.id]: newColumn
        }
      });

      return;
    }
    // 큰 보드 내의 내용 드래그 & 드랍 후 자리 유지하는 작업
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {
              board.columnOrder.map((columnId, index) => {
                const column = board.columns[columnId];
                const tasks = column.taskIds.map(taskIds => board.tasks[taskIds]);
                return <Column key={column.id} column={column} tasks={tasks} index={index} />;
              })
            }
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;