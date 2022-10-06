import React, {Component} from 'react'
import './ToDoEntry.css'
import radiooff from '../images/radio-off.png'
import radioon from '../images/radio-on.png'
import add from '../images/add-icon.png'

class ToDoEntry extends Component {
   constructor(props){
      super(props)
   }

   render() {
      return(
         <React.Fragment>
            <div className='todo-entry-container'>
               <img className='radio-image' src={this.props.attribute.done ? radioon : radiooff} alt='radio-icon'/>
               <input type="text" className='activity input' value={this.props.attribute.desc} placeholder="What's next?" />
               <input type="text" className='category input' value={this.props.attribute.category} placeholder="Category" />
               {this.props.displayAdd && 
                  <img className='add-image' src={add} alt='add-icon'/>}
            </div>
            <hr className='divider'/>
         </React.Fragment>
      )
   }
}

export default ToDoEntry;