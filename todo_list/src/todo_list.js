import React, { useState, useEffect } from 'react';
import { TextInput, Button, Checkbox, ListItem, UnorderedList, FluidForm } from 'carbon-components-react';
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
    <div className="App">
      <h1>To-Do List</h1>
      <TextInput
        id="task-input"
        placeholder="Insert task"
        labelText=""
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button onClick={addTask}>Add Task</Button>

      {tasks.length !== 0 ? (
          tasks.map((task, index) => (
            <ListItem key={index}>
              {task.text}
              <Checkbox
                id={`task-${index}`}
                labelText={task.text}
                checked={task.completed}
                onChange={() => taskCompleted(index)}
              />
              <Button onClick={() => deleteTask(index)}>Delete</Button>
            </ListItem>
          ))
       
      ) : (
        <p>No tasks yet</p>
      )}
    </div>
  );
}

export default ToDoList;
