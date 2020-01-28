import React, { useRef, useState } from 'react';
import axios from 'axios'
import "./Navbar.css"
import "./video.css"
const WAIT_BEFORE_TRAILER = 3;
const Movie = ({ id, name, photo, desc, youtube, edit }) => {
    let [movieName, setMovieName] = useState(name);
    let [moviePhoto, setMoviePhoto] = useState(photo);
    let [movieDescription, setMovieDescription] = useState(desc);
    let [movieYoutube, setMovieYoutube] = useState(youtube);
    let [showTrailer, setShowTrailer] = useState(false);
    let timeout;
    let handleEdit = e => {
        e.preventDefault();
        axios.put('http://192.168.1.157:8080/api/movie',
            {
                id,
                movieName,
                moviePhoto,
                movieDescription,
                movieYoutube,
            })
        setTimeout(() => edit(0), 100)
    }

    return (
        !edit ?
            <div
                onMouseEnter={() => {
                    const selector = document.querySelector(`#movie-photo-${id}`)
                    timeout = setTimeout(() => {
                        setShowTrailer(true)
                        selector && selector.setAttribute('style', 'width:450px;')
                    }, WAIT_BEFORE_TRAILER * 1000);

                }}
                onMouseLeave={() => {
                    const selector = document.querySelector(`#movie-photo-${id}`)
                    setShowTrailer(false)
                    clearTimeout(timeout)

                }}
            >

                <div

                    className="inside-photo"
                    style={{ background: `url(${moviePhoto}) center center/cover ` }}>
                    {showTrailer ?
                        <video
                            autoPlay
                            width="1200"
                            height="1200"
                        >
                            <source src={`${movieName.split(' ').join('_').toLowerCase()}_trailer.mp4`} type="video/mp4" />
                            <source src={`${movieName.split(' ').join('_').toLowerCase()}_trailer.wpm`} type="video/wpm" />
                            <p className="vjs-no-js">
                                To view this video please enable JavaScript, and consider upgrading to a
                                web browser that
                            </p>
                        </video>
                        :
                        <>
                            <h1 className="movie-name">
                                <span className="movie-title">
                                    {movieName}
                                </span>
                            </h1>
                            <h5 className="movie-desc">{movieDescription.substring(0, 180)} </h5>
                        </>
                    }

                </div>
            </div>
            :
            <div className='movie-editing'>
                <form className='form-editing' onSubmit={handleEdit}>
                    <h1>Movie Name</h1> <br />
                    <input autoComplete='off' type="text" name='movieName' value={movieName} onChange={txt => setMovieName(txt.target.value)} />
                    <h1>  Movie Description</h1><br />
                    <input type="text" name='movieDesc' value={movieDescription} onChange={txt => setMovieDescription(txt.target.value)} />
                    <h1> Photo Link </h1><br />
                    <input type="text" name='moviePhoto' value={moviePhoto} onChange={txt => setMoviePhoto(txt.target.value)} />
                    <h1> Youtube ID </h1> <br />
                    <input type="text" name='movieYoutube' value={movieYoutube} onChange={txt => setMovieYoutube(txt.target.value)} />
                    <button className='save-button' type="submit">SAVE</button>
                </form>
            </div>
    )
}
Movie.defaultProps = {
    name: 'Movie',
    desc: 'Desc',
    photo: "https://mfiles.alphacoders.com/770/thumb-770258.jpg"
}
export default Movie;