import React, {Component} from 'react'
import './ToDo.css'
import ToDoEntry from './ToDoEntry'

class ToDo extends Component {
   render() {
      return(
         <div className='container todo'>
            <div className='container-header'>
               <h2>To Do</h2>
            </div>
            <div className='todo-entries-container'>
               <ul className='todo-entries-list'>
               </ul>
            </div>
         </div>
      )
   }
}

export default ToDo;