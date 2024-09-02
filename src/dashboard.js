import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './styles/Dashboard.css';

function DashboardPage() {
    const [classData, setClassData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
  
    useEffect(() => {
      if (startDate && endDate) {
        fetchClassData();
      }
    }, [startDate, endDate]);
  
    const fetchClassData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('dashboard_new')
          .select('class_sec, adm_no, timest')
          .gte('timest', startDate)
          .lte('timest', endDate);
  
        if (error) {
          console.error('Error fetching class data:', error);
        } else {
          processClassData(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
      setLoading(false);
    };
  
    const processClassData = (data) => {
      const classMap = new Map();
  
      data.forEach(item => {
        const { class_sec } = item;
        if (!classMap.has(class_sec)) {
          classMap.set(class_sec, { total: 50, present: 0 });
        }
        classMap.get(class_sec).present += 1;
      });
  
      const processedData = Array.from(classMap.entries()).map(([class_sec, { total, present }]) => ({
        class_sec,
        total,
        present,
        absent: total - present
      }));
  
      // Sort by class_sec in ascending order
      processedData.sort((a, b) => a.class_sec.localeCompare(b.class_sec));
  
      setClassData(processedData);
    };
  
    return (
      <div className="dashboard-container">
        <div className="dashboard-main">
          <h1 className="dashboard-title">Class Attendance Dashboard</h1>
  
          <div className="date-range-selector">
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </div>
  
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="dashboard-tables">
              <div className="dashboard-table">
                <h2>Class Data</h2>
                <table className="dashboard-data-table">
                  <thead>
                    <tr>
                      <th>Class Section</th>
                      <th>Total Strength</th>
                      <th>Present</th>
                      <th>Absent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classData.map((cls, index) => (
                      <tr key={index}>
                        <td>{cls.class_sec}</td>
                        <td>{cls.total}</td>
                        <td>{cls.present}</td>
                        <td>{cls.absent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default DashboardPage;