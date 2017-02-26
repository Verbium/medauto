/**
 * Created by verbi on 25/02/2017.
 */
import fetch from 'isomorphic-fetch';

export const REQUEST_SHOWS = 'REQUEST_SHOWS';
export const RECEIVE_SHOWS = 'RECEIVE_SHOWS';
export const INVALIDATE_SHOWS = 'INVALIDATE_SHOWS';

export function invalidateShow(show) {
    return {
        type: INVALIDATE_SHOWS,
        search: show,
        shows:{
            didInvalidate: true,
            isFetching : false,
            items:[]
        }
    }
}

function requestShow(show) {
    return {
        type: REQUEST_SHOWS,
        search: show,
        shows:{
            didInvalidate: false,
            isFetching : true,
            items:[]
        }
    }
}

function receiveShow(show, json) {
    return {
        type: RECEIVE_SHOWS,
        search: show,
        receivedAt: Date.now(),
        shows:{
            didInvalidate: false,
            isFetching : false,
            items:json
        }
    }
}

export function fetchShow(show) {
    return dispatch => {
        dispatch(requestShow(show));
        return fetch(`http://localhost:4000/tv/search/${show}`)
            .then(response => response.json())
            .then(json => dispatch(receiveShow(show, json)));
    }
}