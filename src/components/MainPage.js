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
         todolist: []
      }
      this.fetchDailyTodo = this.fetchDailyTodo.bind(this);
   }

   componentDidMount() {
      let dailyToDos = this.fetchDailyTodo();
      this.setState({
         todolist: dailyToDos
      });
   }

   componentWillUnmount() {
      this.setState({
         todolist: []
      });
   }

   fetchDailyTodo() {
      let date, month, year;
      const today = new Date();
      
      date = today.getDate().toString();
      month = (today.getMonth() + 1).toString();
      year = today.getFullYear().toString();

      const fullDate = `${date}/${month}/${year}`
      const toDoList = ToDoData.filter(date => date.added == fullDate);

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
               <Targets />
               <WeeklyTrack />
            </div>
         </React.Fragment>
      )
   }
}

export default MainPage;