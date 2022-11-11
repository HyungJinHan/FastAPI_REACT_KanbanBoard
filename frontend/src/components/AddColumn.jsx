import React, { useRef, useState } from 'react';

function AddColumn(props) {
  const [showNewColumnButton, setShowNewColumnButton] = useState(true);
  const [value, setValue] = useState('');
  const newRef = useRef();

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
          <button
             onClick={
              async () => {
                await setShowNewColumnButton(false);
                await newRef.current.focus();
              }
             }
          >New Column</button> :
          <input
            type='text'
            ref={newRef}
            value={value}
            onChange={
              (e) => setValue(e.target.value)
            }
            onBlur={handleInputComplete}
            onKeyPress={
              (e) => {
                if (e.key === 'Enter') {
                  handleInputComplete()
                }
              }
            }
          />
      }
    </div>
  );
}

export default AddColumn;