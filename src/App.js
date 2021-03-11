import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/dist/v4';

const LOCAL_STORAGE_KEY ='todoApp.todos'

function App() {
  //var todos is list of Todos
  //var setTodos is function used to set and update the todos
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos) setTodos(storedTodos);
  },[]);
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])

  function handleAddTodo(event){
    const name = todoNameRef.current.value;
    if(name==="") return;
    setTodos(prevTodos=>{
      return[...prevTodos,{id:uuidv4(), name:name, complete:false}]
    });
    todoNameRef.current.value=null;
  }
  function toggleTodo(id){
    const newTodos=[...todos]
    const todo = newTodos.find(todo=>todo.id===id);

    todo.complete= !todo.complete;
    setTodos(newTodos);

  }
  function handleClearTodos(){
    const newTodos = todos.filter(todo=>!todo.complete);
    setTodos(newTodos);
  }


  return (
    <>
    <TodoList todoList = {todos} toggleTodo={toggleTodo}/> 
    <input type="text" ref={todoNameRef}/>
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Complete</button>
    <div>{todos.filter(todo=>!todo.complete).length} Todos left to complete!!!</div>
    </>
  );
}

export default App;
