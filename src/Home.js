import React ,{useEffect}from 'react';
import "./Home.css"
import "./All.css"
import Movies from './Movies';
function Home(props) {
    useEffect(()=>{
     document.title='Movie Night';   
    })
    return (
        <div className="homePage">
            <div>
                <Movies />
            </div></div>
    )
}

export default Home;