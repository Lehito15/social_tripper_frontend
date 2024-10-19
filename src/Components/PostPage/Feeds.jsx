import React from 'react';
import '../PostPage/Feeds.css';

function Feeds(){
  return (
    <div className="Feeds-container">
        <span className='Feed-text'>Feeds</span>
        <div className='Feeds-buttons'>
            <button className='button-feed'>Popular</button>
            <button className='button-feed'>Observedr</button>
            <button className='button-feed'>Newest</button>
            <button className='button-feed'>Nearby</button>
       </div>
    </div>
  );
};

export default Feeds;
