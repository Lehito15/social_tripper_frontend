import SingleMessage from "../Messages/SingleMessage";
import PostReaction from "./PostReactions.jsx";
import './Comment.css'

function Comment({comment, author}){
  return(
    <div className="comment-conteiner">
          <div
            className={`message-wrapper ${
              comment.author ? 'message-left' : 'message-right'
            }`}
          >
            {comment.author && (
              <img
                src={comment.author.profilePictureUrl}
                alt={comment.author.name}
                className='friend-avatar'
              />
            )}
            <SingleMessage content={comment.content} author={comment.author} />
          </div>
          <div className='reactions-conteiner'>
            <PostReaction reactions={1} comments={1} />
          </div>
    </div>

  );
};
export default Comment;