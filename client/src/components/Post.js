import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostData from "./PostData"
import CommentSubmission from "./CommentSubmission"
import CommentContainer from "./CommentContainer"
import NoPath from "./NoPath"

function Post({ user, posts, onPostUpvote, onPostDownvote, onPostDelete, onCommentSubmission, onCommentUpvote, onCommentDownvote, onCommentDelete }) {
  const { id } = useParams()
  const [selectedPost, setSelectedPost] = useState("")  

  useEffect(() => {
    if (id) {
      const post = posts.find(p => p.id === parseInt(id))
      setSelectedPost(post)
    }
  },[id, posts])

  return (
    <div className="main">
      {selectedPost
        ? <div>
            {[selectedPost].map(post => (
              <PostData key={post.id} post={post} onPostUpvote={onPostUpvote} onPostDownvote={onPostDownvote} onPostDelete={onPostDelete} />
            ))}
            <br></br>
            <CommentSubmission user={user} onCommentSubmission={onCommentSubmission} />
            <br></br>
            <CommentContainer user={user} post={[selectedPost]} onCommentUpvote={onCommentUpvote} onCommentDownvote={onCommentDownvote} onCommentDelete={onCommentDelete} />
          </div>
        :  <NoPath />
      }
    </div>
  )
}

export default Post