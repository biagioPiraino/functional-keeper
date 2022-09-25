import React, {Component} from 'react'
import './ToDoEntry.css'
import radiooff from '../images/radio-off.png'
import add from '../images/add-icon.png'

class ToDoEntry extends Component {
   render() {
      return(
         <React.Fragment>
            <div className='todo-entry-container'>
               <img className='radio-image' src={radiooff} alt='radio-icon'/>
               <input type="text" className='activiy input' placeholder="What's next?" />
               <input type="text" className='category input' placeholder="Category" />
               <img className='add-image' src={add} alt='add-icon'/>
            </div>
            <hr className='divider'/>
         </React.Fragment>
      )
   }
}

export default ToDoEntry;