import React, { Component } from 'react';
import Intro from '../../components/Intro';
import Loader from '../../components/Loader';
import SeriesList from '../../components/SeriesList';

class Series extends Component {
    state = {
        series: [],
        seriesName: '',
        isFetching: false
    }

    onSeriesInputChange = e => {
        this.setState({ seriesName: e.target.value, isFetching: true });

        fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
        .then(response => response.json())
        .then(json => this.setState({ series: json, isFetching: false }));
    }

    render() {
        const { series, seriesName, isFetching } = this.state;

        return (
            <div>
                <Intro message="Your favorite TV shows. All in one place." />
                <div>
                    <input
                        value={seriesName} 
                        type="text"
                        placeholder="e.g. Vikings" 
                        onChange={this.onSeriesInputChange} 
                    />
                </div>
                {
                    !isFetching && series.length === 0 && seriesName.trim() === ''
                    &&
                    <p>Browse TV shows</p>
                }
                {
                    !isFetching && series.length === 0 && seriesName.trim() !== ''
                    &&
                    <p>Series unavailable</p>
                }
                {
                    isFetching ?
                    <Loader /> :
                    <SeriesList list={this.state.series} />                    
                }
            </div>
        );
    }
}

export default Series;