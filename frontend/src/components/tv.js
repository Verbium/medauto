import React, { Component } from 'react';
import './tv.css';
import {fetchShow} from '../actions';
import fetch from 'isomorphic-fetch';

export class TVShow extends Component {
    render() {
        let prefix = 'https://www.thetvdb.com/banners/';
        return (<div className="TVShow">
              <div className="TVShow-header">
                <img className="TVShow-image" src={prefix + this.props.show.banner} alt="logo"/>
                <p>{this.props.show.name}</p>
                <p>{this.props.show.overview}</p>
              </div>
            </div>
        );
    };
}

export class TVShowList extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { dispatch, show} = this.props;
        dispatch(fetchShow(show));
    }

    componentDidUpdate(prevProps) {
        if (this.props.show !== prevProps.show) {
            const {dispatch, show} = this.props;
            dispatch(fetchShow(show));
        }
    }

    render(){
        const { selectedShow, show, isFetching, lastUpdated } = this.props;
        let test = show.map((show) => {
            return <TVShow key={show.id} banner={show.banner} name={show.seriesName} overview={show.overview}/>;
        });
        return (<div>{test}</div>)
    };
}


