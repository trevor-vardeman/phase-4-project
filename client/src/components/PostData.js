import { useNavigate } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'

function PostData({ post, handleDelete, currentUserId }) {
  const navigate = useNavigate()

  function openPost(post) {
    navigate(`/post/${post.id}`)
  }

  function handleEdit(post) {
    navigate(`/edit/${post.id}`)
  }

  function handleUpvote(e) {
    console.log(post)
    fetch("/upvote", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: post.id,
        user_id: post.user.id
        // user_id: ,
        // votable_type: "Post",
        // votable_id: post.id,
        // voter_type: "User",
        // voter_id: currentUserId,
        // vote_flag: true,
        // vote_weight: 1

        // title: postTitle,
        // text: postText,
        // image_url: postImageURL,
        // community_id: communityId
      }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            console.log(data)
          })
        } else {
          r.json().then(data => alert(data.error))
        }
      })
      .catch(e => alert(e))
  }

  return (
    <Stack gap={3}>
      {post ? 
      <Stack gap={3}>
          <Stack className="points-and-arrows" gap={1} direction="horizontal" key={post.id}>
            <p onClick={(e) => handleUpvote(e)}>&#x25b2;</p>
            <h6>{post.points}</h6>
            <p onClick={() => console.log("downvote")}>&#x25bc;</p>
            {post.image_url ? <img onClick={() => window.open(`${post.image_url}`, "_blank")} src={post.image_url} alt={`${post.title}`}/> : null}
            <Stack>
              <h4 hover="true" onClick={() => openPost(post)}>{post.title}</h4>
              {post.text ? <p>{post.text}</p> : null}
              {post.comments.length === 1 
              ? 
              <sub onClick={() => openPost(post)}>{post.comments.length} comment</sub>
              : 
              <sub onClick={() => openPost(post)}>{post.comments.length} comments</sub>}
              <br></br>
              <sub>submitted by {post.user.username} to {post.community.name} at {post.created_at}</sub>
              <br></br>
              {post.user_can_modify ?
                <Stack direction="horizontal" gap={1}>
                  <sub onClick={() => handleEdit(post)}>Edit</sub> 
                  <sub>|</sub>
                  <sub onClick={() => handleDelete(post)}>Delete</sub> 
                </Stack> :
                null}
            </Stack>
          </Stack>
      </Stack> : null}
    </Stack>
  )
}

export default PostData