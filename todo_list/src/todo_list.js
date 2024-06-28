import React, { useState } from "react"

let taskId = 0;

function ToDoList() {
    
    const [tasks, setTasks] = useState([ { id: taskId, name: "First Task" },]);
    const [inputValue, setInputValue] = useState("");


    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
    <div>

        <h1> TO DO LIST</h1>
        
        <input className="taskInput" value={inputValue}
        onChange={e => setInputValue(e.target.value)} placeholder="insert task" />
        <button onClick={() => {
        setTasks([
          ...tasks,
          { id: ++taskId, name: inputValue }
        ]);
        
      }}>Add</button>

    
      {tasks.length > 0 ? ( 
         <ul>
         {tasks.map(task => ( 
            <div>
                <li key={task.id}> {task.name} </li>
                <button onClick={() => deleteTask(task.id)}>DELETE</button>
            </div>
           
         ))}
         
       </ul>
      ) : (
       <p> No tasks yet </p>
      )
      
    }

    
   
        



    </div>);
}

export default ToDoList