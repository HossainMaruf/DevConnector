// import core modules
import React from 'react';
// import custom modules 
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
// import css module
import classes from './home.css';


const Home = () => {
    return (
        <>
         <Topbar />
         <div className={classes.homeContainer}>
             <Sidebar />
             <Feed />
             <Rightbar />
         </div>
        </>
    );
}

export default Home;
