export interface RegistrationData {
  fullName: string;
  phone: string;
  city: string;
  neighborhood: string;
  acceptsRulesAndAge: boolean;
  receiveReminders: boolean;
  invitedBy?: string;
}

export interface RegistrationRecord {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  neighborhood: string;
  serialNumber: string;
  cardMatrix: number[][];
  createdAt: string;
  joinedWhatsApp: boolean;
  status: 'activo' | 'ganador' | 'descalificado';
  invitedBy?: string;
}

export interface PrizeItemSettings {
  title: string;
  subtitle?: string;
  voucherValue: string;
  description: string;
  badge: string;
}

export interface TournamentSettings {
  whatsappGroupLink: string;
  firstPrize: PrizeItemSettings;
  secondPrize: PrizeItemSettings;
  thirdPrize: PrizeItemSettings;
  supabaseUrl: string;
  supabaseAnonKey: string;
  adminPin: string;
  heroImageUrl?: string;
  communityImageUrl?: string;
  prizesImageUrl?: string;
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
