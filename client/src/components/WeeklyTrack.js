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
                     data: [5,6,7,5,4,3,6],
                  },
                  {
                     id: 2,
                     label: 'Done',
                     borderColor: 'rgb(34,139,34)',
                     backgroundColor: 'rgb(255,255,255)',
                     data: [3,2,1,4,1,1,6],
                  },
                  {
                     id: 3,
                     label: 'Undone',
                     borderColor: 'rgb(255, 99, 132)',
                     backgroundColor: 'rgb(255,255,255)',
                     data: [2,4,6,1,3,2,0],
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