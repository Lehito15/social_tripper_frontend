import PostOwner from "../PostPage/PostOwner";
import './SuggestionsForYou.css'


function SuggestionsForYou(){

  return(
    <div className="suuggestions-container">
      <span className='component-title'>Suggestions for you</span>
      <div className="list-of-suggestions">
        <PostOwner  owner={{nickname: 'Kamil Grosicki', profilePictureUrl: 'https://socialtripperstorage.blob.core.windows.net/blob/events%2Ffa639008-6973-456a-b4b5-1f43bbd70485%2Fusers%2F3c6f8532-cef0-4705-8a0c-844d70477b0d%2F434f7ce9-1d92-4a09-90f3-c874be926d85.png'}} bottomText={'New Tripper'}/>
      </div>
     
    </div>      

  );
 
}

export default SuggestionsForYou;