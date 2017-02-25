import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';

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
        this.state = {json: [{banner: 'test'}]};
    };
    componentDidMount() {
        let test = fetch('http://localhost:4000/tv/search/Colony')
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
        test.map((show) => {
            return <TVShow key={show.id} banner={show.banner} name={show.seriesName} overview={show.overview}/>;
        });
    };
    render(){
        let test = this.state.json.map((show) => {
            return <TVShow key={show.id} banner={show.banner} name={show.seriesName} overview={show.overview}/>;
        });
        return (<div>{test}</div>)
    };
}


