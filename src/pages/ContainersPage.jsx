import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, USER_ID } from '../config/api.config';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import '../styles/ContainersPage.css';

const ContainersPage = () => {
  const [containers, setContainers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/users/${USER_ID}/containers`)
      .then(response => setContainers(response.data))
      .catch(error => {
        console.error('Loading error:', error);
        setError('Failed to load data. Please check your API or server.');
      });
  }, []);

  if (error) return <div className="error-message">{error}</div>;
  if (!containers.length) return <div>Loading data...</div>;

  const energyData = containers.map(container => ({
    name: container.name,
    energy: container.footprintId.total_energy_consumed_kWh,
  }));

  return (
    <div className="containers-page">
      <h2>Containers Overview</h2>
      <div className="containers-grid">
        {containers.map(container => (
          <Card key={container._id} className="container-card">
            <CardContent className="container-card-content">
              <h3>🧊 {container.name}</h3>
              <p><strong>Image:</strong> {container.image}</p>
              <p><strong>Status:</strong> <Badge variant="outline" className={container.status === 'running' ? 'status-running' : 'status-stopped'}>{container.status}</Badge></p>
              <p><strong>Created At:</strong> {new Date(container.created_at).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="chart-section">
        <h3>Energy Consumption by Container</h3>
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
    </div>
  );
};

export default ContainersPage;
