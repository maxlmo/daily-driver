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
    "other": 0
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

export const all: Person[] = [
    {name: "Benedikt", role: "dev"},
    {name: "Chö", role: "dev"},
    {name: "Dominik", role: "dev"},
    {name: "Matthias B.", role: "dev"},
    {name: "Matze", role: "dev"},
    {name: "Max", role: "dev"},
    {name: "Robert", role: "dev"},
    {name: "Thomas", role: "dev"},
    {name: "Tobi", role: "dev"},
    {name: "Johannes M.", role: "dev"},
    {name: "Jacqueline", role: "ux"},
    {name: "Johannes", role: "ux"},
    {name: "Luise", role: "po"},
    {name: "Carsten", role: "po"},
    {name: "Michael", role: "po"},
    {name: "Martina", role: "other"},
];
