import { Category } from './category';

export class SportType {
    id: number;
    sport: string;
    teamSport: boolean;
    categories: Category[];
}