
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, USER_ID } from '../config/api.config';
import { Card, CardContent } from '../components/ui/card';
import { User, Server, Database, Lock } from 'lucide-react';
import '../styles/OverviewPage.css';

const OverviewPage = () => {
  const [userData, setUserData] = useState(null);
  const [servicesData, setServicesData] = useState(null);
  const [storageData, setStorageData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, containersResponse, bucketsResponse, volumesResponse] = await Promise.all([
          axios.get(`${API_URL}/users/${USER_ID}`),
          axios.get(`${API_URL}/users/${USER_ID}/containers`),
          axios.get(`${API_URL}/users/${USER_ID}/buckets`),
          axios.get(`${API_URL}/users/${USER_ID}/volumes`),
        ]);

        setUserData(userResponse.data);
        setServicesData({
          totalContainers: containersResponse.data.length,
          totalBuckets: bucketsResponse.data.length,
          totalVolumes: volumesResponse.data.length,
        });

        const bucketCapacity = bucketsResponse.data.reduce((acc, bucket) => acc + bucket.max_capacity_gb, 0);
        const bucketUsage = bucketsResponse.data.reduce((acc, bucket) => acc + bucket.current_usage_gb, 0);

        const volumeCapacity = volumesResponse.data.reduce((acc, volume) => acc + volume.size_gb, 0);
        const volumeUsage = volumesResponse.data.reduce((acc, volume) => acc + volume.used_gb, 0);

        setStorageData({
          bucketCapacity,
          bucketUsage,
          volumeCapacity,
          volumeUsage,
        });
      } catch (error) {
        console.error('Loading error:', error);
        setError('Failed to load data.');
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="error-message">{error}</div>;
  if (!userData || !servicesData || !storageData) return <div>Loading data...</div>;

  return (
    <div className="overview-page">
      <h2>Welcome, {userData.name}</h2>
      <div className="overview-grid">
        <Card className="overview-card">
          <CardContent className='overview-card-content'>
            <div className="card-header">
              <User size={24} />
              <h3>User Info</h3>
            </div>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Account Created:</strong> {new Date(userData.created_at).toLocaleString()}</p>
            <div className="changepass"><button className="change-password-button">
              <Lock size={16} /> Change Password
            </button></div>
          </CardContent>
        </Card>

        <Card className="overview-card">
          <CardContent className='overview-card-content'>
            <div className="card-header">
              <Server size={24} />
              <h3>Services Overview</h3>
            </div>
            <p><strong>Total Containers:</strong> {servicesData.totalContainers}</p>
            <p><strong>Total Buckets:</strong> {servicesData.totalBuckets}</p>
            <p><strong>Total Volumes:</strong> {servicesData.totalVolumes}</p>
          </CardContent>
        </Card>

        <Card className="overview-card">
          <CardContent className='overview-card-content'>
            <div className="card-header">
              <Database size={24} />
              <h3>Storage Usage</h3>
            </div>
            <p><strong>Object Storage (Buckets):</strong></p>
            <div className="progress-bar">
              <div 
                className="progress-fill progress-bucket" 
                style={{ width: `${(storageData.bucketUsage / storageData.bucketCapacity) * 100}%` }}>
              </div>
            </div>
            <p>{storageData.bucketUsage.toFixed(2)} / {storageData.bucketCapacity} GB</p>

            <p><strong>Block Storage (Volumes):</strong></p>
            <div className="progress-bar">
              <div 
                className="progress-fill progress-volume" 
                style={{ width: `${(storageData.volumeUsage / storageData.volumeCapacity) * 100}%` }}>
              </div>
            </div>
            <p>{storageData.volumeUsage.toFixed(2)} / {storageData.volumeCapacity} GB</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewPage;
