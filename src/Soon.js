import React from 'react';
import Navbar from './Navbar'
import Pages from './Pages'
let Soon = () => {
    const images = [
        { url: 'https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg' },
        { url: 'https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTYtZTA3ZWFkODRkNmE2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg' },
        { url: 'home.png' },
    ]
    return (
        <>
            <Navbar />
            <h1 style={{ marginTop: '20rem' }}>Coming soon ...</h1>
            <Pages />
        </>
    )
}
export default Soon;