import React, { useState, useEffect } from 'react';
import "./All.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import Movie from "./Movie"
import Navbar from './Navbar'
import "./Navbar.css"
import "./anim.css"
import Pages from './Pages'
import useInputState from './useInputState'
import "./Movie.css"
import uuid from 'uuid/v4'
import DeleteDialog from './DeleteDialog'
import MovieSearchPage from './MovieSearchPage'

const MAXIMUM_NUMBER_OF_PAGES = 4


export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [addForm, showAddForm] = useState(false);
    const [deleteDialog, showDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(0)
    const [editId, setEditId] = useState(0)
    const [movieTitle, handleMovieTitle, resetMovieTitle] = useInputState('')
    const [movieSearch, handleMovieSearch, resetMoiveSearch] = useInputState('')
    const [movieDescription, handleMovieDescription, resetMovieDescription] = useInputState('')
    const [moviePhoto, handleMoviePhoto, resetMoviePhoto] = useInputState('')
    const [movieYoutube, handleMovieYoutube, resetMovieYoutube] = useInputState('')
    const [movieSearchPage, setMovieSearchPage] = useState(false);
    const [movieSearchPageProps, setMovieSearchPageProps] = useState({});
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [showFile, setShowFile] = useState(false);
    const [fileLoad, setFileLoad] = useState(false);
    const [browse, setBrowse] = useState(true);
    const [movieFileName, setMovieFileName] = useState('');
    const [loadingMovieFileName, setLoadingMovieFileName] = useState(false);
    useEffect(() => {
        let getMovies = async () => {
            axios.get(`http://192.168.1.157:8080/api/page?page=${page}&size=${MAXIMUM_NUMBER_OF_PAGES}`).then(result => {
                setTimeout(() => setMovies(result.data.content), 500)
                setMaxPage(result.data.totalElements);
            })

        }

        getMovies();
    }, [deleteDialog, addForm, editId, page, maxPage])

    // ADD MOVIE FORM

    let addMovies = () => {
        showAddForm(!addForm)
    }
    let resetAll = () => {
        resetMovieTitle()
        resetMovieDescription()
        resetMoviePhoto()
        resetMovieYoutube()
        resetMoiveSearch()
    }
    let handleMovieSearchSubmit = evt => {
        evt.preventDefault();
        axios.get(`http://www.omdbapi.com/?t=${movieSearch}&apikey=b47ef3db`)
            .then(({ data }) => {
                if (data.Response === 'False')
                    throw data
                console.log(data)
                setMovieSearchPageProps(data);
                setMovieSearchPage(true)

            })
            .catch(() => {
                console.log('Movie Not Found')
            })
    }
    let handleSubmit = evt => {
        if (allInputsTrue()) {
            axios.post('http://192.168.1.157:8080/api/movie',
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
        axios.delete(`http://192.168.1.157:8080/api/movie/${id}`)
        setTimeout(() => showDeleteDialog(false), 100)
    }
    let cancelDeleteDialog = valid => {
        showDeleteDialog(!valid)
    }
    let changePages = (i) => {

        setPage(i)

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
        movieSearchPage ?
            <div className="py-8">
                <MovieSearchPage data={movieSearchPageProps} closePage={() => setMovieSearchPage(false)} />
            </div>
            :
            <div style={{ display: 'flex', alignContent: 'space-between', alignItems: 'space-between' }}>
                <form id="showFormId" onReset={handleReset} onSubmit={handleMovieSearchSubmit} className="add-movie-form py-8" style={{ alignSelf: 'center' }}>
                    <input autoComplete="off" placeholder="Movie Name" type="text" name="movieSearch" value={movieSearch} onChange={handleMovieSearch} />
                    <br />
                    <div>
                        <button type="submit" className='add-button'>Search</button>
                    </div>
                </form>
                <h1 className='or'>OR</h1>
                <form id="showFormId" onReset={handleReset} onSubmit={handleSubmit} className="add-movie-form py-8">
                    <input autoComplete="off" placeholder="Movie Name" type="text" name="movieTitle" value={movieTitle} onChange={handleMovieTitle} />
                    <input autoComplete="off" placeholder="Movie Plot" type="text" name="movieDescription" value={movieDescription} onChange={handleMovieDescription} />
                    <input autoComplete="off" placeholder="Movie Photo Link" type="text" name="moviePhoto" value={moviePhoto} onChange={handleMoviePhoto} />
                    <input autoComplete="off" placeholder="Movie Youtube Link" type="text" name="movieYoutube" value={movieYoutube} onChange={handleMovieYoutube} />
                    {browse ? <button
                        id="browse"
                        type="button"
                        onClick={() => {
                            document.getElementById('file-upload').click();
                            setFileLoad(true)
                        }}
                    >
                        Browse
                    </button>
                        :
                        <button
                            id="browse"
                            type="button"
                            style={{ color: '#555', cursor: 'not-allowed' }}
                        >
                            Browse
                    </button>
                    }
                    {
                        movieFileName ?
                            <h1 id="file-movie-name" style={{ textAlign: 'center ' }}>{movieFileName}</h1>
                            :
                            loadingMovieFileName && <div className='loader'></div>
                    }
                    <input type="file" id="file-upload" />
                    <br />
                    <div>
                        <button type="submit" className='add-button'>Add Movie</button>
                        <button type="reset" className='add-button'>Cancel</button>
                    </div>
                </form>
            </div>
    let loadingMovies = <div className="movie-grid">
        <Movie

        />
        <Movie

        />
        <Movie

        />
        <Movie

        />

    </div>

    let addMovie =
        <div className="addMovieId" style={{ marginTop: 200 }}>
            <h1>Help us improve our website by making it the biggest movie library</h1>
            <button className="add-button" onClick={addMovies}>Add Movie</button>
        </div>

    let addMovieForm =
        <div>
            {addForm ? showForm : addMovie}
        </div>
    const inputFile = document.getElementById("file-upload");
    fileLoad && inputFile.addEventListener('change', function () {
        const file = this.files[0];
        const formData = new FormData();
        console.log(file)
        formData.append('file', file);
        console.log(`---->FormData:${formData}`)
        axios({
            url:'http://192.168.1.157:8080/api/upload',
            method:"POST",
            data:formData
        }).then(res=>{
            alert('Worked')
        })
        if (fileLoad) {
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                setFileLoad(false);
                setMovieFileName(file.name.substring(0, 15))
                setBrowse(false);
                setLoadingMovieFileName(false)

               
            })
            reader.addEventListener("loadstart", () => setLoadingMovieFileName(true))
            reader.readAsDataURL(file);


        }

    })

    return (
        <>
            <Navbar />

            <div className="center">
                {addMovieForm}
                <Pages len={maxPage} changePages={changePages} page={page} MAXIMUM_NUMBER_OF_PAGES={MAXIMUM_NUMBER_OF_PAGES} />

                <div className="component">
                    {movies.length > 0 ?
                        <div id='movieGrid' className='movie-grid'>
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
