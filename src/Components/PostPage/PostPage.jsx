import React from 'react';
import '../PostPage/PostPage.css';
import Feeds from './Feeds.jsx';
import Relation from '../Relation/Relation.jsx';
import Event from '../Event/Event.jsx'

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
    reactions: {reactions: 21, comments: 2},
    locations:  [
      {id: 0, position: [53.366, 14.52]},
      {id: 1, position: [53.386, 14.55]}
    ]

  }

  const event = {
    target: 'Szczecin',
    image: 'https://ocdn.eu/pulscms-transforms/1/sxOk9kpTURBXy9hMDhhZTIyYjIwNDRjOTdmZDNlNDQxMzdjNmE3ZGVjNC5qcGeTlQMAzH_NEEbNCSeVAs0EsADDw5MJpjI0MTBiYQbeAAGhMAE/szczecin.jpeg', // Ścieżka do obrazu
    start_date: new Date('2024-10-24'),
    end_date: new Date('2024-11-24'),
    name: 'Wspólne zwiedzanie Szczecina z  Kamilem Grosickim',
    description: 'Zapraszamy wszystkich  chętnych ',
    owner: owner
  };
  return (
    <div className="Post-page">
        <div className='Feeds'> <Feeds user={owner} /></div>
        <Post post={post} />
        <Relation post={post} />
        <Event event={event} />
        
       
    </div>
  );
};

export default PostPage;
