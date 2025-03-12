import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, USER_ID } from '../config/api.config';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { FileText, Music, Film, Database, Archive } from 'lucide-react';
import '../styles/Buckets.css';

const BucketsPage = () => {
  const [buckets, setBuckets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/users/${USER_ID}/buckets`)
      .then(response => setBuckets(response.data))
      .catch(error => {
        console.error('Loading error:', error);
        setError('Failed to load data. Please check your API or server.');
      });
  }, []);

  if (error) return <div className="error-message">{error}</div>;
  if (!buckets.length) return <div>Loading data...</div>;

  const renderIcon = (fileName) => {
    if (fileName.endsWith('.csv')) return <FileText size={18} />;
    if (fileName.endsWith('.mp3')) return <Music size={18} />;
    if (fileName.endsWith('.mp4')) return <Film size={18} />;
    if (fileName.endsWith('.sql')) return <Database size={18} />;
    return <FileText size={16} />;
  };

  return (
    <div className="buckets-page">
      <h2>Storage Buckets Overview</h2>
      <div className="buckets-grid">
        {buckets.map(bucket => (
          <Card key={bucket._id} className="bucket-card">
            <CardContent className='bucket-card-content'>
              <h3><Archive size={20} className="icon-bucket" /> {bucket.name}</h3>
              <p><strong>Created At:</strong> {new Date(bucket.created_at).toLocaleString()}</p>
              <p><strong>Max Capacity:</strong> {bucket.max_capacity_gb} GB</p>
              <p><strong>Current Usage:</strong> {bucket.current_usage_gb.toFixed(2)} GB ({bucket.percentage_used.toFixed(1)}%)</p>
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${bucket.percentage_used < 50 ? 'progress-healthy' : 'progress-high'}`} 
                  style={{ width: `${bucket.percentage_used}%` }}
                ></div>
              </div>
              <Badge variant="outline" className={bucket.percentage_used < 50 ? 'status-low' : 'status-high'}>
                {bucket.percentage_used < 50 ? 'Healthy' : 'High Usage'}
              </Badge>
              <div className="objects-list">
                <h4>Objects:</h4>
                <ul>
                  {bucket.objects.map(object => (
                    <li key={object._id}>
                      {renderIcon(object.name)} {object.name} - {object.size_gb.toFixed(2)} GB
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BucketsPage;
