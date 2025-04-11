import { PoliticalOrientation, ParliamentaryGroup, Politician, LawProposal, DebateStatement } from "../utils/parliamentUtils";

// Define political groups
export const politicalGroups: ParliamentaryGroup[] = [
  {
    id: "conservatives",
    name: "Conservative Alliance",
    color: "parliament-conservative",
    orientation: PoliticalOrientation.RightWing,
    seatsCount: 28,
    description: "Advocates for traditional values, free markets, and limited government intervention."
  },
  {
    id: "liberals",
    name: "Progressive Liberals",
    color: "parliament-liberal",
    orientation: PoliticalOrientation.LeftWing,
    seatsCount: 23,
    description: "Promotes social equality, welfare programs, and progressive social policies."
  },
  {
    id: "greens",
    name: "Green Future",
    color: "parliament-green",
    orientation: PoliticalOrientation.LeftWing,
    seatsCount: 15,
    description: "Focuses on environmental protection, climate action, and sustainable development."
  },
  {
    id: "moderates",
    name: "Centrist Moderates",
    color: "parliament-moderate",
    orientation: PoliticalOrientation.Center,
    seatsCount: 18,
    description: "Seeks compromise solutions and practical governance approaches."
  },
  {
    id: "radicals",
    name: "Radical Reform",
    color: "parliament-radical",
    orientation: PoliticalOrientation.FarLeft,
    seatsCount: 16,
    description: "Advocates for fundamental system changes and direct democracy."
  }
];

// Sample politicians (5 from each group)
export const politicians: Politician[] = [
  {
    id: "c1",
    name: "Victoria Montgomery",
    groupId: "conservatives",
    avatar: "/placeholder.svg",
    role: "Group Leader",
    specialty: "Economic Affairs"
  },
  {
    id: "c2",
    name: "Richard Sterling",
    groupId: "conservatives",
    avatar: "/placeholder.svg",
    specialty: "Defense"
  },
  {
    id: "c3",
    name: "Elizabeth Harrington",
    groupId: "conservatives",
    avatar: "/placeholder.svg",
    specialty: "Foreign Affairs"
  },
  {
    id: "c4",
    name: "James Wilson",
    groupId: "conservatives",
    avatar: "/placeholder.svg",
    specialty: "Agriculture"
  },
  {
    id: "c5",
    name: "William Thornton",
    groupId: "conservatives",
    avatar: "/placeholder.svg",
    specialty: "Justice"
  },

  {
    id: "l1",
    name: "Sophia Rodriguez",
    groupId: "liberals",
    avatar: "/placeholder.svg",
    role: "Group Leader",
    specialty: "Education"
  },
  {
    id: "l2",
    name: "Marcus Johnson",
    groupId: "liberals",
    avatar: "/placeholder.svg",
    specialty: "Healthcare"
  },
  {
    id: "l3",
    name: "Aria Chen",
    groupId: "liberals",
    avatar: "/placeholder.svg",
    specialty: "Social Welfare"
  },
  {
    id: "l4",
    name: "Darius Williams",
    groupId: "liberals",
    avatar: "/placeholder.svg",
    specialty: "Civil Rights"
  },
  {
    id: "l5",
    name: "Leila Hassan",
    groupId: "liberals",
    avatar: "/placeholder.svg",
    specialty: "Housing"
  },

  {
    id: "g1",
    name: "Oliver Greenwood",
    groupId: "greens",
    avatar: "/placeholder.svg",
    role: "Group Leader",
    specialty: "Environment"
  },
  {
    id: "g2",
    name: "Fiona Rivers",
    groupId: "greens",
    avatar: "/placeholder.svg",
    specialty: "Climate Policy"
  },
  {
    id: "g3",
    name: "Raj Patel",
    groupId: "greens",
    avatar: "/placeholder.svg",
    specialty: "Sustainable Transport"
  },
  {
    id: "g4",
    name: "Luna Forest",
    groupId: "greens",
    avatar: "/placeholder.svg",
    specialty: "Renewable Energy"
  },
  {
    id: "g5",
    name: "Thomas Berg",
    groupId: "greens",
    avatar: "/placeholder.svg",
    specialty: "Wildlife Conservation"
  },

  {
    id: "m1",
    name: "Catherine Gray",
    groupId: "moderates",
    avatar: "/placeholder.svg",
    role: "Group Leader",
    specialty: "Economic Stability"
  },
  {
    id: "m2",
    name: "Michael Brown",
    groupId: "moderates",
    avatar: "/placeholder.svg",
    specialty: "Budget"
  },
  {
    id: "m3",
    name: "Sarah Miller",
    groupId: "moderates",
    avatar: "/placeholder.svg",
    specialty: "Infrastructure"
  },
  {
    id: "m4",
    name: "David Park",
    groupId: "moderates",
    avatar: "/placeholder.svg",
    specialty: "Technology"
  },
  {
    id: "m5",
    name: "Jennifer Lee",
    groupId: "moderates",
    avatar: "/placeholder.svg",
    specialty: "Small Business"
  },

  {
    id: "r1",
    name: "Felix Diaz",
    groupId: "radicals",
    avatar: "/placeholder.svg",
    role: "Group Leader",
    specialty: "Political Reform"
  },
  {
    id: "r2",
    name: "Zoe Black",
    groupId: "radicals",
    avatar: "/placeholder.svg",
    specialty: "Workers' Rights"
  },
  {
    id: "r3",
    name: "Kwame Otieno",
    groupId: "radicals",
    avatar: "/placeholder.svg",
    specialty: "Anti-Corruption"
  },
  {
    id: "r4",
    name: "Astrid Berg",
    groupId: "radicals",
    avatar: "/placeholder.svg",
    specialty: "Public Ownership"
  },
  {
    id: "r5",
    name: "Marcel Dubois",
    groupId: "radicals",
    avatar: "/placeholder.svg",
    specialty: "Direct Democracy"
  }
];

