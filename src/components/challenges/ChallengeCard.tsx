import React from 'react';
import { Link } from 'react-router-dom';
import type { Challenge } from '../../services/challengeService';
import './ChallengeCard.css';

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'green';
      case 'medium': return 'orange';
      case 'hard': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Link to={`/challenges/${challenge.id}`} className="challenge-card">
      <div className="challenge-header">
        <h3>{challenge.title}</h3>
        {challenge.solved && <span className="badge-solved">✓ Solved</span>}
      </div>
      
      <p className="challenge-description">{challenge.description}</p>
      
      <div className="challenge-footer">
        <span className="challenge-category">{challenge.category}</span>
        <span className={`challenge-difficulty ${getDifficultyColor(challenge.difficulty)}`}>
          {challenge.difficulty}
        </span>
        <span className="challenge-points">⭐ {challenge.points} pts</span>
        <span className="challenge-solves">👥 {challenge.solves} solves</span>
      </div>
    </Link>
  );
};

export default ChallengeCard;