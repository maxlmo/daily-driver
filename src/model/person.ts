import {Role} from './role';
import {shuffle} from '../array';

export type Person = {
    name: string;
    role: Role;
}

export const rolePrio: { [key in Role]: number } = {
    "dev": 3,
    "ux": 2,
    "po": 1,
    "ac": 0
}

export const shufflePersons = (persons: Person[]): Person[] =>
    shuffle(persons).sort((a, b) => {
            if (rolePrio[a.role] < rolePrio[b.role]) {
                return 1;
            }
            if (rolePrio[a.role] > rolePrio[b.role]) {
                return -1;
            }
            return 0;
        }
    );

