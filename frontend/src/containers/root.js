/**
 * Created by verbi on 26/02/2017.
 */
import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import configureStore from '../configureStore'
import TVSearch from '../components/tvsearch';
import '../index.css';
import TVShow from '../components/showdisplay';

const store = configureStore();

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <TVSearch onClick={this.props.onImageClick}/>
            </Provider>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Root);