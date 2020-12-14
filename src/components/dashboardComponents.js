import React, { Component } from 'react';
import { Col, Row, FormGroup, Label, Input, Button, Form, InputGroupAddon, InputGroupText } from 'reactstrap';
import InputGroup from 'reactstrap/lib/InputGroup';
import { DaySelect, StateSelect } from './selectOptsComponent'


export class DashForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kb_id: this.props.kup_id,
            next_ann: this.props.next_ann,
            next_item: this.props.next_item,
            announcements: this.props.comments,
            items: this.props.items,
            submit: null,
            ...this.props.kupboard
        }
        this.submitAction = null;
    }

    handleChange = (event, index) => {
        let el = event.target;
        let val = el.value;
        let newStateProp = false;
        let elName = el.name ? el.name : el.className;
        elName = elName.split('[');
        elName = elName[0];
        switch (elName) {
            case "fa fa-close delcomm":
                newStateProp = this.state.announcements.splice(index, 1);
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
            case "delete":
                newStateProp = this.state.items;
                newStateProp[index].del = el.checked;
                break;
            case "request":
                newStateProp = this.state.items;
                newStateProp[index].req = el.checked;
                break;
            case "FirstName":
                newStateProp = { userName: val };
                break;
            case "LastName":
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
            case "email":
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

        if (newStateProp) { this.setState(newStateProp); }
    }

    addAnnouncement = () => {
        let add = this.state.announcements.slice();
        add.push(
            {
                comID: this.state.kb_id + "_" + this.state.next_ann,
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

    addItem = () => {
        let add = this.state.items.slice();
        add.unshift(
            {
                itemID: this.state.kb_id + "_" + this.state.next_ann,
                inKB: this.state.kb_id,
                name: 'NEW item ',
                req: false,
                active: true,
                qty: 1
            }
        )
        this.setState({
            next_ann: this.state.next_item + 1,
            items: add
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let message = "Your Kupboard account has been " + (
            this.submitAction === 'killKup' ? "deleted." :
                "updated.\n" + JSON.stringify(this.state)
        );
        this.submitAction = false;
        alert(message);
    }

    render() {
        let { kupboard } = this.props;
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
                        {this.state.hours ? kupboard.hours.map((hour, index) => <DaySchedule {...hour} index={index} change={this.handleChange} />) : null}
                        <h5 className="dash-header">Location</h5>
                        <FormGroup>
                            <Label for="address">Street Address</Label>
                            <Input type="text" name="address" id="address" placeholder="11 N First" required value={this.state.address} onChange={this.handleChange} />
                        </FormGroup>
                        <Row>
                            <FormGroup className="col-4 col-sm-3">
                                <Label for="zip">Zip</Label>
                                <Input type="number" name="zip" id="zip" value={this.state.zip} required onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup className="col-4 col-sm-6">
                                <Label for="city">City</Label>
                                <Input type="text" name="city" id="city" placeholder="Madison" required value={this.state.city} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup className="col-4 col-sm-3">
                                <Label for="state">State</Label>
                                <StateSelect name="state" id="state" required={true} value={this.state.state} change={this.handleChange} />
                            </FormGroup>
                        </Row>
                        <h5 className="dash-header">Details</h5>
                        <Row className="pb-2">
                            <FormGroup className="col-sm-6">
                                <Label>First Name</Label>
                                <Input type="text" name="FirstName" id="FirstName" value={this.state.userName} required={true} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup className="col-sm-6">
                                <Label>Last Name</Label>
                                <Input type="text" name="LastName" id="LastName" value={this.state.userLastName} required={true} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup className="col-12">
                                <Label>Description <small>(500 characters max)</small>:</Label>
                                <Input type="textarea" name="description" id="description" value={this.state.details} onChange={this.handleChange} />
                            </FormGroup>
                        </Row>

                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input type="text" name="email" id="email" value={this.state.userEmail} required={true} onChange={this.handleChange} />
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
                                    <Input type="text" name="oldPass" id="oldPass" value={this.state.oldPass} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6" lg="4">
                                <FormGroup>
                                    <Label htmlFor="newPass" >New Password</Label>
                                    <Input type="text" name="newPass" id="newPass" value={this.state.newPass} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6" lg="4">
                                <FormGroup>
                                    <Label htmlFor="confirmPass" >Confirm Password</Label>
                                    <Input type="text" name="confirmPass" id="confirmPass" value={this.state.confirmPass} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button type="submit" className="mr-3" color="primary" id="updateKbottom" value="updateK" onClick={
                            () => this.submitAction = "updateK"}>Update Kupboard</Button>
                        <Button type="submit" color="secondary" name="killKup" id="killKup" value="killKup" onClick={
                            () => this.submitAction = "killKup"}>Delete Kupboard</Button>
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
            <Col xs="12" sm="6" md="12" lg="6" className="mb-1 pr-lg-3 pr-md-0 pr-sm-3">
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
                        <Label className="input-group-text input-group-prepend" for="timeFrom">From</Label>
                    </div>
                    <Input type="text" name="timeFrom[]" id="timeFrom" placeholder="10:00am" value={props.open} onChange={event => props.change(event, props.index)} />
                    <div className="input-group-append input-group-prepend "> <Label className="input-group-text" for="timeTo"> to </Label> </div>
                    <Input type="text" name="timeTo[]" id="timeTo" placeholder="10:00am" value={props.close} onChange={event => props.change(event, props.index)} />
                </InputGroup>
            </Col>
        </Row>
    );
}


export function InventoryItemDash({ req, act, del, qty, name, id, change, index }) {
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
                <InputGroupText tag="label">
                    <input name={"delete[" + id + "]"} id={"delete" + id} type="checkbox" checked={del ? true : false} onClick={event => change(event, index)} />
                </InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    );
}
