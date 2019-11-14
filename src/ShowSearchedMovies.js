import React, { Component } from 'react';
import './ShowSearchedMovies.css'
class ShowSearchedMovies extends Component {
    static defaultProps = {
        photo: 'None',
        name: 'None'
    }
    render() {

        return (
            <div className='search-movie-flex'>
                <div className='search-movie-flex-photo'>
                    <img src={this.props.photo} alt="" />
                </div>
                <div className='search-movie-flex-title'>
                    <h1>{this.props.name}</h1>
                </div>
            </div>
        );
    }
}

export default ShowSearchedMovies;