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
      this.handleChange = this.handleChange.bind(this);
      this.submitRequest = this.submitRequest.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
   }

   componentDidMount() {
      fetch('http://localhost:5000/main')
         .then(res => res.json())
         .then(data => {
            let dailyTargets = data.filter(x => x.dayOfWeek === new Date().getDay());
            let targets, achieved, remaining;

            targets = dailyTargets.length;
            achieved = dailyTargets.filter(x => x.done === true).length;
            remaining = targets - achieved;

            dailyTargets.push({
               description: '',
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

   handleChange(e) {
      let newTodolist = [...this.state.todolist];
      let index = newTodolist.findIndex(x => x.displayAdd);

      let itemToChange = {
         ...newTodolist[index],
         description: e.target.value
      }

      newTodolist[index] = itemToChange;

      this.setState({
         todolist: newTodolist
      });
   }

   submitRequest() {
      let newTodolist = [...this.state.todolist];
      let index = newTodolist.findIndex(x => x.displayAdd);

      let itemToChange = {
         ...newTodolist[index],
         displayAdd: false
      }

      newTodolist[index] = itemToChange;

      newTodolist.push({
         description: '',
         displayAdd: true
      });

      let newDailyTargets = this.state.dailyTargets
      newDailyTargets.targets += 1;
      newDailyTargets.remaining +=1;

      itemToChange.dayOfWeek = new Date().getDay();
      itemToChange.done = false;
      
      let newWeeklyTrack = [...this.state.weeklyTrack];
      newWeeklyTrack.push(itemToChange);

      this.setState({
         todolist: newTodolist,
         dailyTargets: newDailyTargets,
         weeklyTrack: newWeeklyTrack
      });

      fetch('http://localhost:5000/add', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(itemToChange)
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      this.componentDidMount();
   }

   handleUpdate(e) {
      const idToUpdate = e.target.id;
      let newTodolist = [...this.state.todolist];
      let index = newTodolist.findIndex(x => x._id === idToUpdate);
      let currentValue = newTodolist[index].done;

      let itemToChange = {
         ...newTodolist[index],
         done: !currentValue
      }

       newTodolist[index] = itemToChange;

      let newDailyTargets = this.state.dailyTargets

      if (currentValue)
      {
         newDailyTargets.remaining +=1;
         newDailyTargets.achieved -=1;
      } 
      else 
      {
         newDailyTargets.remaining -=1;
         newDailyTargets.achieved +=1;
      }

      itemToChange.dayOfWeek = new Date().getDay();      
      let newWeeklyTrack = [...this.state.weeklyTrack];
      let weeklyIndex = newWeeklyTrack.findIndex(x => x._id === idToUpdate);
      
      let weeklyItemToChange = {
         ...newWeeklyTrack[weeklyIndex],
         done: !currentValue
      }

      newWeeklyTrack[weeklyIndex] = weeklyItemToChange;

      this.setState({
         dailyTargets: newDailyTargets,
         weeklyTrack: newWeeklyTrack,
         todolist: newTodolist
      });

      let objToPass = {
         done: currentValue
      }

      fetch('http://localhost:5000/' + idToUpdate, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(objToPass),
         })  
         .then((response) => response.json())
         .then((data) => {
            console.log('Success:', data);
         })
         .catch((error) => {
            console.error('Error:', error);
      });
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
               <ToDo items={this.state.todolist}
                     handleUpdate={this.handleUpdate} 
                     handleChange={this.handleChange} 
                     handleClick={this.submitRequest}/>
               <Targets items={this.state.dailyTargets}/>
               <WeeklyTrack items={this.state.weeklyTrack}/>
            </div>
         </React.Fragment>
      )
   }
}

export default MainPage;