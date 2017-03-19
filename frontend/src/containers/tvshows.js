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
            <TVShowList shows={this.props.shows} fetching={this.props.fetching}/>
            </div>
        )
    }
}
/**
 *
 * @param state
 * @returns {{shows: {}, fetching: boolean}}
 */
const mapStateToProps = (state) => {
    return ({
        shows: (state.retrieveShows.shows) ? state.retrieveShows.shows : {},
        fetching: state.retrieveShows.isFetching
    });
};
/**
 *
 * @param dispatch
 * @returns {{onSearchClick: (function())}}
 */
const mapDispatchToProps = (dispatch) => {
    return ({
        onSearchClick: () => {
            dispatch(fetchShow(document.getElementById('tvsearch').value));
        }
    });
};


export default connect(mapStateToProps,mapDispatchToProps)(TVApp)