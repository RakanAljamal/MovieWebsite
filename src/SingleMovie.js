import React, { useEffect, useState } from 'react';
import axios from 'axios'
import "./All.css"
import Navbar from './Navbar';
import "./SingleMovie.css"
function SingleMovie(props) {
    let [movie, setMovie] = useState();
    useEffect(() => {
        let getMovies = async () => {
            const result = await axios(`http://localhost:8080/api/movie/${props.id}`);
            setMovie(result.data);
        }
        getMovies();
            document.title = movie?movie.movieName : 'Loading ...'
    }, [props.id])
    let checkImage = (img) => {
        return img.substring(0, 4) === 'http' ? img : `/${img}`;
    }


    return (
        window.addEventListener('changed',()=> console.log('hmmm')),
        <div className="single-movie-bg-primary">
            <Navbar />

            <div className="component">
                {movie ?
                    <>
                        <div className="single-movie-grid py-5">
                            <div className="single-movie-photo">
                                <img src={checkImage(movie.moviePhoto)} alt="movie" className="movie" />
                            </div>
                            <div className="p1">
                                <div className="movie-details">
                                    <h1 className="center" >{movie.movieName}</h1>
                                    <br />
                                    <h3 className="bg-secondary">Story</h3>
                                    <h5 className="py-1 justify">{movie.movieDescription}</h5>
                                </div>
                                <iframe width="560" height="315"
                                    src={`https://www.youtube.com/embed/${movie.movieYoutube}`}
                                    frameborder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen="true"
                                    height="400px"
                                    width="500px"></iframe>
                            </div>
                        </div>
                    </>
                    :
                    <h1>Loading...</h1>
                }
                <iframe width="1100"
                    height="900"
                    src="//ok.ru/videoembed/1372900427136"
                    allow="autoplay"
                    allowFullScreen></iframe>
            </div>
        </div>
    );
}

export default SingleMovie;