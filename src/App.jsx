import './styles.css'
import { useState } from 'react'
import { NewTaskform } from './NewTaskForm'
import { useEffect } from 'react'
import noTasks from './noTasks.json'


let randomNumber1to31 = Math.floor(Math.random() * 31) + 1;
let taskEncouragement = noTasks.noTasks[randomNumber1to31].text;


function App(){

    const [list, setList] = useState(()=>{
        const saved = localStorage.getItem('list')
        if(saved== null){
            return []
        }
        else{
            return JSON.parse(saved)
        }
    })

    useEffect(() => {   
     localStorage.setItem('list', JSON.stringify(list))
    }, [list])


    function addTask(item) {
     setList(currentItem => {
           return [...currentItem, {
               item,
               completed: false,
               id: crypto.randomUUID()
           }]
       })
    }


function toogleTodo (id, checked) {
    setList(currentItem => {
        return currentItem.map(task => {
            if (task.id === id) {
                return {...task, completed: checked}
            }
            return task
        })
    })
}

function deleteTask(id) {
    setList(currentItem => {
        return currentItem.filter(task => task.id !== id)
    })
}




    return <>
    <NewTaskform onSubmit={addTask} />
    <div className="container py-2 px-4 pb-5">
        <h2 className="fw-bold">My Tasks</h2> 
        <ul className="list-group">
            {list.length === 0 && <p style={{height:'30vh', fontSize: '1.5rem', color: 'gray',   }} className="d-flex justify-content-between align-items-center text-center"> <span style={{width:"100%"}}>{taskEncouragement}</span></p>}
            {list.map(task=>{
                return <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
                <div className="firstgroup d-flex justify-content-between align-items-center">
                <input type="checkbox" checked={task.completed} onChange={e=>toogleTodo(task.id, e.target.checked)} />
                <span className="px-2">{task.item}</span>
                </div>
                <button className="btn btn-outline-danger" onClick={()=> deleteTask(task.id)}>Delete</button>
                </li>
            })}

        {/* <li className="list-group-item d-flex justify-content-between align-items-center">
        <div className="firstgroup d-flex justify-content-between align-items-center">
        <input type="checkbox" />
        <span className="px-2">Task 1</span>
        </div>
        <button className="btn btn-outline-danger">Delete</button>
        </li> */
        }

        </ul>
        </div>
    </>
}

export default App;