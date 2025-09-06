import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { StateSelect } from './selectOptsComponent';
import MainWrap from './mainWrapComponent';
import KBPagination from './pagination';

//import { kbRoster } from '../shared/KBroster';
import * as serverOps from '../shared/serverOps';

export class FindFormPlusList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: null,
            state: null,
            zip: null,
            kups: null,
            of: null
        };
        this.zipRef = React.createRef();
        this.cityRef = React.createRef();
        this.stateRef = React.createRef();
    }

    componentDidMount() {
        serverOps.findRequest(null)
            .then(found => {
                let of = found.ofTotal ? Math.ceil(found.ofTotal / found.segmentSize)  : 0;
                this.setState({ city: null, state: null, zip: null, kups: found.kupboards, of: of });
            })
            .catch(err => console.log(err));
    }

    updateList = (event) => {
        event.preventDefault();
        let newLocation = {
            zip: this.zipRef.current ? this.zipRef.current.value : null,
            state: this.stateRef.current ? this.stateRef.current.value : null,
            city: this.cityRef.current ? this.cityRef.current.value : null
        };
        let search = serverOps.nullFilter(newLocation);
        // alert(JSON.stringify(localle));
        // alert(JSON.stringify(newLocation));
        serverOps.findRequest(search, null)
            .then(found => {
                let of = Math.ceil(found.ofTotal / found.segmentSize);
                this.setState({ ...newLocation, kups: found.kupboards, of: of });
                //alert(JSON.stringify(found));
            })
            .catch(err => console.log(err));
    }


    render() {

        // let locations = Object.values(kbRoster).filter(location =>
        //     (!this.state.state || this.state.state === location.state) &&
        //     (!this.state.zip || this.state.zip === location.zip) &&
        //     (!this.state.city || this.state.city === location.city)
        // );
        return (
            <React.Fragment>
                <MainWrap>
                    <FindForm onSub={this.updateList} zipRef={this.zipRef} cityRef={this.cityRef} stateRef={this.stateRef} />
                </MainWrap>
                <KBList list={this.state.kups} />
                <KBPagination at={this.props.at} of={this.state.of} route={this.props.route} />
            </React.Fragment >
        );
    }
}

export class FindForm extends Component {


    autofill(event) {
        fetch('https://api.zippopotam.us/us/' + event.target.value)
            .then(response => response.json())
            .then(location => {
                if (location.places) {
                    this.props.cityRef.current.value = location.places[0]['place name'];
                    this.props.stateRef.current.value = location.places[0]['state abbreviation'];
                }
            });
    }

    render() {
        return (
            <Form id="locate" className="row pt-4 pb-2" onSubmit={event => this.props.onSub(event)}>
                <Col className="h3 pb-1" xs="12" lg="3">
                    <h2 className="text-center font-weight-light">Find a Kupboard Near&nbsp;You.</h2>
                </Col>
                <Col className="pt-1" sm="3" xs="12" lg="2">
                    <FormGroup>
                        <Label for="zip">ZIP Code</Label>
                        <Input type="number" name="zip" id="zip" innerRef={this.props.zipRef} onBlur={(event) => this.autofill(event)} />
                    </FormGroup>
                </Col>
                <Col className="pt-1" sm="6" md="4" xs="12" lg="3" >
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input type="text" name="city" id="city" innerRef={this.props.cityRef} />
                    </FormGroup>
                </Col>
                <Col className="pt-1" sm="3" xs="12" lg="2">
                    <FormGroup>
                        <Label for="state">State</Label>
                        <StateSelect name="state" id="state" passRef={this.props.stateRef} />
                    </FormGroup>
                </Col>
                <Col className="pt-3 pt-sm-1" md="2" xs="12">
                    <Label className="d-none d-md-block">&nbsp;</Label>
                    <Button color="primary" block name="search" id="search" value="search" className="mb-3">Search</Button>
                </Col>
            </Form >
        );
    }
}

export function KBList(props) {
    if (props.list?.length === undefined) { return <div className="results-list spinner text-center pb-3"> Awaiting Connection...</div>}
    return props.list.length ? (
        <ul className="results-list">
            {props.list.map(item => <KBListItem  {...item} />)}
        </ul>
    )
        : (<div className="results-list text-center pb-3">No Kupboards active in this locality.</div>);
}



export function KBListItem({ img, alt, name, address, city, state, zip, itemTypeCt, hours, _id }) {
    let id = _id;
    img = img ? img : "default.jpg";
    return (
        <Container tag="li" fluid key={"KBListItem" + id} >
            <a href={"/view/" + id} className="container">
                <Row tag="dl">
                    <Col tag="dt" xs="12" md="3" lg="3">
                        <img className="d-block img-thumbnail mb-3 mx-auto mx-md-0" src={serverOps.STORAGE_LOC + img} alt={alt} />
                    </Col>
                    <Col tag="dt" xs="12" sm="6" md="5" lg="3" className="text-center text-sm-left">
                        <h5 className="h4 font-weight-light">{name}</h5>
                        <div>{address}</div>
                        <div>{city}, {state} {zip}</div>
                        <div
                            className="badge-pill bg-info d-inline-block px-2 my-3 text-center font-weight-light text-white">
                            {itemTypeCt} item types</div>
                    </Col>
                    <Col xs="12" sm="6" md="4" className="d-none d-sm-block">
                        <ListSchedule hours={hours} />
                    </Col>
                </Row>
            </a>
        </Container>
    );
}


export function ListSchedule({ hours }) {
    return (
        <ol className="list-unstyled" >
            {
                hours ? hours.map(hour => {
                    return hour.day ?
                        (<li className="schedule">
                            <strong>{hour.day + ( hour.toDay && hour.day !== hour.toDay  ? " - " + hour.toDay : "")}:&nbsp;</strong>
                            <span> {hour.open} - {hour.close}</span>
                        </li>)
                        : null;
                })
                    : null
            }
        </ol >
    )
}
