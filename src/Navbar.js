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
            searchValue: '',
            redirect: false,
            sResult: [],
            dataFetched: false
        };
    }
    componentDidMount(){
        window.addEventListener('click',()=>{
            let valid =false;
            let myDom = document.getElementById('search-results');
            let insideDom=document.querySelectorAll(":hover");
            insideDom.forEach(dom=>{
                if(dom === document.getElementById('search-box') || dom === document.querySelector('.search-result'))
                valid = true;
            })
            myDom.className= valid && this .state.searchValue ? 'search-result-haha':'search-result'
            
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchValue !== this.state.searchValue) {
            let getMovies = async () => {
                let result = await axios.get(`http://aljamal.club/api/smovie/${this.state.searchValue}?limit=4`);
                this.setState({ sResult: result.data })
            }
            getMovies();
            let myDom = document.getElementById('search-results');

           myDom.className= this.state.searchValue && document.activeElement === document.getElementById('inside-search')  ? 'search-result-haha' : 'search-result' 
        
        }
    }

    searchClicked = () => {
        let myDom = document.getElementById('search-box');
        let focusDom = document.getElementById('inside-search')
        myDom.className = 'show'
        focusDom.focus()
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
        let showMovieResutls = <div id='search-results' className='search-result'>
            {this.state.sResult.length > 0 || this.state.searchValue === '' ?
                this.showMoveis()
                :
                showLoader
            } </div>

        

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
                                <div className="final-search">
                                <form id='search-box' className='hide' onSubmit={this.handleSubmit}>
                                    <input autoComplete="off" id='inside-search' type="text" value={this.state.searchValue} onChange={this.handleChange} />
                                
                                {showMovieResutls}    
                                </form>                            
                                </div>

                            <NavLink exact activeClassName="active-link" to="/">Home</NavLink >
                            <NavLink activeClassName="active-link" to="/soon">Top Rated</NavLink >
                            <NavLink activeClassName="active-link" to="/soon">Trending</NavLink >
                        </div>
                    </div>
                </div >

            </>
        );
    }
}

export default Navbar;