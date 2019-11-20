import React, { Component } from 'react';
import { useHistory } from 'react-router-dom'
import { NavLink, Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import "./Navbar.css"
import "./anim.css"
import ShowSearchedMovies from './ShowSearchedMovies';
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            hideSearch: true,
            searchValue: '',
            redirect: false,
            searchResults: false,
            sResult: [],
            dataFetched: false
        };
    }
    componentDidMount() {
        window.addEventListener('click', (e) => {
            let myDom = document.getElementById('search-box');
            let onScreen = (e.screenX < 825 || e.screenX > 1200) ||
                (e.screenY < 108 || e.screenY > 150)

            if (myDom.offsetWidth > 0 && onScreen) {
                myDom.className = 'hide'
                this.setState({ hideSearch: true, searchResults: !this.state.searchResults })
            }
            this.state.searchResults ?
                document.getElementById('search-results').className = 'py-4 show-search'
                : document.getElementById('search-results').className = 'py-4 hide-search';

        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.searchValue !== this.state.searchValue) {
            let getMovies = async () => {
                let result = await axios.get(`http://localhost:8080/api/smovie/${this.state.searchValue}?limit=4`);
                this.setState({ sResult: result.data })
            }
            getMovies();
        }
    }

    searchClicked = () => {
        let myDom = document.getElementById('search-box');
        let searchResultsDom = document.getElementById('search-results');
        searchResultsDom.className = !this.state.searchResults ? 'hide-search' : 'show-search'
        myDom.className = !this.state.hideSearch ? 'hide' : 'show'
        this.setState(prevState => (
            { hideSearch: !this.state.hideSearch, searchResults: true }
        ))
        setTimeout(() => {
            this.inputRef.current.focus()
        }, 500)

    }
    handleChange = (e) => {

        this.setState({ searchValue: e.target.value })

    }
    handleSubmit = (e) => {
        this.setState({ redirect: !this.state.redirect })
        this.setState({ hideSearch: false })
        e.preventDefault()
    }
    showMoveis = () => this.state.sResult.map(movie => (
        <span className='search-result-link'>
            <Link to={`/movie/${movie.id}`}>
                <ShowSearchedMovies name={movie.movieName} photo={movie.moviePhoto} />
            </Link>
        </span>
    ))

    render() {
        let showLoader = <>
            <div className='loader'></div>
            <h1>Not found</h1>
        </>

        return (
            <>
                {this.state.redirect && <Redirect to={`/smovie/${this.state.searchValue ? this.state.searchValue : 'a'}`} />}
                < div className="navbar" >
                    <div className="component">
                        <div className="grid">
                            <Link to="/" className="no-p">
                                <img
                                    className="logo"
                                    src="https://images.all-free-download.com/images/graphiclarge/movie_logo_design_text_reel_filmstrip_icons_decoration_6829232.jpg"
                                    alt="logo" />
                            </Link>
                            <i
                                onClick={this.searchClicked}
                                className="fas fa-search fa-2x"></i>
                            <form id='search-box' className='hide' onSubmit={this.handleSubmit}>
                                <input type="text" ref={this.inputRef} value={this.state.searchValue} onChange={this.handleChange} />
                            </form>
                            <NavLink exact activeClassName="active-link" to="/">Home</NavLink >
                            <NavLink activeClassName="active-link" to="/movie/1">Top Rated</NavLink >
                            <NavLink activeClassName="active-link" to="/movie/2">Trending</NavLink >
                        </div>
                    </div>
                </div >
                <div id='search-results' className="py-4 hide-search">
                    {this.state.sResult.length > 0 || this.state.searchValue === '' ?
                        this.showMoveis()
                        :
                        showLoader
                    }
                </div>
            </>
        );
    }
}

export default Navbar;