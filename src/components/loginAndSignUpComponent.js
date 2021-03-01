import React, { Component } from 'react';
import { Row, Col, Button, Card, CardImg, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import MainWrap from './mainWrapComponent';
import { StateSelect } from './selectOptsComponent';
import { Prefoot } from './prefootComponent';
//import userRoster from '../shared/userRoster';
import validator from '../shared/validation';
import * as serverOps from '../shared/serverOps';

export function LoginPage(props) {
    return (
        <React.Fragment>
            <MainWrap>
                <LoginContainer useLogin={props.loginFoo} />
            </MainWrap>
            <Prefoot classes="graybar-shift p-0" />
        </React.Fragment>
    );
}

export function SignUpPage(props) {
    return (
        <React.Fragment>
            <MainWrap>
                <LoginContainer useLogin={false} loginFoo={props.loginFoo}>
                    <Row className=" bottom-rule no-gutters">
                        <Col tag="p" className="small text-muted col-12 col-md-8 mx-auto small-pad-x">Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Id corporis laudantium quam nobis voluptas labore
                        laboriosam placeat inventore maxime quas harum, doloremque incidunt officiis
                        sint cumque qui. Esse, dolorem beatae!
				        </Col>
                    </Row>
                </LoginContainer>
            </MainWrap>
            <Prefoot classes="graybar-shift p-0" />
        </React.Fragment>
    );

}


export class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusMessage: null
        }

        this.setStatusMessage = this.setStatusMessage.bind(this);

    }

    setStatusMessage(message) {
        this.setState({ statusMessage: message });
    }


    render() {
        let header = (!this.props.useLogin) ?
            <div className="no-gutters">
                <CardImg className="center-logo-50" src="/assets/Kupboard_logo_gray.svg" alt="Kupboard_logo" />
                <h2 className="h4 text-center font-weight-lighter">Kreate a new kupboard.</h2>
            </div>
            : <React.Fragment>
                <CardImg className="center-logo-50" src="/assets/Kupboard_logo_gray.svg" alt="Kupboard_logo" />
                <h2 className="h4 text-center bottom-rule font-weight-lighter">Log In{this.state.statusMessage}</h2>
            </React.Fragment>;

        return (
            <div className="container-fluid container-xl mt-5">
                <Row>
                    <Col sm="10" md="8" lg="6" className="mx-auto">
                        <Card className="form-container">
                            {header}
                            {this.props.children}
                            {this.props.useLogin ? <LoginForm setMessage={this.setStatusMessage} loginFoo={this.props.useLogin} /> : <SignUpForm loginFoo={this.props.loginFoo} />}
                        </Card>
                    </Col>
                </Row>
            </div>
        );

    }
}

export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kupboadName: '',
            email: '',
            password: '',
            recall: false
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        serverOps.loginRequest(this.state.kupboadName, this.state.password)
            .then(loggedUser => {
                this.props.setMessage(loggedUser.success ? <small className="d-block text-success font-weight-normal">Welcome. You are now logged in.</small> : <small className="font-weight-normal d-block text-danger">Login failed!!</small>);
                if (loggedUser.success && typeof this.props.loginFoo === 'function') { this.props.loginFoo(loggedUser); }
            })
    }


    handleChange = (event) => {
        let el = event.target;
        let newStateProp = false;
        let elName = el.name;
        switch (elName) {
            case "email":
                newStateProp = { email: el.value };
                break;
            case "kupboadName":
                newStateProp = { kupboadName: el.value };
                break;
            case "password":
                newStateProp = { password: el.value };
                break;
            case "recall":
                newStateProp = { recall: el.checked };
                break;
        }
        if (newStateProp) { this.setState(newStateProp); }
    }

    render() {
        return (<Form className="card-body pb-0" id="logInForm" onSubmit={event => this.handleSubmit(event)} onChange={this.handleChange}>
            <FormGroup>
                <Label htmlFor="kupboadName">Kupboard Name</Label>
                <Input type="text" name="kupboadName" id="kupboadName"
                    placeholder="YourKupboard" value={this.state.kupboadName} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input type="text" name="email" id="email" value={this.state.email}
                    placeholder="me@emailService.com" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" name="password" id="password" value={this.state.password} />
            </FormGroup>
            <FormGroup className="row">
                <Col xs="12" sm="6" className="mb-2 mb-sm-0">
                    <Button block color="primary" type="submit" name="submit" id="submit"
                        value="login">Login</Button>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="recall" id="recall" value={this.state.recall} />
                            <small className="text-muted ">Remember me</small>
                        </Label>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6">
                    <Button className="btn btn-secondary btn-block" href="/signup">Join</Button>
                    <small className="form-text text-muted">Haven't created a Kupboard yet?</small>
                </Col>
            </FormGroup>
        </Form>);

    }
}



