import PostOwner from "../PostPage/PostOwner";
import './SuggestionsForYou.css'


function SuggestionsForYou(){

  return(
    <div className="suuggestions-container">
      <span className='component-title'>Suggestions for you</span>
      <div className="list-of-suggestions">
        <PostOwner  owner={{name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}} bottomText={'New Tripper'}/>
      </div>
     
    </div>      

  );
 
}

export default SuggestionsForYou;