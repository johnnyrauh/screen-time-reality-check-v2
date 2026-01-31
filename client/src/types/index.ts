export interface AppUsage {
  name: string;
  hours: number;
}

export interface ScreenTimeData {
  dailyAverage: number;
  weeklyTotal: number;
  topApps: AppUsage[];
  timePeriod: string;
}

export interface QuestionnaireData {
  screenTimeData: ScreenTimeData;
  dreamGoal: string;
  workHours: number;
  workRole: string;
  regretApp: string;
  timeWanted: string[];
  phoneRelationship: string;
  changeSeriousness: number;
  successDefinition: string;
}

export interface ImpactScore {
  appName: string;
  weeklyHours: number;
  dailyHours: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  impactScore: number;
  couldHaveDone: string;
  insight: string;
}

export interface Milestone {
  period: string;
  hoursReclaimed: number;
  achievement: string;
  badge: string;
}

export interface ActionItem {
  action: string;
  difficulty: 'easy' | 'medium' | 'hard';
  impact: string;
}

export interface AnalysisResult {
  bigNumber: {
    annualHours: number;
    annualDays: number;
    severityBadge: string;
    shockingStat: string;
  };
  impactLeaderboard: ImpactScore[];
  gutPunch: {
    headline: string;
    personalizedMessage: string;
    dreamConnection: string;
  };
  patternInsights: {
    title: string;
    description: string;
    badge: string;
  }[];
  opportunityTimeline: Milestone[];
  reclaimPlan: {
    tier1: ActionItem[];
    tier2: ActionItem[];
    tier3: ActionItem[];
  };
  overallTone: 'gentle' | 'direct' | 'tough-love';
}
