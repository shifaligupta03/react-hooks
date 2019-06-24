import React,{ useState, useEffect } from 'react';
import uuid from 'uuid/v4';

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';


const storeTasks=(taskMap)=>{
    localStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(taskMap)
    );
}

const readStoredTasks=()=>{
    const taskMap = localStorage.getItem(TASKS_STORAGE_KEY);
    return ((taskMap!== "undefined") ? JSON.parse(taskMap) : { tasks:[], completedTasks:[]});
}

function Tasks(){
    const [taskText, setTaskText] = useState('');
    const storedTasks = readStoredTasks();
    const [tasks, setTasks] = useState(storedTasks.tasks);
    const [completedTasks, setCompletedTasks] = useState(storedTasks.completedTasks);

    useEffect(()=>{
        storeTasks({tasks, completedTasks});
    })

    const addTask=()=>{
        setTasks([...tasks, {taskText, id: uuid()}]);
    }

    const updateTaskText=(event)=>{
        setTaskText(event.target.value);
    }

    const updateCompletedTask=(completedTask)=>()=>{
        setCompletedTasks([...completedTasks, completedTask]);
        setTasks(tasks.filter(task=> task.id !== completedTask.id));
    }

   const deleteTask=(deleteTask)=>()=>{
        setCompletedTasks(completedTasks.filter(task=> task.id !== deleteTask.id));
        
   }

    return(
        <div>
            <div className="form">
                <input value={taskText} onChange={updateTaskText}/>
                <button onClick={addTask}>Add Task</button>
            </div>

            <div className="task-list">
            {
                tasks.map(task=>{
                    const { id, taskText } = task;
                    return (
                    <div key={id} onClick={updateCompletedTask(task)}>
                    {taskText}
                    </div>
                    )
                })
            }
            <div className="completed-task">
            {
                completedTasks.map(task=>{
                    const { id, taskText } = task;
                    return (
                    <div key={id}>
                    {taskText} {'  '}
                    <span onClick={deleteTask(task)} className="delete-task">x</span>
                    </div>
                    )
                })
            }
            </div>
            </div>


        </div>
    )
}


export default Tasks;