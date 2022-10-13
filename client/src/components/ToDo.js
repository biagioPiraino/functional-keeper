import React, {Component} from 'react'
import './ToDo.css'
import ToDoEntry from './ToDoEntry'

class ToDo extends Component {
   constructor(props){
      super(props);
   }

   render() {
      const toDoEntries = this.props.items.map(
         x => <li key={x._id}>
            <ToDoEntry 
               attribute={x} 
               handleChange={this.props.handleChange}
               handleClick={this.props.handleClick} 
               displayAdd={x.displayAdd}/></li>
      )

      return(
         <div className='container todo'>
            <div className='container-header'>
               <h2>To Do</h2>
            </div>
            <div className='todo-entries-container'>
               <ul className='todo-entries-list'>
                  {toDoEntries}
               </ul>
            </div>
         </div>
      )
   }
}

export default ToDo;