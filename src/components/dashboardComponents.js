import React, { Component } from 'react';
import { Col, Row, FormGroup, Label, Input, Button, Form, InputGroupAddon, InputGroupText, FormFeedback } from 'reactstrap';
import InputGroup from 'reactstrap/lib/InputGroup';
import { DaySelect, StateSelect } from './selectOptsComponent'
import validator from '../shared/validation'
import * as serverOps from '../shared/serverOps';


export class DashForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kb_id: this.props.kup_id,
            itemsToDel: [],
            annsToDel: [],
            hoursToDel: [],
            next_ann: 0,
            next_item: 0,
            next_hour: 0,
            announcements: this.props.comments,
            items: this.props.items,
            submit: null,
            ...this.props.kupboard
        }
        this.submitAction = null;
        this.fieldTests = {
            userName: [{ test: "required", err: "Please fill in your name." }, { test: "isValidName", err: "Please fill  a valid name." }],
            userLastName: [{ test: "required", err: "Please fill in your last name." }, { test: "isValidName", err: "Please fill  a valid last name." }],
            userEmail: [{ test: "required", err: "Email is required." }, { test: "isValidEmail", err: "Please provide a valid email." }],
            address: [{ test: "required", err: "A street address is required." }, { test: "isValidAddress", err: "Please provide a valid street address." }],
            zip: [{ test: "required", err: "A ZIP code is required." }, { test: "isValidZip", err: "Please provide a valid Zip Code." }],
            state: [{ test: "required", err: "Select your state." }],
            city: [{ test: "required", err: "Please provide a city name." }],
            confirmPass: [{ test: "match", arg: "newPass", err: "Passwords do not match." }],
        }
        this.validator = new validator(this.fieldTests);

    }

    handleChange = (event, index) => {
        let fromDB;
        let el = event.target;
        let val = el.value;
        let newStateProp = false;
        let elName = el.name ? el.name : el.className;
        elName = elName.split('[');
        elName = elName[0];
        switch (elName) {
            case "fa fa-close delcomm":
                fromDB = this.state.announcements[index]._id;
                newStateProp = this.state.announcements.splice(index, 1);
                if (fromDB) {
                    let delList = [...this.state.annsToDel]
                    delList.push(fromDB);
                    newStateProp = { announcements: this.state.announcements, annsToDel: delList }
                }
                break;
            case "commentTitle":
                newStateProp = this.state.announcements;
                newStateProp[index].title = val;
                break;
            case "commentBody":
                newStateProp = this.state.announcements;
                newStateProp[index].text = val;
                break;
            case "inventoryItem":
                newStateProp = this.state.items;
                newStateProp[index].name = val;
                break;
            case "inventoryCt":
                newStateProp = this.state.items;
                newStateProp[index].qty = val;
                break;
            case "active":
                newStateProp = this.state.items;
                newStateProp[index].act = el.checked;
                break;
            case "fa fa-close delete":
                fromDB = this.state.items[index]._id;
                newStateProp = { items: [... this.state.items] }
                newStateProp.items.splice(index, 1);
                if (fromDB) {
                    let delList = [...this.state.itemsToDel]
                    delList.push(fromDB);
                    newStateProp.itemsToDel = delList;
                }
                break;
            case "fa fa-close delday":
                newStateProp = this.state.hours.splice(index, 1);
                break;
            case "request":
                newStateProp = this.state.items;
                newStateProp[index].req = el.checked;
                break;
            case "userName":
                newStateProp = { userName: val };
                break;
            case "userLastName":
                newStateProp = { userLastName: val };
                break;
            case "city":
                newStateProp = { city: val };
                break;
            case "state":
                newStateProp = { state: val };
                break;
            case "zip":
                newStateProp = { zip: val };
                break;
            case "oldPass":
                newStateProp = { oldPass: val };
                break;
            case "newPass":
                newStateProp = { newPass: val };
                break;
            case "confirmPass":
                newStateProp = { confirmPass: val };
                break;
            case "userEmail":
                newStateProp = { userEmail: val };
                break;
            case "share":
                newStateProp = { share: val };
                break;
            case "description":
                newStateProp = { details: val };
                break;
            case "address":
                newStateProp = { address: val };
                break;
            case "timeFrom":
                newStateProp = this.state.hours;
                newStateProp[index].open = val;
                break;

            case "timeTo":
                newStateProp = this.state.hours;
                newStateProp[index].close = val;
                break;

            case "daysFrom":
                newStateProp = this.state.hours;
                newStateProp[index].day = val;
                break;
        }

        if (newStateProp) {
            if (this.fieldTests[elName]) {
                let dataProp = { ...newStateProp };
                if (elName === "confirmPass") { dataProp["newPass"] = this.state.newPass; }
                this.validator.validate(dataProp, { [elName]: this.fieldTests[elName] });
            }
            this.setState(newStateProp);
        }
    }

    addAnnouncement = () => {
        let add = this.state.announcements.slice();
        add.push(
            {
                _id: undefined,
                // comID: this.state.kb_id + "_" + this.state.next_ann,
                inKB: this.state.kb_id,
                title: 'NEW',
                text: ''
            }
        )
        this.setState({
            next_ann: this.state.next_ann + 1,
            announcements: add
        });
    }

    autofill(event) {
        fetch('http://api.zippopotam.us/us/' + event.target.value)
            .then(response => response.json())
            .then(location => {
                if (location.places) {
                    let locationFill = {
                        city: location.places[0]['place name'],
                        state: location.places[0]['state abbreviation']
                    }
                    this.setState(locationFill);
                }
            });
    }


    addItem = () => {
        let add = this.state.items.slice();
        add.unshift(
            {
                _id: undefined,
                //itemID: this.state.next_item,
                inKB: this.state.kb_id,
                name: 'NEW item ',
                req: false,
                act: true,
                qty: 1
            }
        )
        this.setState({
            next_ann: this.state.next_item + 1,
            items: add
        });
    }

    addDay = () => {
        let add = this.state.hours.slice();
        add.push({ day: null, toDay: null, open: null, close: null });
        this.setState({ hours: add });
    }

    handleSubmit(event) {
        event.preventDefault();
        let isDeletion = this.submitAction === 'killKup' ? true : false;
        ///Delete Account
        if (isDeletion) {
            let confirm = window.confirm('Are You certain you want to cancel your Kupboard Acoount.\n This action CANNOT be undone.');
            if (!confirm) { return }
            serverOps.dashRequest('', 'DELETE')
                .then(() => this.props.logoutFoo())
                .catch(err => console.log(err));
            return;
        }

        let isInvalid;
        if (isInvalid = this.validator.isInvalid(this.state)) {
            this.forceUpdate();
            alert("Invalid Form fields!!" + isInvalid);
            return;
        }


        //let message = "Your Kupboard account has been updated.\n" + JSON.stringify(this.state);
        this.submitAction = false;

        /// Upload Pics
        /// Update KupData **done**
        /// Update Items **done**
        /// Update hours
        /// Update bulletin **done**
        /// Update password **done**

        this.props.onUpdate({
            announce: this.state.announcements,
            inventory: this.state.items,
            newPass: this.state.newPass,
            itemsToDel: this.state.itemsToDel,
            annsToDel: this.state.annsToDel,
            kupData: {
                img: this.state.img,
                alt: this.state.alt,
                mast: this.state.mast,
                mastAlt: this.state.Alt,
                name: this.state.name,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                itemTypeCt: this.state.itemTypeCt,
                hours: this.state.hours,
                details: this.state.details,
                share: this.state.share,
                userName: this.state.userName,
                userLastName: this.state.userLastName,
                userEmail: this.state.userEmail,
                //userPassword: this.state.userPassword,
                map: this.state.map,
                // id: this.state.id
            }
        });
    }

    render() {
        const errors = this.validator.errors;

        return (
            <Form className="py-3" onSubmit={event => this.handleSubmit(event)}>

                <Row>
                    <Col sm="12" md="6">
                        <h5 className="dash-header">Inventory</h5>
                        <button type="button" className="btn btn-secondary mt-2 mr-3" id="addItem" onClick={this.addItem}>Add Item</button>
                        <button type="submit" className="btn btn-primary mt-2" id="updateKtop" value="updateK" onClick={() => this.submitAction = "updateK"}>Update Kupboard</button>
                        <div className="d-flex mt-3">
                            <div className="form-control font-weight-light bg-transparent border-0">Item</div>
                            <div className="form-control font-weight-light bg-transparent border-0 w-5rem ">Qty.</div>
                            <div className="input-check-match text-center">Req.</div>
                            <div className="input-check-match text-center">Act.</div>
                            <div className="input-check-match text-center">Del.</div>
                        </div>
                        <ul id="itemInventory" className="list-unstyled">
                            {this.state.items ? this.state.items.map((item, index) => <InventoryItemDash {...item} index={index} change={this.handleChange} />) : null}
                        </ul>
                        <hr className="d-md-none mt-5 mb-1 bg-info" />
                    </Col>
                    <Col sm="12" md="6">
                        <h5 className="dash-header">Annoucements</h5>
                        <ul id="comments-area" className="list-unstyled">
                            {this.state.announcements ? this.state.announcements.map((announce, index) => <CommentItem {...announce} index={index} change={this.handleChange} />) : null}
                        </ul>
                        <Button type="button" color="secondary" id="addAnounce" onClick={this.addAnnouncement}>Add Annoucement</Button>
                        <h5 className="dash-header">Images</h5>
                        <Row>
                            <Col xs="12" sm="4" md="6" className="align-items-center d-flex">
                                <img src={this.state.img} alt={this.state.alt} className="img-thumbnail mx-auto d-block" />
                            </Col>
                            <Col xs="12" sm="8" md="6">
                                <Label className="d-block">Header Image</Label>
                                <div className="input-group mb-3 m-0">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="headerIMG"
                                            aria-describedby="headerIMG" />
                                        <label className="custom-file-label" for="headerIMG">Choose file</label>
                                    </div>
                                </div>
                                <Label className="d-block">Thumbnail Image</Label>
                                <div className="input-group mb-3 m-0">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="thumbIMG"
                                            aria-describedby="thumbIMG" />
                                        <label className="custom-file-label" for="thumbIMG">Choose file</label>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <h5 className="dash-header">Hours</h5>
                        {this.state.hours ? this.state.hours.map((hour, index) => <DaySchedule {...hour} index={index} change={this.handleChange} />) : null}
                        <Row>
                            <Col>
                                <button type="button" className="btn btn-secondary mt-2 mr-3" id="addDay" onClick={this.addDay}>Add Day</button>
                            </Col>
                        </Row>
                        <h5 className="dash-header">Location</h5>
                        <FormGroup>
                            <Label for="address">Street Address</Label>
                            <Input type="text" name="address" id="address" placeholder="11 N First" required value={this.state.address} onChange={this.handleChange} invalid={errors.address} />
                            <FormFeedback>{errors.address}</FormFeedback>
                        </FormGroup>
                        <Row>
                            <FormGroup className="col-4 col-sm-3">
                                <Label for="zip">Zip</Label>
                                <Input type="number" name="zip" id="zip" value={this.state.zip} required onChange={this.handleChange} onBlur={event => this.autofill(event)} invalid={errors.zip} />
                                <FormFeedback>{errors.zip}</FormFeedback>
                            </FormGroup>
                            <FormGroup className="col-4 col-sm-6">
                                <Label for="city">City</Label>
                                <Input type="text" name="city" id="city" placeholder="Madison" required value={this.state.city} onChange={this.handleChange} invalid={errors.city} />
                                <FormFeedback>{errors.city}</FormFeedback>
                            </FormGroup>
                            <FormGroup className="col-4 col-sm-3">
                                <Label for="state">State</Label>
                                <StateSelect name="state" id="state" required={true} value={this.state.state} change={this.handleChange} invalid={errors.state} />
                                <FormFeedback>{errors.state}</FormFeedback>
                            </FormGroup>
                        </Row>
                        <h5 className="dash-header">Details</h5>
                        <Row className="pb-2">
                            <FormGroup className="col-sm-6">
                                <Label>First Name</Label>
                                <Input type="text" name="userName" id="userName" value={this.state.userName} required={true} onChange={this.handleChange} invalid={errors.userName} />
                                <FormFeedback>{errors.userName}</FormFeedback>
                            </FormGroup>
                            <FormGroup className="col-sm-6">
                                <Label>Last Name</Label>
                                <Input type="text" name="userLastName" id="userLastName" value={this.state.userLastName} required={true} onChange={this.handleChange} invalid={errors.userLastName} />
                                <FormFeedback>{errors.userLastName}</FormFeedback>
                            </FormGroup>
                            <FormGroup className="col-12">
                                <Label>Description <small>(500 characters max)</small>:</Label>
                                <Input type="textarea" name="description" id="description" value={this.state.details} onChange={this.handleChange} />
                            </FormGroup>
                        </Row>

                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input type="text" name="userEmail" id="userEmail" value={this.state.userEmail} required={true} onChange={this.handleChange} invalid={errors.userEmail} />
                            <FormFeedback>{errors.userEmail}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="share" >Share Link</Label>
                            <Input type="text" name="share" id="share" value={this.state.share} onChange={this.handleChange} />
                        </FormGroup>

                        <h5 className="dash-header">Account</h5>
                        <Row className="pb-2">
                            <Col xs="12" lg="4">
                                <FormGroup>
                                    <Label htmlFor="oldPass" >Old Password</Label>
                                    <Input type="password" name="oldPass" id="oldPass" value={this.state.oldPass} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6" lg="4">
                                <FormGroup>
                                    <Label htmlFor="newPass" >New Password</Label>
                                    <Input type="password" name="newPass" id="newPass" value={this.state.newPass} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6" lg="4">
                                <FormGroup>
                                    <Label htmlFor="confirmPass" >Confirm Password</Label>
                                    <Input type="password" name="confirmPass" id="confirmPass" value={this.state.confirmPass} onChange={this.handleChange} invalid={errors.confirmPass} />
                                    <FormFeedback>{errors.confirmPass}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button type="submit" className="mr-3" color="primary" id="updateKbottom" value="updateK" onClick={
                            () => this.submitAction = "updateK"}>Update Kupboard</Button>
                        <Button type="submit" color="secondary" name="killKup" id="killKup" value="killKup" onClick={
                            () => this.submitAction = "killKup"} formNoValidate={true}>Delete Kupboard</Button>
                    </Col>
                </Row>
            </Form>);
    }
}





