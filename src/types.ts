export interface MemoryItem {
  id: number;
  title: string;
  date: string;
  location: string;
  quote: string;
  description: string;
  imagePlaceholder: string;
  badge: string;
  likesCount: number;
  tags: string[];
}

export interface ReasonItem {
  id: number;
  title: string;
  iconName: string;
  description: string;
  category: string;
}

export interface FutureItem {
  id: number;
  title: string;
  period: string;
  description: string;
  iconName: string;
  tag: string;
  color: 'pink' | 'purple' | 'blue' | 'cream';
}

export interface GardenFlower {
  id: number;
  type: string;
  color: string;
  petals: number;
  quote: string;
  bloomed: boolean;
  x: number;
  y: number;
}
