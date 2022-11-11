import React, { useRef, useState } from 'react';

function AddTask(props) {
  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [value, setValue] = useState('');
  const newRef = useRef();

  function addNewTask(columnId, content) {
    const newTaskId = 'task-' + Math.floor(Math.random() * 1000000);

    const column = props.board.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);

    newTaskIds.push(newTaskId);

    const newTask = {
      id: newTaskId,
      content: content
    }

    props.setBoard({
      ...props.board,
      tasks: {
        ...props.board.tasks,
        [newTaskId]: newTask
      },
      columns: {
        ...props.board.columns,
        [columnId]: {
          ...props.board.columns[columnId],
          taskIds: newTaskIds
        }
      }
    })
  }
  // 새로운 항목 추가 작업

  function handleInputComplete(e) {
    setShowNewTaskButton(true);
    addNewTask(props.columnId, value);
    setValue('');
  }
  // 새로운 항목 추가 실행 작업

  return (
    <div>
      {
        showNewTaskButton ?
          <button 
            onClick={
              async () => {
                await setShowNewTaskButton(false);
                await newRef.current.focus();
              }
            }
          >New</button> :
          <input
            ref={newRef}
            type='text'
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

export default AddTask;