// Sample law proposals
export const lawProposals: LawProposal[] = [
  {
    id: "law1",
    title: "Universal Basic Income Act",
    description: "Establish a universal basic income of $1000 monthly for all adult citizens.",
    proposedBy: "liberals",
    status: "debating",
    votes: {
      for: 0,
      against: 0,
      abstain: 0
    },
    tags: ["economy", "welfare", "social"]
  },
  {
    id: "law2",
    title: "Corporate Tax Reform",
    description: "Reduce corporate tax rates from 35% to 25% to stimulate economic growth.",
    proposedBy: "conservatives",
    status: "pending",
    votes: {
      for: 0,
      against: 0,
      abstain: 0
    },
    tags: ["economy", "taxation", "business"]
  },
  {
    id: "law3",
    title: "Green Energy Transition Act",
    description: "Mandate 50% renewable energy by 2030 and 100% by 2045.",
    proposedBy: "greens",
    status: "pending",
    votes: {
      for: 0,
      against: 0,
      abstain: 0
    },
    tags: ["environment", "energy", "climate"]
  },
  {
    id: "law4",
    title: "Electoral Reform Initiative",
    description: "Implement ranked-choice voting in all national elections.",
    proposedBy: "radicals",
    status: "pending",
    votes: {
      for: 0,
      against: 0,
      abstain: 0
    },
    tags: ["political", "voting", "democratic"]
  },
  {
    id: "law5",
    title: "Infrastructure Investment Plan",
    description: "Allocate $500 billion over 10 years to modernize national infrastructure.",
    proposedBy: "moderates",
    status: "pending",
    votes: {
      for: 0,
      against: 0,
      abstain: 0
    },
    tags: ["infrastructure", "economy", "development"]
  }
];

// Sample debate statements for the active law
export const initialDebateStatements: DebateStatement[] = [
  {
    id: "stmt1",
    politicianId: "l1",
    lawId: "law1",
    content: "Universal Basic Income will provide economic security to millions and boost our economy from the bottom up.",
    timestamp: new Date().getTime() - 300000
  },
  {
    id: "stmt2",
    politicianId: "c1",
    lawId: "law1",
    content: "This proposal is fiscally irresponsible and would lead to massive inflation and workforce reduction.",
    timestamp: new Date().getTime() - 250000
  },
  {
    id: "stmt3",
    politicianId: "g1",
    lawId: "law1",
    content: "While we support the principle, we must ensure this program is funded sustainably and doesn't increase carbon consumption.",
    timestamp: new Date().getTime() - 200000
  },
  {
    id: "stmt4",
    politicianId: "m1",
    lawId: "law1",
    content: "We propose a compromise - a targeted basic income for low-income citizens with a gradual implementation.",
    timestamp: new Date().getTime() - 150000
  },
  {
    id: "stmt5",
    politicianId: "r1",
    lawId: "law1",
    content: "This doesn't go far enough. We should be looking at full wealth redistribution, not token payments.",
    timestamp: new Date().getTime() - 100000
  }
];
