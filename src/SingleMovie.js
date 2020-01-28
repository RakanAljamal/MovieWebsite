import React, { useEffect, useState } from 'react';
import axios from 'axios'
import "./All.css"
import Navbar from './Navbar';
import "./SingleMovie.css"
function SingleMovie(props) {
    let [movie, setMovie] = useState();
    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/${props.id}`).then(res => {
            setMovie(res.data);
            document.title=res.data.movieName;
        })
        console.log('Hmm')
    }, [])
    let checkImage = (img) => {
        return img.substring(0, 4) === 'http' ? img : `/${img}`;
    }


    return (
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
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen={true}
                                    height="400px"
                                    width="500px"></iframe>
                            </div>
                        </div>
                    </>
                    :
                    <h1>Loading...</h1>
                }
                <div className="download">
                    <h1 onClick={
                        () => axios({
                            url: `http://localhost:8080/api/download/${movie.id}`,
                            method: 'GET',
                            responseType: 'blob',
                        }).then((response) => {
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', `${movie.movieName}.mp4`);
                            document.body.appendChild(link);
                            link.click();
                            window.URL.revokeObjectURL(url);
                        })
                    }>Download</h1>
                </div>
            </div>
        </div >
    );
}

export default SingleMovie;