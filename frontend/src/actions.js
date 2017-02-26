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
        show
    }
}

function requestShow(show) {
    return {
        type: REQUEST_SHOWS,
        show
    }
}

function receiveShow(show, json) {
    return {
        type: RECEIVE_SHOWS,
        show,
        shows: json,
        receivedAt: Date.now()
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