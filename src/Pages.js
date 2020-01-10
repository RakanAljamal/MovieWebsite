import React, { useState } from 'react';
import './Pages.css'


let Pages = ({ page, changePages, len, MAXIMUM_NUMBER_OF_PAGES }) => {
    const numOfPages = (len / MAXIMUM_NUMBER_OF_PAGES)+ 1 ;
    let pagesBoxes = []
    for (let i = 1; i <= numOfPages; i++) {
        pagesBoxes.push(<span
            className='page-box'
            key={i}
            id={`page-box-${i}`}
            onClick={() => {
                changePages(i - 1);
            }
            }
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

        <div className="page-outside" style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
            {pagesBoxes.map(box => box)}
        </div>

    )
}

export default Pages; 