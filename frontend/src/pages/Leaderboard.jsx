import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useSelector } from "react-redux";

import "./styles.css"

const Leaderboard = () => {

  const { userInfo } = useSelector((state) => state.auth);
  let className = userInfo.data.user.className[0]
  const [ut1, setUt1] = useState([]);
  const [ut2, setUt2] = useState([]);
  const [topThreeStudents, setTopThreeStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/users/fetch-class-marks/telegram', {
          phoneNo: userInfo.data.user.phoneNo,
          className: className
        });
        setUt1(response.data.data.data.ut1);
        setUt2(response.data.data.data.ut2);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (ut1.length > 0 && ut2.length > 0) {
      const combinedMarks = {};
      ut1.forEach(item => {
        const enrollmentNo = item.enrollmentNo;
        combinedMarks[enrollmentNo] = combinedMarks[enrollmentNo] || 0;
        combinedMarks[enrollmentNo] += calculateTotalMarks(Object.values(item).slice(1));
      });
      ut2.forEach(item => {
        const enrollmentNo = item.enrollmentNo;
        combinedMarks[enrollmentNo] = combinedMarks[enrollmentNo] || 0;
        combinedMarks[enrollmentNo] += calculateTotalMarks(Object.values(item).slice(1));
      });

      // Sort the students by total marks
      const sortedStudents = Object.keys(combinedMarks).sort((a, b) => combinedMarks[b] - combinedMarks[a]);

      // Take top 3 students
      const topThree = sortedStudents.slice(0, 3);

      setTopThreeStudents(topThree);
    }
  }, [ut1, ut2]);

  const calculateTotalMarks = (subjectMarks) => {
    return subjectMarks.reduce((total, mark) => total + parseInt(mark), 0);
  };

  const getStudentData = () => {
    const studentData = topThreeStudents.map(student => {
      const totalMarks = ut1.concat(ut2).filter(item => item.enrollmentNo === student).reduce((acc, item) => acc + calculateTotalMarks(Object.values(item).slice(1)), 0);
      return {
        enrollmentNo: student,
        totalMarks: totalMarks
      };
    });

    return studentData;
  };

  const renderBarChart = () => {
    const studentData = getStudentData();

    const data = {
      labels: studentData.map(student => student.enrollmentNo),
      datasets: [{
        label: 'Total Marks',
        data: studentData.map(student => student.totalMarks),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      maintainAspectRatio: false, // Set to false to allow adjusting the size
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    return <Bar data={data} options={options} />;
  };

  return (
    <div>
      <div className="chart-container">
        {renderBarChart()}
      </div>
    </div>
  );
};

export default Leaderboard;
