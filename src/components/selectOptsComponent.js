import React from 'react';
import { Input } from 'reactstrap';
import { statesList } from '../shared/statelist'

export function StateSelect({ name, id, classes, required, value, passRef, change, invalid }) {
    let selClass = "custom-select" + (classes ? classes : '');
    return (
        <Input type="select" name={name} id={id} className={selClass} required={required} value={value} innerRef={passRef} onChange={change} invalid={invalid}>
            <option value="">Select:</option>
            {statesList ? (statesList.map(st => <option value={st.abr}>{st.abr}</option>)) : null}
        </Input>
    );
}

export function DaySelect({ name, id, classes, required, value, passRef, change, index }) {
    let selClass = "custom-select" + (classes ? classes : '');
    return (
        <Input type="select" name={name} id={id} className={selClass} required={required} value={value} innerRef={passRef} onChange={(event) => change(event, index)}>
            <option value="">Day:</option>
            <option value="Monday">Mon</option>
            <option value="Tuesday">Tue</option>
            <option value="Wednesday">Wed</option>
            <option value="Thursday">Thrs</option>
            <option value="Friday">Fri</option>
            <option value="Saturday">Sat</option>
            <option value="Sunday">Sun</option>
        </Input>
    );
}
