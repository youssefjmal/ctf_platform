import React, { useState, useEffect } from 'react';
import { challengeService } from '../../services/challengeService';
import type { Challenge } from '../../services/challengeService';
import ChallengeCard from './ChallengeCard';
import './ChallengeList.css';

const ChallengeList: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const data = await challengeService.getAllChallenges(category, difficulty);
        setChallenges(data);
      } catch (error) {
        console.error('Failed to fetch challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [category, difficulty]);

  if (loading) {
    return <div className="loading">Loading challenges...</div>;
  }

  return (
    <div className="challenge-list">
      <div className="challenge-filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="web">Web</option>
          <option value="crypto">Crypto</option>
          <option value="reverse">Reverse</option>
          <option value="forensics">Forensics</option>
          <option value="pwn">Pwn</option>
        </select>

        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="challenge-grid">
        {challenges.length === 0 ? (
          <p className="no-challenges">No challenges found</p>
        ) : (
          challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))
        )}
      </div>
    </div>
  );
};

export default ChallengeList;