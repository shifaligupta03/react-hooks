import React,{useState} from 'react';
import Joke from './Joke';
import Stories from './Stories';
// import Tasks from './Tasks';
import Gallery  from './Gallery';


function App() {

  const [userQuery, setUserQuery] = useState('');
  const [showGallery, setShowGallery] = useState(true);

  const updateUserQuery = event =>{
    console.log('userQuery', userQuery);
    setUserQuery(event.target.value);
  }

  const searchQuery =()=>{
    window.open(`https://google.com/search?q=${userQuery}`,'_blank');
  }

  const handleKeyPress= event=>{
    if(event.key === 'Enter'){
      searchQuery();
    }
  }

  const toggleShowGallery=()=>{
    setShowGallery(!showGallery);
  }

  return (
    <div className="App">
      <div className="form">
        <input value={userQuery} onChange={updateUserQuery} onKeyPress={handleKeyPress}/>
        <button onClick={searchQuery}>Search</button>
      </div>
      <hr />
      <Joke />
      <hr />
      <Stories />
      <hr />
      <div>
      {
        showGallery ? <Gallery /> : null
      }
      <button  onClick={toggleShowGallery}>
      {showGallery ? 'Hide ' : 'Show '} Gallery
      </button>
      </div>
    </div>
  );
}

export default App;
