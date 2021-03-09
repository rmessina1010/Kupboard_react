import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function KBPagination(props) {
    if (props.of < 2) { return null; }
    let currentPage = parseInt(props.at);
    let pages = [];
    let high = currentPage + 5 < 10 ? 10 : currentPage + 5;
    high = high > props.of ? props.of : high;
    let low = high - 9 < 1 ? 1 : high - 9;
    ///bookend
    if (low > 1) { pages.push(<PaginationItem className="d-flex"><PaginationLink prev href={props.route + '/1'} >1</PaginationLink><span className="px-1">...</span></PaginationItem>); }
    //prev
    if (currentPage > 1) { pages.push(<PaginationItem><PaginationLink previous href={props.route + '/' + (currentPage - 1)} /></PaginationItem>); }
    for (let i = low; i <= high; i++) {
        pages.push(<PaginationItem active={currentPage === i ? true : null}><PaginationLink href={props.route + '/' + i} >{i}</PaginationLink></PaginationItem>);
    }
    //next
    if (currentPage < props.of) { pages.push(<PaginationItem><PaginationLink next href={props.route + '/' + (currentPage + 1)} /></PaginationItem>); }
    ///bookend
    if (high < props.of) { pages.push(<PaginationItem className="d-flex"><span className="px-1">...</span><PaginationLink prev href={props.route + '/' + props.of} >{props.of}</PaginationLink></PaginationItem>); }

    return (<Pagination aria-label="pagination" size="sm" className="mt-3" listClassName="justify-content-center">{pages}</Pagination>);
}

export default KBPagination;