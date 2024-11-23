import './TripDates.css';
import PostOwner from '../PostPage/PostOwner.jsx';
import './Members.css';

function Members({ title, owner, isOwner }) {
  // Lista członków
  const members = [
    { nickname: 'Kamil grosicki', profilePictureUrl: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg' },
    { nickname: 'Kamil grosicki', profilePictureUrl: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg' },
    { nickname: 'Kamil grosicki', profilePictureUrl: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg' }
  ];

  return (
    <div className='stats-box event-stat-box'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>{title}</span>
      </div>
      <div className='elevation'></div>
      <div className='stats event-members'>
        {owner ? (
          // Jeśli istnieje owner, wyświetl tylko właściciela
          <PostOwner owner={owner} />
        ) : (
          // Jeśli nie ma ownera, wyświetl wszystkich członków
          <div className='members-list'>
            {members.map((member, index) => (
              <PostOwner owner={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Members;
