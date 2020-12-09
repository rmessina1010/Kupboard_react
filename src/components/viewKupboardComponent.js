import React from 'react';
import { Row, Col, Card, CardTitle, CardText, CardBody, CardHeader } from 'reactstrap';
import { ListSchedule } from './findKupboardComponent'

function KupboardView(props) {
	let inventory = [];
	let requests = [];
	if (Array.isArray(props.inventory)) {
		inventory = props.inventory.filter(item => item.active);
		requests = props.inventory.filter(item => item.active && item.req);
	}
	return (
		<React.Fragment>
			<Row tag="dl" className="media align-items-top mt-3" id="kupboard-top">
				<Col tag="dt" xs="12" md="4">
					<img className="img-fluid  d-block img-thumbnail mb-3  mx-auto " src={props.img} alt={props.alt} />
				</Col>
				<Col tag="dt" xs="12" sm="6" md="4" className="text-center text-md-left">
					<h5 className="h4 font-weight-light ">{props.name}</h5>
					<div>{props.address}</div>
					<div>{props.city}, {props.state} {props.zip}</div>
					<hr className="d-block d-sm-none" />
				</Col>
				<Col tag="dd" xs="12" sm="6" md="4" className="text-center text-md-left mt-2 mt-sm-0">
					<ListSchedule hours={props.hours} />
					<hr className="d-block d-sm-none" />
				</Col>
			</Row>
			<Row>
				<Col xs="12" sm="6" lg="4" className="ledger">
					<a href="#kupboard-top">
						<h3 className="ledger-head">Available Inventory</h3>
					</a>
					<InventoryList items={inventory} />
				</Col>
				<Col xs="12" sm="6" lg="4" className="ledger">
					<a href="#kupboard-top">
						<h3 className="ledger-head">Item Requests</h3>
					</a>
					<InventoryList items={requests} req={true} />
				</Col>
				<Col xs="12" lg="4" className="ledger">
					<a href="#kupboard-top">
						<h3 className="ledger-head">Announcements</h3>
					</a>
					<CommentList items={props.announce} />
				</Col>
			</Row>
		</React.Fragment >
	);
}



export function InventoryList(props) {
	let itemData = Array.isArray(props.items) ? props.items : [];
	let items = itemData.map(item => { return props.req ? (<InventoryReq {...item} />) : (<InventoryItem {...item} />) });
	return (
		<ul className="inventory-items list-unstyled">
			{props.children}
			{items}
		</ul>
	);
}

export function InventoryItem(props) {
	return (
		<li className="kb-item-group d-flex justify-content-between ">
			<span className="kb-item">{props.name}</span>
			<span className="kb-item-count badge-pill badge-primary">{props.qty ? props.qty : 0}</span>
		</li>);
}

export function InventoryReq(props) {
	return (<li className="kb-item-group"> <span className="kb-item">{props.name}</span> </li>);
}


export function CommentList(props) {
	let commentsData = Array.isArray(props.items) ? props.items : [];
	let comments = commentsData.map(comment => (<CommentItem {...comment} />));
	return (
		<Row tag="ul" className="announcements list-unstyled">
			{props.children}
			{comments}
		</Row>
	);
}

export function CommentItem(props) {
	return (
		<Col tag="li" xs="12" sm="6" lg="12" className="kb-announce pb-2">
			<Card>
				<CardHeader>
					<CardTitle tag="h6">{props.title}</CardTitle>
				</CardHeader>
				<CardBody>
					<CardText className="card-text">{props.text}</CardText>
				</CardBody>
			</Card>
		</Col>
	);
}

export default KupboardView;
