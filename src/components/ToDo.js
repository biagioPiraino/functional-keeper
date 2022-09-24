import React, {Component} from 'react'
import './ToDo.css'

class ToDo extends Component {
   render() {
      return(
         <div className='container todo'>
            <div className='todo-title'>
               <h2>To do:</h2>
            </div>
         </div>
      )
   }
}

export default ToDo;