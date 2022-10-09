import React, {Component} from 'react'
import ToDo from './ToDo'
import Targets from './Targets'
import WeeklyTrack from './WeeklyTrack'
import Navbar from './Navbar'
import './MainPage.css'

class MainPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         todolist: [],
         dailyTargets: {},
         weeklyTrack: []
      };
   }

   componentDidMount() {
      // Weekly targets
      fetch('http://localhost:5000/main')
         .then(res => res.json())
         .then(data => {
            let dailyTargets = data.filter(x => x.dayOfWeek === new Date().getDay());
            let targets, achieved, remaining;

            targets = dailyTargets.length;
            achieved = dailyTargets.filter(x => x.done === true).length;
            remaining = targets - achieved;

            dailyTargets.push({
               displayAdd: true
            })

            this.setState({
               dailyTargets: {
                  targets: targets,
                  achieved: achieved,
                  remaining: remaining
               },
               todolist: dailyTargets,
               weeklyTrack: data
            })})
         .catch(error => console.log(error));
   }

   componentWillUnmount() {
      this.setState({
         todolist: [],
         dailyTargets: {},
         weeklyTrack: []
      });
   }

   render() {
      return(
         <React.Fragment>
         <Navbar />
            <div className="mainpage-container">
               <ToDo items={this.state.todolist}/>
               <Targets items={this.state.dailyTargets}/>
               <WeeklyTrack items={this.state.weeklyTrack}/>
            </div>
         </React.Fragment>
      )
   }
}

export default MainPage;