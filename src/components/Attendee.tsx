import React from 'react';
import { Person } from '../model/person';
import { Chip } from "@mui/material";

export function Attendee(props: { person: Person, selected: boolean }) {
    if (props.selected) {
        return <Chip sx={{width: "100%"}} color="primary" label={props.person.name}/>
    }
    return <p style={{...{padding: "5px"}}}>{props.person.name}</p>;
}
