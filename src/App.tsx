///<reference types="chrome"/>
import './App.css';
import './Button.css';
import React, { useState } from 'react'
import Draggable from 'react-draggable';
import { useEventListener } from "./hooks/globalEventListener";
import { shuffle } from './array';

type Role = "dev" | "ux" | "po" | "other";

type Person = {
    name: string;
    role: Role;
}

const all: Person[] = [
    {name: "Benedikt", role: "dev"},
    {name: "Chö", role: "dev"},
    {name: "Dominik", role: "dev"},
    {name: "Matthias B.", role: "dev"},
    {name: "Matze", role: "dev"},
    {name: "Max", role: "dev"},
    {name: "Robert", role: "dev"},
    {name: "Thomas", role: "dev"},
    {name: "Tobi", role: "dev"},
    {name: "Jacqueline", role: "ux"},
    {name: "Johannes", role: "ux"},
    {name: "Luise", role: "po"},
    {name: "Carsten", role: "po"},
    {name: "Michael", role: "po"},
    {name: "Martina", role: "other"},
];

const rolePrio = {
    "dev": 3,
    "ux": 2,
    "po": 1,
    "other": 0
}

function Person(props: { person: Person, selected: boolean }) {
    const style = props.selected ? {
        border: 1,
        color: "#fff",
        borderRadius: "25px",
        padding: "10px",
        fontWeight: 700,
        paddingLeft: "20px",
        backgroundColor: "#0065ff"
    } : {};
    return (
      <p className="dd-content" style={{...{padding: "5px"}, ...style}}>{props.person.name} {props.selected}</p>
    )
}

function App() {
    const [persons, setPersons] = useState<Person[]>(all);
    const [index, setIndex] = useState(0);
    const increaseIndex = () => {
        if (index == persons.length - 2) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    }
    useEventListener("keydown", (key) => {
        if (!key.shiftKey) {
            return;
        }
        if (key.key === "ArrowDown") {
            increaseIndex();
        }
        if (key.key === "ArrowUp") {
            const newIndex = index <= 1 ? 0 : index - 1;
            setIndex(newIndex);
        }
    });
    const roleFilter = (persons: Person[], role: Role) => persons.filter(p => p.role === role);
    const devs = roleFilter(persons, "dev");
    const uxs = roleFilter(persons, "ux");
    const pos = roleFilter(persons, "po");

    const shufflePersons = () => {
        const shuffled = shuffle(persons).sort((a, b) => {
            if (rolePrio[a.role] < rolePrio[b.role]) {
                return 1;
            }
            if (rolePrio[a.role] > rolePrio[b.role]) {
                return -1;
            }
            return 0;
        })
        setPersons(shuffled);
        setIndex(0);
    }

    return (
      <Draggable>
          <div id="container"
               style={{position: "absolute", right: 0, width: 200, border: "1px solid", zIndex: 1000, padding: "10px"}}>
              <h2 className="dd-content">Devs:</h2>
              {devs.map((d, i) => <Person key={i} person={d} selected={d.name === persons[index].name}/>)}
              <h2 className="dd-content">UI/UX:</h2>
              {uxs.map((d, i) => <Person key={i} person={d} selected={d.name === persons[index].name}/>)}
              <h2 className="dd-content">PO</h2>
              {pos.map((d, i) => <Person key={i} person={d} selected={d.name === persons[index].name}/>)}
              <div style={{display: 'flex', justifyContent: 'center', marginTop: "5px"}}>
                  <button
                    className="next-button"
                    onClick={increaseIndex}
                    onKeyDown={(k) => {
                        console.log(k);
                        if (k.key === "Enter" && k.shiftKey) {
                            increaseIndex();
                        }
                    }}>
                      Next
                  </button>
                  <button style={{marginLeft: "10px"}} onClick={shufflePersons}>Shuffle</button>
              </div>
          </div>
      </Draggable>
    )
}

export default App
