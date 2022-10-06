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
         dailyTargets: {},
         weeklyTrack: []
      };
      this.fetchDailyTodo = this.fetchDailyTodo.bind(this);
      this.fetchWeeklyTodo = this.fetchWeeklyTodo.bind(this);
      this.getCurrentWeekNumber = this.getCurrentWeekNumber.bind(this);
   }

   componentDidMount() {
      // Daily targets
      let dailyToDos = this.fetchDailyTodo();
      let targets, achieved, remaining;

      targets = dailyToDos.length - 1;
      achieved = dailyToDos.filter(x => x.done === true).length;
      remaining = targets - achieved;

      // Weekly targets
      let currentWeekNumber = this.getCurrentWeekNumber();
      let weeklyTodo = this.fetchWeeklyTodo(currentWeekNumber);

      this.setState({
         todolist: dailyToDos,
         dailyTargets: {
            targets: targets,
            achieved: achieved,
            remaining: remaining
         },
         weeklyTrack: weeklyTodo
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

   getCurrentWeekNumber() {
      let currentDate, startDate, days;
      currentDate = new Date();
      startDate = new Date(currentDate.getFullYear(), 0, 1);
      days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
      return Math.floor(days / 7);
   }

   fetchWeeklyTodo(weekNumber) {
      const toDoList = ToDoData.filter(date => date.weekNumber === weekNumber);
      let days = 0;
      let weeklyTodo = [];

      while (days < 7){
         let toDos =
            { planned: toDoList.filter(x => x.day === days).length, 
              done: toDoList.filter(x => x.day === days && x.done).length,
              undone: toDoList.filter(x => x.day === days && x.done === false).length}
         weeklyTodo.push(toDos);
         days++;
      }
      
      console.log(weeklyTodo);
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