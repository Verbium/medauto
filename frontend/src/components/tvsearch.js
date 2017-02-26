/**
 * Created by verbi on 26/02/2017.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

class TVSearch extends Component {
    render() {
        return (<div><label>What show would you like to look for? </label>
        <input id="tvsearch" type="search" placeholder="Enter a show here"/>
            <button onClick={this.props.onClick}>Search!</button></div>
        );

    };
}

TVSearch.propTypes = {
    dispatch: PropTypes.func.isRequired,
    onClick : PropTypes.func.isRequired
};

export default connect()(TVSearch);