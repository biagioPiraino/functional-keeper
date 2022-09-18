import React, {Component} from 'react'
import ToDo from './ToDo'
import Targets from './Targets'
import WeeklyTrack from './WeeklyTrack'
import './MainPage.css'

class MainPage extends Component {
   render() {
      return(
         <div className="mainpage-container">
            <ToDo />
            <Targets />
            <WeeklyTrack />
         </div>
      )
   }
}

export default MainPage;