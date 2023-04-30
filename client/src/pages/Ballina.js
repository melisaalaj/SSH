import React from "react";
import SearchBar from '../component/SearchBar';
import Footer from '../component/Footer';
import Carousel1 from '../component/Carousel1';
import '../assets/styles/App.css';

import { ScreenClassProvider } from 'react-grid-system';

 

export default function Ballina(){
   return(
    <ScreenClassProvider className='App'>

   <div className='searchbar--'>
    <SearchBar />
   </div>
 
   <Carousel1/>

 {/* <Footer/> */}
</ScreenClassProvider>
   )
}