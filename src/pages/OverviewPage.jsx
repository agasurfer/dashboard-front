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
        const [userResponse, containersResponse, bucketsResponse] = await Promise.all([
          axios.get(`${API_URL}/users/${USER_ID}`),
          axios.get(`${API_URL}/users/${USER_ID}/containers`),
          axios.get(`${API_URL}/users/${USER_ID}/buckets`),
        ]);

        setUserData(userResponse.data);
        setServicesData({
          totalContainers: containersResponse.data.length,
          totalBuckets: bucketsResponse.data.length,
        });

        const totalCapacity = bucketsResponse.data.reduce((acc, bucket) => acc + bucket.max_capacity_gb, 0);
        const currentUsage = bucketsResponse.data.reduce((acc, bucket) => acc + bucket.current_usage_gb, 0);

        setStorageData({
          totalCapacity,
          currentUsage,
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
          </CardContent>
        </Card>

        <Card className="overview-card">
          <CardContent className='overview-card-content'>
            <div className="card-header">
              <Database size={24} />
              <h3>Storage Usage</h3>
            </div>
            <p><strong>Total Capacity:</strong> {storageData.totalCapacity} GB</p>
            <p><strong>Current Usage:</strong> {storageData.currentUsage.toFixed(2)} GB</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewPage;
