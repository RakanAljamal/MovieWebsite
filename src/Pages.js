import React, { useState } from 'react';
import './Pages.css'
import './Movie.css'


let Pages = ({ page, changePages, len, MAXIMUM_NUMBER_OF_PAGES }) => {
    const numOfBoxesPages = (len * 1.0 / MAXIMUM_NUMBER_OF_PAGES)
    const numOfPages = numOfBoxesPages > MAXIMUM_NUMBER_OF_PAGES ? Math.round(numOfBoxesPages) +1: Math.round(numOfBoxesPages);
    const [couldSwap, setCouldSwap] = useState(true);
    let pagesBoxes = []
    for (let i = 1; i <= numOfPages; i++) {
        pagesBoxes.push(<span
            className='page-box'
            key={i}
            id={`page-box-${i}`}
            onClick={() => {
                if (page !== i - 1 && couldSwap) {
                    changePages( i - 1);
                    const movieGrid = document.getElementById('movieGrid')
                    movieGrid && movieGrid.classList.toggle('swap-movies')
                    setCouldSwap(false)
                    setTimeout(() => setCouldSwap(true), 1500)
                }
            }
            }
            disabled={true}
        > {i}</span >)
    }

    let allBoxes = document.querySelectorAll('.page-outside span')
    let activeBox = document.getElementById(`page-box-${page + 1}`);
    if (activeBox) {
        for (let i = 0; i < allBoxes.length; i++) {
            if (allBoxes[i].classList.contains('highlight') && !(allBoxes[i] === activeBox))
                allBoxes[i].classList.replace('highlight', 'page-box')

        }
        activeBox.classList.replace('page-box', 'highlight')

    }
    return (

        <div className="page-outside" style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }} >
            {pagesBoxes.map(box => box)}
        </div>

    )
}

export default Pages; 