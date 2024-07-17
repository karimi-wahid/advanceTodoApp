import React, { useState } from 'react'
import './todo.css'
import { TodoForm } from './Components/TodoForm';
import { TodoList } from './Components/TodoList';
import { TodoDate } from './Components/TodoDate';

const todoKey = 'reactTodo';

const Todo = () => {
    
    const [task, setTask] = useState(() => {
        const rawTodos = localStorage.getItem(todoKey);
        if( !rawTodos) return [];

        return JSON.parse(rawTodos);
    });

    const handleFormSubmit = (inputValue) => {
        const {id, content, checked} = inputValue;

        // to check if the input field is empty or not
        if(!content) return;

        //to check if the data is already existing or not
        //if(task.includes(inputValue)) return;
        const ifTodoContentMatched = task.find((curTask) => curTask.content === content );
        if (ifTodoContentMatched) return;

        setTask((prev) => [...prev, {id,content, checked}]);
    };

    // todo add to local storage
    localStorage.setItem(todoKey, JSON.stringify(task));


    //Todo handleDeleteTodo Function
    const handleDeleteTodo = (value) => {
        const UpdatedTask = task.filter((curTask) => curTask.content !== value);
        setTask(UpdatedTask)
    };

    //Todo handleDeleteAll Function
    const handleDeleteAll = () => {
        setTask([])
    }

    //Todo handleChecked functionality
    const handleCheckedTodo = (content) => {
        const UpdatedTask = task.map((curTask) => {
            if(curTask.content === content){
                return { ...curTask, checked: !curTask.checked } 
            }else {
                return curTask
            }})
        setTask(UpdatedTask);
    }
    

  return (
    <section className='todo-container'>
        <header>
        <h1>Todo List</h1>
            <TodoDate />
        </header>
        <TodoForm onAddTodo = {handleFormSubmit} />
        <section className='myUnOrdList'>
            <ul>
                {task.map((curElem) => {
                return (
                    <TodoList
                        key={curElem.id} 
                        data={curElem.content} 
                        checked={curElem.checked}
                        onHandleDeleteTodo={handleDeleteTodo}
                        onHandleCheckedTodo={handleCheckedTodo}
                    />)})}
            </ul>
        </section>
        <section >
            <button className='clear-btn' onClick={handleDeleteAll}>Clear All</button>
        </section>
    </section>
  )
}

export default Todo