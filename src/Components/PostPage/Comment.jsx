import SingleMessage from "../Messages/SingleMessage";
import PostReaction from "./PostReactions.jsx";
import './Comment.css'

function Comment({comment, author}){
  return(
    <div className="comment-conteiner">
          <div
            className={`message-wrapper ${
              comment.author ? 'message-left' : 'message-left'
            }`}
          >
            {comment.account && (
              <img
                src={comment.account.profilePictureUrl}
                alt={comment.account.nickname}
                className='friend-avatar'
              />
            )}
            <SingleMessage content={comment.content} author={comment.account} />
          </div>
          <div className='reactions-conteiner'>
            <PostReaction reactions={comment.reactionsNumber} comments={comment.commentsNumber} commentUuid={comment.uuid} userUuid={comment.account.uuid} />
          </div>
    </div>

  );
};
export default Comment;