
// Enums for political orientations
export enum PoliticalOrientation {
  FarLeft = "Far Left",
  LeftWing = "Left Wing",
  Center = "Center",
  RightWing = "Right Wing",
  FarRight = "Far Right"
}

// Types
export interface ParliamentaryGroup {
  id: string;
  name: string;
  color: string;
  orientation: PoliticalOrientation;
  seatsCount: number;
  description: string;
}

export interface Politician {
  id: string;
  name: string;
  groupId: string;
  avatar: string;
  role?: string;
  specialty: string;
}

export interface LawProposal {
  id: string;
  title: string;
  description: string;
  proposedBy: string;
  status: "pending" | "debating" | "passed" | "rejected";
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
  tags: string[];
}

export interface DebateStatement {
  id: string;
  politicianId: string;
  lawId: string;
  content: string;
  timestamp: number;
}

// Helper functions
export const getGroupById = (
  groupId: string,
  groups: ParliamentaryGroup[]
): ParliamentaryGroup | undefined => {
  return groups.find((group) => group.id === groupId);
};

export const getPoliticianById = (
  politicianId: string,
  politicians: Politician[]
): Politician | undefined => {
  return politicians.find((politician) => politician.id === politicianId);
};

export const getPoliticiansByGroup = (
  groupId: string,
  politicians: Politician[]
): Politician[] => {
  return politicians.filter((politician) => politician.groupId === groupId);
};

export const getLawById = (
  lawId: string,
  laws: LawProposal[]
): LawProposal | undefined => {
  return laws.find((law) => law.id === lawId);
};

export const getStatementsByLaw = (
  lawId: string,
  statements: DebateStatement[]
): DebateStatement[] => {
  return statements
    .filter((statement) => statement.lawId === lawId)
    .sort((a, b) => a.timestamp - b.timestamp);
};

// Generate sentences based on political orientation
export const generatePoliticalResponse = (
  politician: Politician,
  group: ParliamentaryGroup,
  topic: string
): string => {
  // This is a placeholder - in a real app, you might use a more sophisticated
  // approach or AI to generate realistic statements based on political orientation
  
  const responses = {
    [PoliticalOrientation.FarLeft]: [
      "We must radically transform the system to address this issue.",
      "The struggle of the people demands revolutionary action on this matter.",
      "This is another example of systemic inequalities that must be uprooted.",
      "We need complete restructuring, not incremental change.",
      "Power must be returned to the people, not concentrated in the hands of the few."
    ],
    [PoliticalOrientation.LeftWing]: [
      "We should invest more in public services to address this challenge.",
      "This requires a compassionate approach that protects the vulnerable.",
      "Government intervention is necessary to ensure fairness and equality.",
      "We must consider the social impact alongside economic factors.",
      "Progressive taxation would help fund solutions to this problem."
    ],
    [PoliticalOrientation.Center]: [
      "We need a balanced approach that considers all perspectives.",
      "Let's find a pragmatic solution that works for everyone.",
      "Both sides have valid points, but compromise is essential.",
      "We should follow the evidence while respecting diverse viewpoints.",
      "Incremental, practical steps will move us forward on this issue."
    ],
    [PoliticalOrientation.RightWing]: [
      "The free market will provide the most efficient solution here.",
      "We must reduce regulations to allow innovation to address this challenge.",
      "Lower taxes will stimulate the growth needed to solve this problem.",
      "Traditional values and personal responsibility are central to this issue.",
      "The private sector, not government, should take the lead on this."
    ],
    [PoliticalOrientation.FarRight]: [
      "This threatens our national sovereignty and traditional way of life.",
      "Radical elements are undermining our society with this agenda.",
      "Strong leadership is needed to restore order in this matter.",
      "We must protect our heritage and values against these changes.",
      "Law and order must be the priority in addressing this situation."
    ]
  };

  const orientationResponses = responses[group.orientation] || responses[PoliticalOrientation.Center];
  return orientationResponses[Math.floor(Math.random() * orientationResponses.length)];
};

// Generate a random statement ID
export const generateStatementId = (): string => {
  return `stmt_${Math.random().toString(36).substring(2, 11)}`;
};
