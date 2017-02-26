import React, { Component, PropTypes } from 'react';
import './showdisplay.css';
import { connect } from 'react-redux'

class TVShow extends Component {
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

class TVShowList extends Component {

    render() {
        let test = (this.props.shows.items && this.props.shows.items.length > 0) ? this.props.shows.items.map((show) => {
                return <TVShow key={show.id} banner={show.banner} name={show.seriesName} overview={show.overview}/>;
            }) : "";
        return (<div>{test}</div>);
    };
}

TVShowList.propTypes = {
    shows: PropTypes.object.isRequired
};


export default connect()(TVShowList);

/*
export default connect()(TVShowList);*/
