import React, {Component} from 'react'
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
 } from 'chart.js'
import { Line } from 'react-chartjs-2';
import './WeeklyTrack.css'

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
 );
 
class WeeklyTrack extends Component {
   constructor(props){
      super(props)
   }

   render() {
      let planned = [];
      let undone = [];
      let done = [];
      let counter = 0;
   
      while (counter < 7) {
         let dailyTargets = this.props.items.filter(x => x.dayOfWeek === counter);
         planned.push(dailyTargets.length);
         undone.push(dailyTargets.filter(x => x.done === false).length);
         done.push(dailyTargets.filter(x => x.done).length);
         counter++;
      }

      return(
         <div className='container weeklytrack'>
            <div className='container-header'>
               <h2>Weekly Track</h2>
            </div>
            <div className='container-chart'>
               <Line className='chart'
               datasetIdKey='1'
               data={{
                  labels: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  datasets: [
                  {
                     id: 1,
                     label: 'Planned',
                     backgroundColor: 'rgb(255,255,255)',
                     data: planned,
                  },
                  {
                     id: 2,
                     label: 'Done',
                     borderColor: 'rgb(34,139,34)',
                     backgroundColor: 'rgb(255,255,255)',
                     data: done,
                  },
                  {
                     id: 3,
                     label: 'Undone',
                     borderColor: 'rgb(255, 99, 132)',
                     backgroundColor: 'rgb(255,255,255)',
                     data: undone,
                     },
                  ],
               }}
               height={230}
               width={800}
               options={{
                  responsive: false}}/>
            </div>
         </div>
      )
   }
}

export default WeeklyTrack;