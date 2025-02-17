import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  Checkbox,
  UnorderedList,
} from "carbon-components-react";
import "./App.css";

const TASK_KEY = "tasks";

function ToDoList() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem(TASK_KEY)) || []
  );

  const [task, setTask] = useState("");

  useEffect(() => {
    localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
    }
    setTask("");
  };

  const taskCompleted = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="addTask">
        <TextInput
          className="inputTask"
          id="task-input"
          placeholder="Insert task"
          labelText=""
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button kind="primary" className="taskBtn" onClick={addTask}>
          Add Task
        </Button>
      </div>

      {tasks.length > 0 ? (
        <UnorderedList>
          {tasks.map((task, index) => (
            <div key={index} className="task">
              <span className="taskName">{task.text}</span>
              {task.completed ? (
                <span> ✔ </span>
              ) : (
                <Checkbox
                  className="checkbox"
                  id={`task-${index}`}
                  labelText=""
                  checked={task.completed}
                  onChange={() => taskCompleted(index)}
                  style={{ cursor: "pointer" }}
                />
              )}

              <Button className="deleteBtn" onClick={() => deleteTask(index)}>
                Delete
              </Button>
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
