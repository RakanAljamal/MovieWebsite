import React, { useState, useEffect } from 'react';
import "./All.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import Movie from "./Movie"
import Navbar from './Navbar'
import "./Navbar.css"
import "./anim.css"
import useInputState from './useInputState'
import "./Movie.css"
import uuid from 'uuid/v4'
import DeleteDialog from './DeleteDialog'

export default function Movies(props) {
    const [movies, setMovies] = useState([]);
    const [addForm, showAddForm] = useState(false);
    const [deleteDialog, showDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(0)
    const [editId, setEditId] = useState(0)
    const [movieTitle, handleMovieTitle, resetMovieTitle] = useInputState('')
    const [movieDescription, handleMovieDescription, resetMovieDescription] = useInputState('')
    const [moviePhoto, handleMoviePhoto, resetMoviePhoto] = useInputState('')
    const [movieYoutube, handleMovieYoutube, resetMovieYoutube] = useInputState('')


    useEffect(() => {
        let getMovies = async () => {
            let result = await axios.get("http://localhost:8080/api/movie");
            setMovies(result.data);
        }

        getMovies();
    }, [deleteDialog, addForm,editId])

    // ADD MOVIE FORM

    let addMovies = () => {
        showAddForm(!addForm)
    }
    let resetAll = () => {
        resetMovieTitle()
        resetMovieDescription()
        resetMoviePhoto()
        resetMovieYoutube()
    }
    let handleSubmit = evt => {
        if (allInputsTrue()) {
            axios.post('http://localhost:8080/api/movie',
                {
                    movieName: movieTitle,
                    movieDescription: movieDescription,
                    movieYoutube: movieYoutube,
                    moviePhoto: moviePhoto
                })
        }
        resetAll()
        setTimeout(() => {
            showAddForm(!addForm)
        }, 100)
        evt.preventDefault();
    }
    let handleReset = evt => {
        resetAll()
        showAddForm(!addForm)
        evt.preventDefault();
    }
    let allInputsTrue = () => {
        return movieDescription && moviePhoto && movieTitle && movieYoutube;
    }

    // MOVIE OPTIONS FOR ADMINS ONLY!!!
    let editMovie = (id) => {
        setEditId(0)
    }
    let deleteMovie = (id) => {
        axios.delete(`http://localhost:8080/api/movie/${id}`)
        setTimeout(() => showDeleteDialog(false), 100)
    }
    let cancelDeleteDialog = valid => {
        showDeleteDialog(!valid)
    }

    let showMoveis = () =>
        movies.map(movie => (
            <div className='whole-movie' key={uuid()}>
                {movie.id === editId ?
                    <div className='movie-photo-no-hover'>
                        <Movie
                            id={movie.id}
                            name={movie.movieName}
                            desc={movie.movieDescription}
                            photo={movie.moviePhoto}
                            youtube={movie.movieYoutube}
                            edited={movie.id === editId}
                            edit={editMovie}
                        />
                    </div>
                    :
                    <>
                        <Link
                            to={`/movie/${movie.id}`}
                            className="no-p no-m"
                        >
                            <div className='movie-photo'>
                                <Movie
                                    key={uuid()}
                                    id={movie.id}
                                    name={movie.movieName}
                                    desc={movie.movieDescription}
                                    photo={movie.moviePhoto}
                                    edited={movie.id === editId}
                                />
                            </div>
                        </Link>
                        <div className='movie-options'>
                            <i onClick={() => setEditId(movie.id)} className="fas fa-pen fa-2x edit"></i>
                            <i onClick={() => {
                                setDeleteId(movie.id)
                                showDeleteDialog(true)
                            }} className="far fa-trash-alt fa-2x trash"></i>
                        </div>
                    </>
                }

            </div>
        ))

    let showForm =
        <form id="showFormId" onReset={handleReset} onSubmit={handleSubmit} className="add-movie-form py-8">
            <input autoComplete="off" placeholder="Movie Name" type="text" name="movieTitle" value={movieTitle} onChange={handleMovieTitle} />
            <input autoComplete="off" placeholder="Movie Plot" type="text" name="movieDescription" value={movieDescription} onChange={handleMovieDescription} />
            <input autoComplete="off" placeholder="Movie Photo Link" type="text" name="moviePhoto" value={moviePhoto} onChange={handleMoviePhoto} />
            <input autoComplete="off" placeholder="Movie Youtube Link" type="text" name="movieYoutube" value={movieYoutube} onChange={handleMovieYoutube} />
            <br />
            <div>
                <button type="submit" className='add-button'>Add Movie</button>
                <button type="reset" className='add-button'>Cancel</button>
            </div>
        </form>

    let loadingMovies = <h1>loading...</h1>

    let addMovie =
        <div className="addMovieId py-5">
            <h1>Help us improve our website by making it the biggest movie library</h1>
            <button className="add-button" onClick={addMovies}>Add Movie</button>
        </div>

    let addMovieForm =
        <div>
            {addForm ? showForm : addMovie}
        </div>

    return (
        <>
            <Navbar />
            <div className="center">
                {addMovieForm}
                <div className="component">
                    {movies.length > 1 ?
                        <div className='movie-grid'>
                            {
                                showMoveis()
                            }
                        </div>
                        :
                        loadingMovies
                    }
                </div>
                {
                    <DeleteDialog
                        movieId={deleteId}
                        delete={deleteMovie}
                        deleteDialog={deleteDialog}
                        cancel={cancelDeleteDialog} />
                }

            </div>
        </>
    );
}
