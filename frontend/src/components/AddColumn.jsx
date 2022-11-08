import React, { useState } from 'react';

function AddColumn(props) {
  const [showNewColumnButton, setShowNewColumnButton] = useState(true);
  const [value, setValue] = useState('');

  function addNewColumn(title) {
    const newColumnId = 'column-' + Math.floor(Math.random() * 1000000);

    const newColumnOrder = Array.from(props.board.columnOrder);

    newColumnOrder.push(newColumnId);

    const newColumn = {
      id: newColumnId,
      title: title,
      taskIds: []
    };

    props.setBoard({
      ...props.board,
      columns: {
        ...props.board.columns,
        [newColumnId]: newColumn
      },
      columnOrder: newColumnOrder
    });
  }

  function handleInputComplete() {
    setShowNewColumnButton(true);
    addNewColumn(value);
    setValue('');
  }

  return (
    <div>
      {
        showNewColumnButton ?
          <button onClick={() => setShowNewColumnButton(false)}>New Column</button> :
          <input
            type='text'
            value={value}
            onChange={
              (e) => setValue(e.target.value)
            }
            onBlur={handleInputComplete}
          />
      }
    </div>
  );
}

export default AddColumn;