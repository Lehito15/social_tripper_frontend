import Post from "../PostPage/Post.jsx";
import { gql, useQuery } from '@apollo/client';

function GroupPosts({ uuid, openCreatePost }) {
  console.log(uuid)
  const GET_POSTS_Groups = gql`
    query GET_POSTS_Group($uuid: String!) {
      groupposts @rest(type: "Post", path: "groups/${uuid}/posts") {
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

  const { loading, error, data } = useQuery(GET_POSTS_Groups, {
    variables: { uuid },
  });
  console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data)


  return (
    <div>
        <button className="trip-button" onClick={() => openCreatePost(uuid)} >
      <img src={`${process.env.PUBLIC_URL}/create-trip.png`} alt="Ikona" className="icon"  />
        Create Post</button>
    
        {data !=[] && data.groupposts.slice().reverse().map((post) => (
          <Post key={post.uuid} post={post} />
        ))}
    </div>
  );
}

export default GroupPosts;