export function CommentItem({ text, title, change, index, com_ID }) {
    return (
        <li className="comment-text p-2" key={com_ID}>
            <div className="form-group mb-0">
                <Label for={"commentTitle[" + com_ID + "]"}>AnnouncementS:</Label>
                <Input name={"commentTitle[" + com_ID + "]"} id={"commentTitle" + com_ID + ""} value={title} required onChange={event => change(event, index)} />
                <Input type="textarea" name={"commentBody[" + com_ID + "]"} id={"commentBody" + com_ID + ""} className="form-control col-12 mt-1" value={text} onChange={event => change(event, index)} />
            </div>
            <i className="fa fa-close delcomm" onClick={event => change(event, index)}></i>
        </li>
    );
}


export function DaySchedule(props) {
    return (
        <Row className="kup-hour" key={props.index}>
            <Col xs="12" sm="6" md="12" lg="6" className="mb-1 pr-lg-3 pr-md-0 pr-sm-3 pt-1">
                <InputGroup>
                    <div className="input-group-prepend">
                        <Label className="input-group-text" for="daysFrom">From</Label>
                    </div>
                    <DaySelect name="daysFrom[]" id="daysFrom" value={props.day} change={props.change} index={props.index} />
                    <div className="input-group-append input-group-prepend ">
                        <Label className="input-group-text" for="daysTo"> to </Label>
                    </div>
                    <DaySelect name="daysTo[]" id="daysTo" value={props.toDay} change={props.change} index={props.index} />
                </InputGroup>
            </Col>
            <Col xs="12" sm="6" md="12" lg="6" className="mb-1">
                <InputGroup>
                    <div className="input-group-prepend">
                        <Label className="input-group-text input-group-prepend" for="timeFrom">Open</Label>
                    </div>
                    <Input type="text" name="timeFrom[]" id="timeFrom" placeholder="10:00am" value={props.open} onChange={event => props.change(event, props.index)} />
                    <div className="input-group-append input-group-prepend "> <Label className="input-group-text" for="timeTo">Close</Label> </div>
                    <Input type="text" name="timeTo[]" id="timeTo" placeholder="6:00pm" value={props.close} onChange={event => props.change(event, props.index)} />
                </InputGroup>
            </Col>
            <i className="fa fa-close delday" onClick={(event, index) => props.change(event, index)}></i>
        </Row>
    );
}


export function InventoryItemDash({ req, act, qty, name, _id, change, index }) {
    let id = _id;
    return (

        <InputGroup tag="li" className="mb-2 no-gutters" key={id}>
            <Input type="text" name={"inventoryItem[" + id + "]"} id={"inventoryItem" + id} value={name} onChange={event => change(event, index)} />
            <Input className="form-control w-5rem" type="number" min="0" name={"inventoryCt[" + id + "]"} id={"inventoryCt" + id} v value={qty} onChange={event => change(event, index)} />
            <InputGroupAddon addonType="append">
                <InputGroupText tag="label">
                    <input name={"request[" + id + "]"} id={"request" + id} type="checkbox" checked={req ? true : false} onClick={event => change(event, index)} />
                </InputGroupText>
                <InputGroupText tag="label">
                    <input name={"active[" + id + "]"} id={"active" + id} type="checkbox" checked={act ? true : false} onClick={event => change(event, index)} />
                </InputGroupText>
                <InputGroupText tag="label" className="text-secondary">
                    <i className="fa fa-close delete" onClick={event => change(event, index)}></i>
                </InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    );
}
