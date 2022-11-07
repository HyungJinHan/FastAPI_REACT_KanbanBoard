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

  function onDragEnd() {
    alert('Dropped')
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