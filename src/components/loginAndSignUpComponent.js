import React, { Component } from 'react';
import { Row, Col, Button, Card, CardImg, Form, FormGroup, Label, Input } from 'reactstrap';
import MainWrap from './mainWrapComponent';
import { StateSelect } from './selectOptsComponent';
import { Prefoot } from './prefootComponent';

export function LoginPage(props) {
    return (
        <React.Fragment>
            <MainWrap>
                <LoginContainer>
                    <LoginForm />
                </LoginContainer>
            </MainWrap>
            <Prefoot classes="graybar-shift p-0" />
        </React.Fragment>
    );
}

export function SignUpPage(props) {
    return (
        <React.Fragment>
            <MainWrap>
                <LoginContainer>
                    <Row className=" bottom-rule no-gutters">
                        <Col tag="p" className="small text-muted col-12 col-md-8 mx-auto small-pad-x">Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Id corporis laudantium quam nobis voluptas labore
                        laboriosam placeat inventore maxime quas harum, doloremque incidunt officiis
                        sint cumque qui. Esse, dolorem beatae!
				</Col>
                    </Row>
                    <SignUpForm />
                </LoginContainer>
            </MainWrap>
            <Prefoot classes="graybar-shift p-0" />
        </React.Fragment>
    );

}


export function LoginContainer(props) {


    let header = props.children.length > 1 ?
        <div className="no-gutters">
            <CardImg className="center-logo-50" src="assets/Kupboard_logo_gray.svg" alt="Kupboard_logo" />
            <h2 className="h4 text-center font-weight-lighter">Kreate a new kupboard.</h2>
        </div>
        : <React.Fragment>
            <CardImg className="center-logo-50" src="assets/Kupboard_logo_gray.svg" alt="Kupboard_logo" />
            <h2 className="h4 text-center bottom-rule font-weight-lighter">Log In</h2>
        </React.Fragment >


    return (
        <div className="container-fluid container-xl mt-5">
            <Row>
                <Col sm="10" md="8" lg="6" className="mx-auto">
                    <Card className="form-container">
                        {header}
                        {props.children}
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (<Form className="card-body pb-0" id="logInForm">
            <FormGroup>
                <Label htmlFor="kupboadName">Kupboard Name</Label>
                <Input type="text" name="kupboadName" id="kupboadName"
                    placeholder="YourKupboard" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input type="text" name="email" id="email"
                    placeholder="me@emailService.com" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" name="password" id="password" />
            </FormGroup>
            <FormGroup className="row">
                <Col xs="12" sm="6" className="mb-2 mb-sm-0">
                    <Button block color="primary" type="submit" name="submit" id="submit"
                        value="login">Login</Button>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="recall" id="recall" />
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
        this.state = {}
    }

    render() {
        return (<Form className="card-body pb-0" id="signUpForm">
            <Row>
                <FormGroup className="col-12 col-md-6">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input type="text" id="firstName" name="firstName" placeholder="Roger" required />
                </FormGroup>
                <FormGroup className="col-12 col-md-6">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input type="text" id="lastName" name="lasttName" placeholder="Smith" required />
                </FormGroup>
            </Row>
            <FormGroup>
                <Label htmlFor="kupboadName">Kupboard Name</Label>
                <Input type="text" name="kupboadName" id="kupboadName" placeholder="YourKupboard" required />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="anemail@geemail.com" required />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="address">Street Address</Label>
                <Input type="text" name="address" id="address" placeholder="628 N First" required />
            </FormGroup>


            <Row>
                <FormGroup className="col">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input type="number" name="zip" id="zip" />
                </FormGroup>
                <FormGroup className="col-6">
                    <Label htmlFor="state">State</Label>
                    <StateSelect name="state" id="state" required={true} />
                </FormGroup>
            </Row>
            <FormGroup>
                <Label htmlFor="city">City</Label>
                <Input type="text" name="city" id="city" placeholder="Madison" required />
            </FormGroup>
            <Row>
                <FormGroup className="col-12 col-md-6">
                    <Label htmlFor="password">Choose Password</Label>
                    <Input type="password" id="password" name="password" required />
                </FormGroup>
                <FormGroup className="col-12 col-md-6">
                    <Label htmlFor="passwordConfirm">Confirm Password</Label>
                    <Input type="password" id="passwordConfirm" name="passwordConfirm" required />
                </FormGroup>
            </Row>
            <FormGroup className="row">
                <Col xs="12" sm="6" className="d-flex align-items-center mb-3 mb-sm-0">
                    <div className="form-check">
                        <Label check ><Input type="checkbox" id="agree" name="agree" required /> Agree to Terms of service</Label>
                    </div>
                </Col>
                <Col xs="12" sm="6">
                    <Button block color="primary" type="submit" name="submit" id="submit" value="Sign Up">Submit</Button>
                </Col>
            </FormGroup>
        </Form>);

    }
}
