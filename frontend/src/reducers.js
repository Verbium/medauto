/**
 * Created by verbi on 25/02/2017.
 */
import { combineReducers } from 'redux';
import {
    INVALIDATE_SHOWS,
    REQUEST_SHOWS, RECEIVE_SHOWS
} from './actions';

function shows(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case INVALIDATE_SHOWS:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case REQUEST_SHOWS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_SHOWS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.shows,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

function retrieveShows(state = { }, action) {
    switch (action.type) {
        case INVALIDATE_SHOWS:
        case RECEIVE_SHOWS:
        case REQUEST_SHOWS:
            return Object.assign({}, state, {
                [action.show]: shows(state[action.show], action)
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    retrieveShows
});

export default rootReducer;