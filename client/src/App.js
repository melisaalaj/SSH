
import './assets/styles/App.css';
import Navbar from "./component/Navbar";
import SearchBar from './component/SearchBar';
import Footer from './component/Footer';
import Carousel1 from './component/Carousel1';


import { ScreenClassProvider } from 'react-grid-system';


function App() {
  return ( 
    
    <ScreenClassProvider className='App'>

    <Navbar className='navbar'/>
   <div className='searchbar--'>
    <SearchBar />
   </div>
 
   <Carousel1/>

 {/* <Footer/> */}
</ScreenClassProvider>
  

  );
}

export default App;





