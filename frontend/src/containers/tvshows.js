/**
 * Created by verbi on 26/02/2017.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import TVSearch from '../components/tvsearch';
import TVShowList from '../components/tvshowlist';
import {fetchShow} from '../actions';

class TVApp extends Component {
    render() {
        return (
            <div>
            <TVSearch onClick={this.props.onSearchClick}/>
            <TVShowList shows={this.props.shows}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        shows: (state.retrieveShows.shows) ? state.retrieveShows.shows : {}
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        onSearchClick: () => {
            console.log('Handle clicked');
            dispatch(fetchShow(document.getElementById('tvsearch').value));
        }
    });
};


export default connect(mapStateToProps,mapDispatchToProps)(TVApp)