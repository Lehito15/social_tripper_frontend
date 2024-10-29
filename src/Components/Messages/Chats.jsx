import React from 'react';
import SearchBox from '../SearchBar/SearchBox.jsx'
import '../Messages/Chats.css';
import Chat from './Chat.jsx'

function Chats({openIndividualChat}){

  const author1 = {name: "Kurt", surname: "Kotarski", profile_picture_url: "https://graw.pl/wp-content/uploads/2022/11/Zbigniew-Kotarski-GRAW.jpg", id: 5, isActive: true};
  const author2 = { name: "Anna", surname: "Nowak", profile_picture_url: "https://ocdn.eu/pulscms-transforms/1/vKOk9kpTURBXy9kNmVhNTZkMzlmYTc5NzU2NzJlMGIxMjM2MzczMjUyYi5qcGeTlQPMxy7NBiHNA3KVAs0EsADDw5MJpjcxZjlmZgbeAAGhMAE/anna-maria-wesolowska-w-2011-r.jpeg", id: 6, isActive: false };

  const messages = [
    {
      author: author1,
      messages: [
        { author: author1, content: "Lorem ipsum 123 abcasdasdsadsaddsadasdsadaskkakakakakakakkkakd kakaak kapi lej lej adam beerpong", date: new Date('October 27, 2024 11:25') },
        { author: author1, content: "Jak tam crb?", date: new Date('October 27, 2024 11:25') },
        { author: null, content: "HWDP", date: new Date('October 27, 2024 11:25') }
      ],
      last_activity_date: new Date('October 27, 2024 11:24')
    },
    {
      author: author2,
      messages: [
        { author: author2, content: "Hej, co nowego?", date: new Date('January 17, 2022 08:24') }
      ],
      last_activity_date: new Date('October 28, 2024 09:24')
    }
  ];

  return(
    <div className='chats-container'>
      <span className='chat-name'>Chats</span>
      <div className='search-box'>
        <SearchBox />
      </div>
      <div className='elevation'></div>
      <div className="chat-list">
        {messages.map((chat, index) => (
          <div onClick={() => openIndividualChat(chat)}>
          <Chat
            friend={chat.author}
            messages={chat.messages}
            last_activity_date={chat.last_activity_date}
           
          />
          </div>
        )
        
        )}
      </div>
    </div>

  );

}

export default  Chats;