import Post from "../PostPage/Post.jsx";
import { gql, useQuery } from '@apollo/client';

function EventPosts({ uuid, openCreatePost }) {
  console.log(uuid)
  const GET_POSTS_Events = gql`
    query GET_POSTS_Events($uuid: String!) {
      eventposts @rest(type: "Post", path: "events/${uuid}/posts") {
        content
        uuid
        dateOfPost
        commentsNumber
        reactionsNumber
        postMultimediaUrls
        account{
          nickname
          profilePictureUrl
          homePageUrl
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POSTS_Events, {
    variables: { uuid },
  });
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(uuid)
  console.log(data)


  return (
    <div>
        <button className="trip-button" onClick={() => openCreatePost(uuid)} >
      <img src={`${process.env.PUBLIC_URL}/create-trip.png`} alt="Ikona" className="icon"  />
        Create trip</button>
    
      {/* {data?.eventposts.slice().reverse().map((post) => (
        <Post key={post.uuid} post={post} />
      ))} */}
    </div>
  );
}

export default EventPosts;
