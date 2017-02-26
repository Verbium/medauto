/**
 * Created by verbi on 26/02/2017.
 */
import React, { Component } from 'react';
import {fetchShow} from '../actions';
import { connect } from 'react-redux'

const searchBox = ({onClick}) => {
    return (<div><label>What show would you like to look for? </label>
            <input id="tvsearch" type="search" placeholder="Enter a show here"/>
            <button onClick={onClick}>Search!</button></div>
    );
};

export class TVSearch extends Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
        this.props.dispatch(fetchShow(document.getElementById('tvsearch').value));
    }
    render() {
        return (<div><label>What show would you like to look for? </label>
        <input id="tvsearch" type="search" placeholder="Enter a show here"/>
            <button onClick={this.handleClick}>Search!</button></div>
        );
    };
}

