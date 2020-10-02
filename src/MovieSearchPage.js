import React from 'react';
import './MovieSearchPage.css'
import "./Movie.css"
import axios from 'axios'
let MovieSearchPage = ({ data, closePage }) => {
    let { Title, Year, Plot, Poster } = data;
    let handleSubmit = evt => {
        axios.post('http://aljamal.club/api/movie',
            {
                movieName: Title,
                movieDescription: Plot,
                movieYoutube: Title,
                moviePhoto: Poster
            })
    }

    return (
        <>
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between', padding: '3rem' }}>
                <div style={{ flex: 4 }}>
                    <img src={Poster} className="mobiePhoto" />
                </div>
                <div className="movieDetails" style={{ flex: 3 }}>
                    <h1>{Title} </h1>
                    <h1>{Year} </h1>
                    <h1 className="plot">{Plot} </h1>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit} >
                    <button type="submit" className="add-button" style={{ marginRight: 20 }}>Add</button>
                    <button className="add-button" onClick={closePage}>Cancel</button>
                </form>
            </div>
        </>
    )
}
export default MovieSearchPage;