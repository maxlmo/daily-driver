import React, { useState, KeyboardEvent } from 'react';
import { useEventListener } from "../hooks/globalEventListener";
import { Person, shufflePersons } from '../model/person';
import { Role } from '../model/role';
import { Attendee } from './Attendee';
import { Button, Card, Typography } from "@mui/material";
import {useAttendees} from '../hooks/useAttendees';

export function DailyDriver() {
    const [index, setIndex] = useState(0);
    const [attendees, setAttendees]  = useAttendees();
    const roleFilter = (persons: Person[], role: Role) => persons.filter(p => p.role === role);
    const devs = roleFilter(attendees, "dev");
    const uxs = roleFilter(attendees, "ux");
    const pos = roleFilter(attendees, "po");
    const acs = roleFilter(attendees, "ac");

    const onKeyDown = (key: KeyboardEvent<HTMLImageElement>) => {
        if (!key.shiftKey) {
            return;
        }
        if (key.code === "ArrowDown") {
            increaseIndex();
        }
        if (key.code === "ArrowUp") {
            const newIndex = index <= 1 ? 0 : index - 1;
            setIndex(newIndex);
        }
        if (key.code === "Space"){
            shuffle();
        }
    }

    const increaseIndex = () => {
        if (index == attendees.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    }

    useEventListener("keydown", onKeyDown);

    const shuffle = () => {
        const shuffledPersons = shufflePersons(attendees)
        setAttendees(shuffledPersons);
        setIndex(0);
    }

    return (
        <Card elevation={10} sx={{px: 4, py: 2, bgcolor: '#fff'}}>
              <Typography variant="h4">Devs</Typography>
              {devs.map((d, i) => <Attendee key={i} person={d} selected={d.name === attendees[index].name}/>)}
              <Typography variant="h4">UI/UX</Typography>
              {uxs.map((d, i) => <Attendee key={i} person={d} selected={d.name === attendees[index].name}/>)}
              <Typography variant="h4">PO</Typography>
              {pos.map((d, i) => <Attendee key={i} person={d} selected={d.name === attendees[index].name}/>)}
             <Typography variant="h4">AC</Typography>
             {acs.map((d, i) => <Attendee key={i} person={d} selected={d.name === attendees[index].name}/>)}
             <div style={{display: 'flex', justifyContent: 'center', marginTop: "5px"}}>
                  <Button variant="contained" onClick={increaseIndex}>Next</Button>
                  <Button style={{marginLeft: "10px"}} onClick={shuffle}>Shuffle</Button>
              </div>
         </Card>
    )
}