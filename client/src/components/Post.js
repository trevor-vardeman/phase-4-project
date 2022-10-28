import PostList from "./PostList"
import PostData from "./PostData"
import CommentSubmission from "./CommentSubmission"
import CommentList from "./CommentList"
import { useParams } from "react-router-dom"

// function Post({ currentUserId }) {
  function Post({ post, onUpvote, onDownvote, onDelete, currentUserId }) {
  const {id} = useParams()

  return (
    <div>
      {id 
      ?
        <div className="main">
          <PostList currentUserId={currentUserId} />
          {/* <PostData currentUserId={currentUserId} /> */}
          <br></br>
          <CommentSubmission currentUserId={currentUserId} />
          <br></br>
          <CommentList currentUserId={currentUserId} />
        </div>
      :
        <div className="main">
          <PostList currentUserId={currentUserId} />
        </div>}
    </div>
  )
}

export default Post