import api from './api';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  solves: number;
  solved?: boolean;
  hints?: string[];
  files?: string[];
}

export const challengeService = {
  async getAllChallenges(category?: string, difficulty?: string): Promise<Challenge[]> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (difficulty) params.append('difficulty', difficulty);
    
    const response = await api.get(`/challenges?${params.toString()}`);
    return response.data.data;
  },

  async getChallengeById(id: string): Promise<Challenge> {
    const response = await api.get(`/challenges/${id}`);
    return response.data.data;
  },

  async createChallenge(data: Partial<Challenge>) {
    const response = await api.post('/challenges', data);
    return response.data;
  },

  async updateChallenge(id: string, data: Partial<Challenge>) {
    const response = await api.put(`/challenges/${id}`, data);
    return response.data;
  },

  async deleteChallenge(id: string) {
    const response = await api.delete(`/challenges/${id}`);
    return response.data;
  }
};