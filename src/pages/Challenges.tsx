import React from 'react';
import ChallengeList from '../components/challenges/ChallengeList';
import Sidebar from '../components/layout/Sidebar';
import './Challenges.css';

const Challenges: React.FC = () => {
  return (
    <div className="challenges-page">
      <Sidebar />
      <div className="challenges-content">
        <h1> Challenges</h1>
        <ChallengeList />
      </div>
    </div>
  );
};

export default Challenges;