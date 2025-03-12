import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, USER_ID } from '../config/api.config';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Database } from 'lucide-react';
import '../styles/VolumesPage.css';

const VolumesPage = () => {
  const [volumes, setVolumes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/users/${USER_ID}/volumes`)
      .then(response => setVolumes(response.data))
      .catch(error => {
        console.error('Loading error:', error);
        setError('Failed to load data. Please check your API or server.');
      });
  }, []);

  if (error) return <div className="error-message">{error}</div>;
  if (!volumes.length) return <div>Loading data...</div>;

  const getUsageStatus = (percentage) => {
    if (percentage < 60) return 'Healthy';
    if (percentage < 80) return 'Moderate Usage';
    return 'High Usage';
  };

  const getStatusClass = (percentage) => {
    if (percentage < 60) return 'status-healthy';
    if (percentage < 80) return 'status-moderate';
    return 'status-high';
  };

  const getProgressClass = (percentage) => {
    if (percentage < 60) return 'progress-healthy';
    if (percentage < 80) return 'progress-moderate';
    return 'progress-high';
  };

  return (
    <div className="volumes-page">
      <h2>Volumes Overview</h2>
      <div className="volumes-grid">
        {volumes.map(volume => (
          <Card key={volume._id} className="volume-card">
            <CardContent className='volume-card-content'>
              <h3><Database size={20} className="icon-volume" /> {volume.name}</h3>
              <p><strong>Attached To:</strong> {volume.attached_to}</p>
              <p><strong>Created At:</strong> {new Date(volume.created_at).toLocaleString()}</p>
              <p><strong>Size:</strong> {volume.size_gb} GB</p>
              <p><strong>Used:</strong> {volume.used_gb} GB ({volume.percentage_used}%)</p>
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${getProgressClass(volume.percentage_used)}`} 
                  style={{ width: `${volume.percentage_used}%` }}
                ></div>
              </div>
              <p className={`status-text ${getStatusClass(volume.percentage_used)}`}>
                {getUsageStatus(volume.percentage_used)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VolumesPage;
