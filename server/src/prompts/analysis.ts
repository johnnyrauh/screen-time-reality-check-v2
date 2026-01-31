import { QuestionnaireData } from '../types/index.js';

export function createAnalysisPrompt(data: QuestionnaireData): string {
  const {
    screenTimeData,
    dreamGoal,
    workHours,
    workRole,
    regretApp,
    timeWanted,
    phoneRelationship,
    changeSeriousness,
    successDefinition,
  } = data;

  const appsList = screenTimeData.topApps
    .map(app => `- ${app.name}: ${app.hours.toFixed(1)}h/day (${(app.hours * 7).toFixed(1)}h/week)`)
    .join('\n');

  return `You are a brutally honest but ultimately supportive screen time analyst. Analyze this user's data and create a personalized reality check.

## USER DATA

**Screen Time Stats:**
- Daily Average: ${screenTimeData.dailyAverage.toFixed(1)} hours
- Weekly Total: ${screenTimeData.weeklyTotal.toFixed(1)} hours
- Annual Projection: ${(screenTimeData.weeklyTotal * 52).toFixed(0)} hours

**Top Apps (daily/weekly):**
${appsList}

**Their Dream Goal:** "${dreamGoal}"

**Work Context:** ${workRole}, ${workHours} hours/week

**Most Regretted App:** ${regretApp}

**When They Want Time Back:** ${timeWanted.join(', ')}

**Phone Relationship:** ${phoneRelationship}

**Seriousness Level:** ${changeSeriousness}/10

**Success Definition:** "${successDefinition}"

## ANALYSIS INSTRUCTIONS

Generate a JSON response with the following structure. Be personalized, specific, and use their exact words/goals when relevant.

**Tone Calibration:**
- If seriousness is 1-3: Be gentle and curious
- If seriousness is 4-6: Be direct and motivating
- If seriousness is 7-10: Be tough-love and urgent

**Impact Scoring Guidelines:**
- Calculate impact score (1-100) based on opportunity cost:
  * Hours spent vs. user's stated goals (higher = more impact on their life)
  * App type (social media/entertainment > productivity/utility)
  * Whether it's their regret app (bonus impact points)
  * Time of day context (evening/weekend usage = higher opportunity cost)
- Rank apps from HIGHEST impact (most opportunity cost) to LOWEST impact
- Severity: critical (75-100), high (50-74), medium (25-49), low (1-24)

Return ONLY this JSON structure, no markdown:

{
  "bigNumber": {
    "annualHours": <number>,
    "annualDays": <number - annualHours/24>,
    "severityBadge": "<string like 'Code Red' or 'Warning' or 'Needs Attention'>",
    "shockingStat": "<string comparing to something relatable, e.g., 'That's 3x more than you spend working'>"
  },
  "impactLeaderboard": [
    {
      "appName": "<string>",
      "weeklyHours": <number>,
      "dailyHours": <number>,
      "severity": "<critical|high|medium|low>",
      "impactScore": <number 1-100>,
      "couldHaveDone": "<personalized alternative based on their dream goal>",
      "insight": "<specific behavioral observation>"
    }
  ],
  "gutPunch": {
    "headline": "<punchy headline that hits home>",
    "personalizedMessage": "<2-3 sentences connecting their usage to their stated goals, use their exact words>",
    "dreamConnection": "<direct quote connecting their dream goal to lost time>"
  },
  "patternInsights": [
    {
      "title": "<short insight title>",
      "description": "<specific observation>",
      "badge": "<relevant emoji>"
    }
  ],
  "opportunityTimeline": [
    {
      "period": "1 month",
      "hoursReclaimed": <number based on reducing their worst app by 50%>,
      "achievement": "<what they could accomplish>",
      "badge": "🌱"
    },
    {
      "period": "3 months",
      "hoursReclaimed": <number>,
      "achievement": "<bigger accomplishment>",
      "badge": "🌿"
    },
    {
      "period": "6 months",
      "hoursReclaimed": <number>,
      "achievement": "<significant milestone>",
      "badge": "🌳"
    },
    {
      "period": "1 year",
      "hoursReclaimed": <number>,
      "achievement": "<life-changing achievement>",
      "badge": "🏆"
    }
  ],
  "reclaimPlan": {
    "tier1": [
      {
        "action": "<immediate easy action>",
        "difficulty": "easy",
        "impact": "<expected time saved>"
      }
    ],
    "tier2": [
      {
        "action": "<medium effort action>",
        "difficulty": "medium",
        "impact": "<expected benefit>"
      }
    ],
    "tier3": [
      {
        "action": "<lifestyle change>",
        "difficulty": "hard",
        "impact": "<transformative benefit>"
      }
    ]
  },
  "overallTone": "<gentle|direct|tough-love based on their seriousness level>"
}`;
}
