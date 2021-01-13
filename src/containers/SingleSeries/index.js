import React, { Component } from 'react';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';

class SingleSeries extends Component {
    state = {
        show: null
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`)
        .then(response => response.json())
        .then(json => this.setState({ show: json }));
    }

    render() {
        // console.log(this.props);
        const { show } = this.state;

        return (
            <div>
                { show === null && <Loader/> }
                { 
                    show !== null 
                    &&
                    <div>
                        <p><strong>{show.name}</strong></p>
                        <p>Premiered - {show.premiered}</p>  
                        <p>Rating - {show.rating.average}</p>
                        <p>Episodes - {show._embedded.episodes.length}</p>
                        <p>
                            <img alt="TV-show" src={show.image.medium} />
                        </p>
                    </div>
                }

                <p>
                    <Link to={'/'}>&#8592; Home</Link>
                </p>
            </div>
        )
    }
}

export default SingleSeries;