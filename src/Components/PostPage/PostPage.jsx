import React from 'react';
import '../PostPage/PostPage.css';
import Feeds from './Feeds.jsx';

import Post from './Post.jsx'
function PostPage(){
  const mediaLinks = [
   {type: 'image', src: 'https://ocdn.eu/sport-images-transforms/1/Wi-k9lBaHR0cHM6Ly9vY2RuLmV1L3B1bHNjbXMvTURBXy9jMmRmZWRiODA3YjAwNzc3NjljOTM0Mzk3YWMyNzM2Mi5qcGeTlQMAzG_NDdfNB8iVAs0EsADCw5MJpmNjZDQ5NgbeAAKhMAGhMQE/kamil-grosicki.jpg'},
   {type: 'image', src:'https://daf17zziboaju.cloudfront.net/wp-content/uploads/2024/06/24131401/20180327PF_MP0241.jpg'}
  ];
  const owner = {name:'Kamil', surname: 'Grosicki', src: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'};
  const post = {
    media: mediaLinks,
    description: 'Witam. Szczerze mówiąc, czuję się naprawdę wkurzony. To, co działo się w ostatnich spotkaniach, nie tylko mnie, ale i wielu innych zawodników, frustruje. Uważam, że nasza drużyna ma ogromny potencjał, ale nie potrafimy tego wykorzystać. ',
    owner: owner,
    date: '2024-10-22T15:30:00Z',
    reactions: {reactions: 21, comments: 2}

  }
  return (
    <div className="Post-page">
        <div className='Feeds'> <Feeds user={owner} /></div>
        <Post post={post} />
        
       
    </div>
  );
};

export default PostPage;
