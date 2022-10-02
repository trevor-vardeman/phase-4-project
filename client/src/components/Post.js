import Page from "./Page"
import CommentSubmission from "./CommentSubmission"

function Post({ currentUserId }) {

  return (
    <div>
      <Page />
      <br></br>
      <CommentSubmission currentUserId={currentUserId} />
    </div>
  )
}

export default Post