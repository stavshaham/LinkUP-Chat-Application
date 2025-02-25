import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './LoadingPage.css';

const LoadingPage: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner">
          <Spin 
            indicator={
              <LoadingOutlined 
                style={{ 
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  color: '#1677ff'
                }} 
                spin 
              />
            } 
          />
        </div>
        <div className="loading-text">
          <h2>LinkUP</h2>
          <p>Connecting you to your conversations...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
