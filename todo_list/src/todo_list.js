import React, { useState, useEffect } from 'react';
import { TextInput, Button, Checkbox, UnorderedList } from 'carbon-components-react';
import './App.css';

const LOCAL_STORAGE_KEY = "tasks"

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
  });
  const [task, setTask] = useState("");



  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

 

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
    }
  };

  const taskCompleted = index => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = index => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className='addTask'>
      <TextInput
        className="inputTask"
        id="task-input"
        placeholder="Insert task"
        labelText=""
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button kind="primary" className='taskBtn' onClick={addTask}>Add Task</Button>
      </div>
    

      
      {tasks.length > 0 ? (
        <UnorderedList>
          {tasks.map((task, index) => (
            <div key={index} className="task">
              <span className="taskName">{task.text}</span>
              {task.completed ? (
               <span>  ✔ </span>
              )
              : (
                <Checkbox
              className='checkbox'
                id={`task-${index}`}
                labelText=""
                checked={task.completed}
                onChange={() => taskCompleted(index)}
                style={{ borderRadius: '5px' }}
              />
              )
            }
              
              
              <Button  className='deleteBtn'  onClick={() => deleteTask(index)}>Delete</Button>
            </div>
          ))}
        </UnorderedList>
      ) : (
        <p>No tasks yet</p>
      )}
    </div>
  );
}

export default ToDoList;