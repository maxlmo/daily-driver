import React from 'react';
import { Person } from '../model/person';
import { Chip, Typography } from "@mui/material";

export function Attendee(props: { person: Person, selected: boolean }) {
    const height = "32px";
    if (props.selected) {
        return <Chip sx={{width: "100%", height}} color="primary"
                     label={<Typography fontWeight={600} variant="body1">{props.person.name}</Typography>}/>
    }
    return <Typography sx={{height}}>{props.person.name}</Typography>;
}
