import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, USER_ID } from '../config/api.config';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../styles/FootprintPage.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const FootprintPage = () => {
  const [footprintData, setFootprintData] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/users/${USER_ID}/footprints`)
      .then(response => setFootprintData(response.data))
      .catch(error => console.error('Loading error:', error));
  }, []);

  if (!footprintData) return <div>Loading data...</div>;

  const carbonData = footprintData.services.map(service => ({
    name: service.name,
    carbon: service.carbon_emitted_gCO2e
  }));

  const energyData = footprintData.services.map(service => ({
    name: service.name,
    energy: service.energy_consumed_kWh
  }));

  const energySavedData = [
    { name: 'Energy Saved (%)', value: footprintData.footprint_saved_percentage },
    { name: 'Energy Used (%)', value: 100 - footprintData.footprint_saved_percentage },
  ];

  const totalCarbonEmitted = footprintData.total_carbon_emitted_gCO2e;
  const totalCarbonSaved = footprintData.total_carbon_saved_compared_to_standard_gCO2e;
  const carbonSavedPercentage = Math.round((totalCarbonSaved / totalCarbonEmitted) * 100 * 10) / 10;
  const carbonNotSavedPercentage = Math.round((100 - carbonSavedPercentage) * 10) / 10;

  const carbonSavedData = [
    { name: 'Carbon Saved (%)', value: carbonSavedPercentage },
    { name: 'Carbon Used (%)', value: carbonNotSavedPercentage },
  ];

  return (
    <div className="footprint-container">
      <h2>Carbon Footprint</h2>

      <div className="chart-section">
        <h3>Carbon Emissions by Service</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={carbonData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="carbon" fill="#82ca9d" name="Carbon (gCO2e)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3>Energy Consumption by Service</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={energyData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="energy" fill="#8884d8" name="Energy (kWh)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3>Energy Saved %</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={energySavedData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {energySavedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3>Carbon Saved %</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={carbonSavedData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label>
              {carbonSavedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FootprintPage;
