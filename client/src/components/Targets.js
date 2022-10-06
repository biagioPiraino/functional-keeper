import React, {Component} from 'react'
import './Targets.css'

class Targets extends Component {
   constructor(props){
      super(props);
   }

   render() {
      return(
         <div className='container targets'>
            <div className='container-header'>
               <h2>Daily Targets</h2>
            </div>
            <div className='container-data'>
               <div>
                  <h1>{this.props.items.targets}</h1>
                  <h2>Targets</h2>
               </div>
               <div>
                  <h1>{this.props.items.achieved}</h1>
                  <h2>Achieved</h2>
               </div>
               <div>
                  <h1>{this.props.items.remaining}</h1>
                  <h2>Remaining</h2>
               </div>
            </div>
         </div>
      )
   }
}

export default Targets;