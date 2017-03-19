import React, { Component, PropTypes } from 'react';
import './showdisplay.css';
import { connect } from 'react-redux';
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';

class TVShow extends Component {
    render() {
        let prefix = 'http://192.168.1.82:4000/';
        let banner = (this.props.banner) ? prefix + this.props.banner : 'http://placehold.it/758x140';
        return (<Card>
              <CardHeader
                  title={this.props.name}
                avatar={banner}>
              </CardHeader>
                <CardMedia>
                    <img src={banner} />
                </CardMedia>
                <CardText>
                    {this.props.overview}
                </CardText>
            </Card>
        );
    };
}

class TVShowList extends Component {

    render() {
        let test;
        console.log('fetching: '+this.props.fetching);
        if (this.props.fetching){
            test = <LinearProgress mode="indeterminate" />;
        } else {
            test = (this.props.shows.items && this.props.shows.items.length > 0) ? this.props.shows.items.map((show) => {
                    return <TVShow key={show.id} banner={show.banner} name={show.seriesName} overview={show.overview}/>;
                }) : "";
        }
        return (<div>{test}</div>);
    };
}

TVShowList.propTypes = {
    shows: PropTypes.object.isRequired
};


export default connect()(TVShowList);