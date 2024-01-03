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
            const minutes = todaysDate.getMinutes();
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
   <div className="header d-flex justify-content-between align-items-center">
   <h1 className="fw-bold py-2">To Do List</h1>
    <p className="py-2">Date: {date} Time: {time}</p>
   </div>
    
    <label className="form-label" htmlFor="item">New Task</label>
    <div className="input-group mb-3">
        <input type="text"
        value={newItem} 
        onChange={e => setNewItem(e.target.value)} 
        className="form-control" 
        placeholder="Add a new task" 
        id="item" />
    </div>
    <button className="add btn btn-primary"> 
        Add Task
    </button>
        </form>
}