import React, {Component} from 'react'
import ToDo from './ToDo'
import Targets from './Targets'
import WeeklyTrack from './WeeklyTrack'
import Navbar from './Navbar'
import './MainPage.css'

class MainPage extends Component {
   render() {
      return(
         <React.Fragment>
         <Navbar />
            <div className="mainpage-container">
               <ToDo />
               <Targets />
               <WeeklyTrack />
            </div>
         </React.Fragment>
      )
   }
}

export default MainPage;