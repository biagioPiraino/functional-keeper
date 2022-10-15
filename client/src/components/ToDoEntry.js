import React, {Component} from 'react'
import './ToDoEntry.css'
import radiooff from '../images/radio-off.png'
import radioon from '../images/radio-on.png'
import add from '../images/add-icon.png'

class ToDoEntry extends Component {
   constructor(props){
      super(props);
   }

   render() {
      return(
         <React.Fragment>
            <div className='todo-entry-container'>
               <img
                  id={this.props.attribute._id} 
                  className='radio-image' 
                  src={this.props.attribute.done ? radioon : radiooff} 
                  alt='radio-icon' onClick={this.props.handleUpdate}/>
               
               {this.props.displayAdd 
                  ? <input type="text" onChange={this.props.handleChange} 
                           className='activity input' value={this.props.attribute.description} 
                           placeholder="What's next?" />
                  : <input type="text" className='activity input' 
                           value={this.props.attribute.description} 
                           placeholder="What's next?" readOnly/>}

               {this.props.displayAdd && 
                  <img className='add-image' src={add} alt='add-icon' onClick={this.props.handleClick}/>}
            </div>
            <hr className='divider'/>
         </React.Fragment>
      )
   }
}

export default ToDoEntry;