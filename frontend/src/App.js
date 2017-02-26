import React, { Component } from 'react';
import './App.css';
import fetch from 'isomorphic-fetch';

/*export class TvMetaData {
  "use strict";
  render() {
    return this.props.test = "test";
  }
}*/

export class TVShow extends Component {
    render() {
        let prefix = 'https://www.thetvdb.com/banners/';
        return (<div className="TVShow">
              <div className="TVShow-header">
                <img className="TVShow-image" src={prefix + this.props.banner} alt="logo"/>
                <p>{this.props.name}</p>
                <p>{this.props.overview}</p>
              </div>
            </div>
        );
    };
}

export class TVShowList extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const { dispatch, show} = this.props;
        dispatch(fetchPostsIfNeeded(show));
    }

    componentDidUpdate(prevProps) {
        if (this.props.show !== prevProps.show) {
            const { dispatch, show } = this.props;
            dispatch(fetchPostsIfNeeded(show));
        }
    }

    handleChange(nextShow) {
        this.props.dispatch(selectSubreddit(nextShow));
        this.props.dispatch(fetchPostsIfNeeded(nextShow));
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const { dispatch, selectedShow } = this.props;
        dispatch(invalidateSubreddit(selectedShow));
        dispatch(fetchPostsIfNeeded(selectedShow));
    }

    render(){
        const { selectedSubreddit, show, isFetching, lastUpdated } = this.props;
        let test = this.state.json.map((show) => {
            return <TVShow key={show.id} banner={show.banner} name={show.seriesName} overview={show.overview}/>;
        });
        return (<div>{test}</div>)
    };
}


