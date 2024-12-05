import React from 'react'
import './App.css'
import Header from './components/Header'
import Addtodo from './components/Addtodo'
import Todolist from './components/Todolist'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



export default function App() {
  return (
    <div className='app'>
      <Header/>
      <Addtodo/>
      <Todolist/>
      <ToastContainer/>
    </div>
  )
}