export class SignUpForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            kupboadName: '',
            email: '',
            address: '',
            zip: '',
            city: '',
            state: null,
            password: '',
            passwordConfirm: '',
            agree: false
        }

        this.fieldTests = {
            firstName: [{ test: "required", err: "Please fill in your name." }, { test: "isValidName", err: "Please fill  a valid name." }],
            lastName: [{ test: "required", err: "Please fill in your last name." }, { test: "isValidName", err: "Please fill  a valid last name." }],
            kupboadName: [{ test: "required", err: "Please choose a name for your Kupboard." }],
            email: [{ test: "required", err: "Email is required." }, { test: "isValidEmail", err: "Please provide a valid email." }],
            address: [{ test: "required", err: "A street address is required." }, { test: "isValidAddress", err: "Please provide a valid street address." }],
            zip: [{ test: "required", err: "A ZIP code is required." }, { test: "isValidZip", err: "Please provide a valid Zip Code." }],
            state: [{ test: "required", err: "Select your state." }],
            city: [{ test: "required", err: "Please provide a city name." }],
            password: [{ test: "required", err: "Please coose a password." }],
            passwordConfirm: [{ test: "required", err: "Please confirm your password." }, { test: "match", arg: "password", err: "Passwords do not match." }],
            agree: [{ test: "requiredTrue", err: "Please agree to TOS." }]
        }
        this.validator = new validator(this.fieldTests);

    }


    handleChange = (event) => {
        let el = event.target;
        let newStateProp = false;
        let elName = el.name;
        switch (elName) {
            case "firstName":
                newStateProp = { firstName: el.value };
                break;
            case "lastName":
                newStateProp = { lastName: el.value };
                break;
            case "kupboadName":
                newStateProp = { kupboadName: el.value };
                break;
            case "email":
                newStateProp = { email: el.value };
                break;
            case "address":
                newStateProp = { address: el.value };
                break;
            case "city":
                newStateProp = { city: el.value };
                break;
            case "state":
                newStateProp = { state: el.value };
                break;
            case "zip":
                newStateProp = { zip: el.value };
                break;
            case "password":
                newStateProp = { password: el.value };
                break;
            case "passwordConfirm":
                newStateProp = { passwordConfirm: el.value };
                break;
            case "agree":
                newStateProp = { agree: el.checked };
                break;
        }
        if (newStateProp) {
            if (this.fieldTests[elName]) {
                let dataProp = { ...newStateProp };
                if (elName === "passwordConfirm") { dataProp["password"] = this.state.password; }
                this.validator.validate(dataProp, { [elName]: this.fieldTests[elName] });
            }
            this.setState(newStateProp);
        }
    }


    handleSubmit(event) {
        event.preventDefault();
        let isInvalid;
        if (isInvalid = this.validator.isInvalid(this.state)) {
            this.forceUpdate();
            alert("Invalid Form fields!!" + isInvalid);
            return;
        }
        serverOps.uniqueNameRequest(this.state.kupboadName)
            .then(notUnique => {
                if (!notUnique) {
                    serverOps.joinRequest(this.state)
                        .then(newAcc => {
                            // alert("Creating Account for:\n" + JSON.stringify(this.state));
                            serverOps.loginRequest(this.state.kupboadName, this.state.password)
                                .then(loggedUser => {
                                    alert(JSON.stringify(this.props.loginFoo))
                                    //this.props.setMessage(loggedUser.success ? <small className="d-block text-success font-weight-normal">Welcome. You are now logged in.</small> : <small className="font-weight-normal d-block text-danger">Login failed!!</small>);
                                    if (loggedUser.success && typeof this.props.loginFoo === 'function') { this.props.loginFoo(loggedUser); }
                                })
                                .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                } else {
                    alert("'" + this.state.kupboadName + "' is alredy in use. Please choose a different name for your Kupboard.");
                }
            })
            .catch(err => console.log(err))
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


    render() {
        const errors = this.validator.errors;

        return (<Form className="card-body pb-0" id="signUpForm" onSubmit={event => this.handleSubmit(event)} onChange={this.handleChange} onBlur={this.handleChange}>
            <Row>
                <FormGroup className="col-12 col-md-6">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input type="text" id="firstName" name="firstName" placeholder="Roger" invalid={errors.firstName} />
                    <FormFeedback>{errors.firstName}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-12 col-md-6">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input type="text" id="lastName" name="lastName" placeholder="Smith" invalid={errors.lastName} />
                    <FormFeedback>{errors.lastName}</FormFeedback>
                </FormGroup>
            </Row>
            <FormGroup>
                <Label htmlFor="kupboadName">Kupboard Name</Label>
                <Input type="text" name="kupboadName" id="kupboadName" placeholder="YourKupboard" invalid={errors.kupboadName} />
                <FormFeedback>{errors.kupboadName}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="anemail@geemail.com" invalid={errors.email} />
                <FormFeedback >{errors.email}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="address">Street Address</Label>
                <Input type="text" name="address" id="address" placeholder="628 N First" invalid={errors.address} />
                <FormFeedback>{errors.address}</FormFeedback>
            </FormGroup>


            <Row>
                <FormGroup className="col">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input type="text" name="zip" id="zip" value={this.state.zip} onBlur={event => this.autofill(event)} invalid={errors.zip} />
                    <FormFeedback>{errors.zip}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-6">
                    <Label htmlFor="state">State</Label>
                    <StateSelect name="state" id="state" value={this.state.state} invalid={errors.state} />
                    <FormFeedback>{errors.state}</FormFeedback>
                </FormGroup>
            </Row>
            <FormGroup>
                <Label htmlFor="city">City</Label>
                <Input type="text" name="city" id="city" value={this.state.city} placeholder="Madison" invalid={errors.city} />
                <FormFeedback>{errors.city}</FormFeedback>
            </FormGroup>
            <Row>
                <FormGroup className="col-12 col-md-6">
                    <Label htmlFor="password">Choose Password</Label>
                    <Input type="password" id="password" name="password" invalid={errors.password} />
                    <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-12 col-md-6">
                    <Label htmlFor="passwordConfirm">Confirm Password</Label>
                    <Input type="password" id="passwordConfirm" name="passwordConfirm" invalid={errors.passwordConfirm} />
                    <FormFeedback>{errors.passwordConfirm}</FormFeedback>
                </FormGroup>
            </Row>
            <FormGroup className="row">
                <Col xs="12" sm="6" className="d-flex align-items-center mb-3 mb-sm-0">
                    <div className="form-check">
                        <Label check ><Input type="checkbox" id="agree" name="agree" invalid={errors.agree} /> Agree to Terms of service<FormFeedback>{errors.agree}</FormFeedback></Label>

                    </div>
                </Col>
                <Col xs="12" sm="6">
                    <Button block color="primary" type="submit" name="submit" id="submit" value="Sign Up">Submit</Button>
                </Col>
            </FormGroup>
        </Form>);

    }
}
