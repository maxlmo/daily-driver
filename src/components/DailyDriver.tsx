import React, { useState, KeyboardEvent } from 'react';
import { useEventListener } from "../hooks/globalEventListener";
import { all, Person, shufflePersons } from '../model/person';
import { Role } from '../model/role';
import { Attendee } from './Attendee';
import { Box, Button, Card, Typography } from "@mui/material";

export function DailyDriver() {
    const [index, setIndex] = useState(0);
    const [persons, setPersons] = useState<Person[]>(all);
    const roleFilter = (persons: Person[], role: Role) => persons.filter(p => p.role === role);
    const devs = roleFilter(persons, "dev");
    const uxs = roleFilter(persons, "ux");
    const pos = roleFilter(persons, "po");
    const other = roleFilter(persons, "other");

    const onKeyDown = (key: KeyboardEvent<HTMLImageElement>) => {
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
    }

    const increaseIndex = () => {
        if (index == persons.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    }

    useEventListener("keydown", onKeyDown);

    return (
         <Card elevation={10} sx={{px: 4, py: 2, bgcolor: '#fff'}}>
              <Typography variant="h4">Devs</Typography>
              {devs.map((d, i) => <Attendee key={i} person={d} selected={d.name === persons[index].name}/>)}
              <Typography variant="h4">UI/UX</Typography>
              {uxs.map((d, i) => <Attendee key={i} person={d} selected={d.name === persons[index].name}/>)}
              <Typography variant="h4">PO</Typography>
              {pos.map((d, i) => <Attendee key={i} person={d} selected={d.name === persons[index].name}/>)}
             <Typography variant="h4">Other</Typography>
             {other.map((d, i) => <Attendee key={i} person={d} selected={d.name === persons[index].name}/>)}
             <div style={{display: 'flex', justifyContent: 'center', marginTop: "5px"}}>
                  <Button variant="contained" onClick={increaseIndex}>Next</Button>
                  <Button style={{marginLeft: "10px"}} onClick={() => {
                      const shuffledPersons = shufflePersons(persons)
                      setPersons(shuffledPersons);
                      setIndex(0);
                  }}>Shuffle</Button>
              </div>
         </Card>
    )
}