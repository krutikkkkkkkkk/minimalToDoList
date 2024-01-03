import { useState } from "react";
import { useEffect } from "react";
export function NewTaskform({onSubmit}){
    const [newItem, setNewItem] = useState("")

    let todaysDate = new Date();
    let day = todaysDate.getDate();
    let month = todaysDate.getMonth() + 1;
    let year = todaysDate.getFullYear();
    let date = `${day}/0${month}/${year}`;
    
    let [time, setTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const todaysDate = new Date();
            const hours = todaysDate.getHours();
            const minutes = todaysDate.getMinutes() > 9 ? todaysDate.getMinutes() : `0${todaysDate.getMinutes()}`;
            setTime(`${hours}:${minutes}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    time = time.toString();

    let Submit = (e) => {
        e.preventDefault();
        if(newItem === "") return;
        onSubmit(newItem)
        setNewItem("")
    }


    return <form onSubmit={Submit} className="container py-5 px-4">
   <div className="header d-md-flex justify-content-between align-items-center py-2">
   <h1 className="fw-bold ">To Do List</h1>
    <p>Date: {date} <br /> Time: {time}</p>
   </div>
    
    <label className="form-label">New Task</label>
    <div className="input-group mb-3">
        <input type="text"
        value={newItem} 
        onChange={e => setNewItem(e.target.value)} 
        className="form-control" 
        placeholder="Add a new task" 
         />
    </div>
    <button className="add btn btn-primary"> 
        Add Task
    </button>
        </form>
}