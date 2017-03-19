/**
 * Created by verbi on 26/02/2017.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class TVSearch extends Component {
    render() {
        return (<div><label>What show would you like to look for? </label>
        <TextField id="tvsearch" type="search" placeholder="Enter a show here"/>
            <RaisedButton onClick={this.props.onClick}>Search!</RaisedButton></div>
        );

    };
}

TVSearch.propTypes = {
    dispatch: PropTypes.func.isRequired,
    onClick : PropTypes.func.isRequired
};

export default connect()(TVSearch);