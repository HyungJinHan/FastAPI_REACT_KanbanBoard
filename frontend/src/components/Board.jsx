import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

function Board(props) {
  // const initialData = { tasks: {}, columns: {}, columnOrder: [] }
  const [board, setBoard] = useState({
    tasks: {},
    columns: {},
    columnOrder: []
  }); // or useState(initialData)

  useEffect(() => {
    fetchBoard().then(
      data => setBoard(data)
    );
  }, []);

  async function fetchBoard() {
    const response = await fetch('/board');
    const data = await response.json();

    console.log(data);
    return data.board;
  }

  return (
    <Container>
      board
    </Container>
  );
};

export default Board;