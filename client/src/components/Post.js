import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostData from "./PostData"
import CommentSubmission from "./CommentSubmission"
import CommentContainer from "./CommentContainer"
import NoPath from "./NoPath"

  function Post({ user, posts, onUpvote, onDownvote, onDelete, onCommentSubmission }) {
    const { id } = useParams()

  const [selectedPost, setSelectedPost] = useState("")  
  useEffect(() => {
    if (id) {
      const post = posts.find(p => p.id === parseInt(id))
      setSelectedPost(post)
      console.log(post)
    }
  },[id, posts, selectedPost])

  return (
    <div className="main">
      {selectedPost
        ? <div>
            {[selectedPost].map(post => (
              <PostData key={post.id} post={post} onUpvote={onUpvote} onDownvote={onDownvote} onDelete={onDelete} />
            ))}
            <br></br>
            <CommentSubmission user={user} onCommentSubmission={onCommentSubmission} />
            <br></br>
            <CommentContainer user={user} post={[selectedPost]} />
          </div>
        :  <NoPath />}
    </div>
  )
}

export default Post