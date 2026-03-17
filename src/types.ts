export interface RankingData {
  group: string;
  rank: number;
  region: string;
  yoy: number;
  change: number; // Positive for up, negative for down, 0 for no change
  achievementRate?: number; // For incentive page
  achievementRank?: number; // For incentive page
}

export type MainTabType = 'incentive' | 'leaderboard';
export type SubTabType = 
  | 'overall' 
  | 'small_package' 
  | 'large_package' 
  | 'individual_order' 
  | 'incentive_overall' 
  | 'incentive_large' 
  | 'incentive_small';

export interface LeaderboardConfig {
  title: string;
  slogan: string;
  period: string;
}
