import React, {Component} from 'react'
import ToDo from './ToDo'
import Targets from './Targets'
import WeeklyTrack from './WeeklyTrack'
import Navbar from './Navbar'
import './MainPage.css'
import ToDoData from './ToDoData'

class MainPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         todolist: [],
         dailyTargets: {}
      };
      this.fetchDailyTodo = this.fetchDailyTodo.bind(this);
   }

   componentDidMount() {
      let dailyToDos = this.fetchDailyTodo();
      let targets, achieved, remaining;

      targets = dailyToDos.length - 1;
      achieved = dailyToDos.filter(x => x.done === true).length;
      remaining = targets - achieved;

      this.setState({
         todolist: dailyToDos,
         dailyTargets: {
            targets: targets,
            achieved: achieved,
            remaining: remaining
         }
      });
   }

   componentWillUnmount() {
      this.setState({
         todolist: [],
         dailyTargets: {}
      });
   }

   fetchDailyTodo() {
      let date, month, year;
      const today = new Date();
      
      date = today.getDate().toString();
      month = (today.getMonth() + 1).toString();
      year = today.getFullYear().toString();

      const fullDate = `${date}/${month}/${year}`
      const toDoList = ToDoData.filter(date => date.added === fullDate);

      toDoList.push({
         displayAdd: true
      })

      return toDoList;
   }

   render() {
      return(
         <React.Fragment>
         <Navbar />
            <div className="mainpage-container">
               <ToDo items={this.state.todolist}/>
               <Targets items={this.state.dailyTargets}/>
               <WeeklyTrack />
            </div>
         </React.Fragment>
      )
   }
}

export default MainPage;