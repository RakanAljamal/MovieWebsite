import React, { useState, useEffect } from 'react';
import "./All.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import Movie from "./Movie"
import "./Navbar.css"
import "./anim.css"
import "./Movie.css"
import Navbar from './Navbar';

export default function SearchedMovies(props) {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        let getMovies = async () => {
            let result = await axios.get(`http://aljamal.club/api/smovie/${props.name}`);
            setMovies(result.data);
        }
        getMovies();
    }, [movies])

    let showMoveis = () =>
        movies.map(movie => (
            <Link
                to={`/movie/${movie.id}`}
                className="movie-photo no-p">
                <Movie
                    key={movie.id}
                    id={movie.id}
                    name={movie.movieName}
                    desc={movie.movieDescription}
                    photo={movie.moviePhoto}
                />
            </Link>
        ))

    let loadingMovies = <h1>Not found...</h1>
    return (
        <div className='bg-primary'>
            <Navbar />
            <div className="center">
                <div className="component py-8">
                    {movies.length > 0 ?
                        <div className="movie-grid ">
                            {
                                showMoveis()
                            }
                        </div>
                        :
                        loadingMovies
                    }


                </div>
            </div>
        </div>
    );
}
