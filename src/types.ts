export interface RegistrationData {
  fullName: string;
  phone: string;
  city: string;
  neighborhood: string;
  acceptsRulesAndAge: boolean;
  receiveReminders: boolean;
}

export interface BingoCardData {
  serialNumber: string;
  playerName: string;
  playerCity: string;
  matrix: number[][]; // 5x5 matrix, center (2,2) is 0 (free space)
  createdAt: string;
}

export interface PointRule {
  id: string;
  name: string;
  points: number;
  description: string;
  iconName: string;
  previewGrid: boolean[][]; // 5x5 pattern highlight
}

export interface FAQItem {
  question: string;
  answer: string;
  highlight?: string;
}
