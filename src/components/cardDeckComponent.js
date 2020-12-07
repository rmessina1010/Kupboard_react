import React, { Components } from 'react';
import {
    Row, Col, Card, Button, CardImg, CardTitle, CardText, CardBody
} from 'reactstrap';

const MainCardDeck = ({ cards }) => {
    let deck = Array.isArray(cards) ? cards.map(card => (<MainCardCol card={card} />)) : null;
    return (
        <Row>
            {deck}
        </Row>
    );
};

function MainCardCol({ card }) {
    return (
        <Col className="col-12 col-sm-6 col-lg-3 " >
            <MainCard {...card} />
        </Col>
    );

}

function MainCard({ id, linkURL, btnText, img, title, cardText, alt }) {
    let theButton = btnText ? <Button href={linkURL} color="primary" block>{btnText}</Button> : null
    return (
        <Card key={'cardDeck' + id} className="mb-4 border border-info border-width " >
            <CardImg top width="100%" src={img} alt={alt} />
            <CardTitle tag="h4" className="text-white bg-info p-3 m-0 text-center ">{title}</CardTitle>
            <CardBody>
                <CardText tag="p">{cardText}</CardText>
                {theButton}
            </CardBody>
        </Card>);
}

export default MainCardDeck;