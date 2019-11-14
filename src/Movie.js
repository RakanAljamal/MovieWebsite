import React, { Component } from 'react';
import axios from 'axios'
import "./Navbar.css"

class Movie extends Component {
    static defaultProps = {
        name: 'Movie',
        desc: 'Desc',
        photo: "https://mfiles.alphacoders.com/770/thumb-770258.jpg"
    }
    constructor(props) {
        super(props);
        this.state = {
            movieName: this.props.name,
            moviePhoto: this.props.photo,
            movieDesc: this.props.desc,
            movieYoutube: this.props.youtube
        }
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleEdit = e => {
        e.preventDefault();
        axios.put('http://localhost:8080/api/movie', 
        {
            id:this.props.id,
            movieName: this.state.movieName,
            moviePhoto: this.state.moviePhoto,
            movieDescription: this.state.movieDesc,
            movieYoutube: this.state.movieYoutube
        })
        setTimeout(()=>this.props.edit(0),100)

    }
    render() {
        return (
            !this.props.edited ?
                <>
                    <div className="inside-photo" style={{ background: `url(${this.props.photo}) center center/cover ` }}>
                        <h1 className="movie-name">
                            <span className="movie-title">
                                {this.props.name}
                            </span>
                        </h1>
                        <h5 className="movie-desc">{this.props.desc.substring(0,180)} </h5>
                    </div>
                </>
                :
                <div className='movie-editing'>
                    <form className='form-editing' onSubmit={this.handleEdit}>
                        <h1>Movie Name</h1> <br />
                        <input autoComplete='off' type="text" name='movieName' value={this.state.movieName} onChange={this.handleChange} />
                        <h1>  Movie Description</h1><br />
                        <input type="text" name='movieDesc' value={this.state.movieDesc} onChange={this.handleChange} />
                        <h1> Photo Link </h1><br />
                        <input type="text" name='moviePhoto' value={this.state.moviePhoto} onChange={this.handleChange} />
                        <h1> Youtube ID </h1> <br />
                        <input type="text" name='movieYoutube' value={this.state.movieYoutube} onChange={this.handleChange} />
                        <button className='save-button' type="submit">SAVE</button>
                    </form>
                </div>

        );
    }
}

export default Movie;