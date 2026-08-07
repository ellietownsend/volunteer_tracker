import { Bar } from "react-chartjs-2";
import { MdVolunteerActivism } from "react-icons/md";
import "../../styles/VolunteerHoursChart.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import{useState, useEffect} from 'react';

import supabase from "../../../supabase-client";

function VolunteerHoursChart(){
  const [volunteerNames, setVolunteerNames] = useState([]);
  const [volunteerHours, setVolunteerHours] = useState([]);

  useEffect(() => {
    retrieveVolunteerInfo();
  },[])

  async function retrieveVolunteerInfo(){
    try{
      const {data, error} = await supabase
        .from("volunteer")
        .select("*")
        .order('timespentvolunteering', {ascending: false })
        .limit(5)
      if(error){
        console.error("Supabase Error:", error.message);
        return;
      }

      setVolunteerNames(data.map((volunteer) => `${volunteer.firstname} ${volunteer.lastname}`));
      setVolunteerHours(data.map((volunteer) => `${volunteer.timespentvolunteering}`));
     

    }catch(error){
      console.error(error.message);
    }
  }


  const labels = volunteerNames;
 


const data = {
  labels: labels,
  datasets: [{
    axis: 'y',
    label: 'Volunteers found with the most hours contributed',
    data: volunteerHours,
    fill: true,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};
  const chartOptions = {
  indexAxis: "y",
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};
  return <>
   <div className="chart-header">
      <h2 className="chart-title">Recommended Volunteers to Highlight</h2>
     <MdVolunteerActivism className="chart-icon" />
    </div>
     <Bar data={data} options={chartOptions} />
  </>

}
export default VolunteerHoursChart;




