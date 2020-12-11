import React from 'react';
import { Input } from 'reactstrap';
import { statesList } from '../shared/statelist'

export function StateSelect({ name, id, classes, required, value, passRef, change }) {
    let selClass = "custom-select" + (classes ? classes : '');
    return (
        <Input type="select" name={name} id={id} className={selClass} required={required} value={value} innerRef={passRef} onChange={change}>
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
            <option value="Mon.">Mon</option>
            <option value="Tue.">Tue</option>
            <option value="Wed.">Wed</option>
            <option value="Thrs.">Thrs</option>
            <option value="Fri.">Fri</option>
            <option value="Sat.">Sat</option>
            <option value="Sun.">Sun</option>
        </Input>
    );
}
