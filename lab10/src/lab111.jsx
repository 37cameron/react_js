import { useState } from "react";

const todolist = [
  {listitem: 'Complete Lab 11', status: 'incomplete'}, 
  {listitem: 'Review JSX Events and State', status: 'incomplete'},
];

function App() {
 
   
    const [list, setList] = useState(todolist);
    const [newTask, setNewTask] = useState("");

    const markComplete = (index) => {
      const updatedList = list.map((item, i) =>
        i === index ? { ...item, status: "complete" } : item
      );
      setList(updatedList);
    };
      //fucntion to add a new task
    const addTask = (event) => {
      event.preventDefault();
      if (newTask.trim()==='') return;
      setList([...list, {listitem: newTask, status: "incomplete"}]);
      setNewTask("");
    }
  
  return (
  <div>
    
    <h1>To-Do List</h1>
    <form onSubmit={addTask}>
      <input
      type="text"
      value={newTask}
      onChange={(event)=> setNewTask(event.target.value)}
      />
        
      <button type="submit">
        Add Task
      </button>

    </form>




    
    <ul>

        {list.map((item, index) => (
          <li key={item.listitem} style={{ textDecoration: item.status === "complete" ? "line-through" : "none" }}>
             {item.listitem} 
            <button onClick={() => markComplete(index)} style={{  color: "red"}}>
              X
            </button>


          </li>
        ))}
      </ul>
  </div>
      );
    };  


export default App;