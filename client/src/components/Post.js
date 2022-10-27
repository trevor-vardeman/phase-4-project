import PostList from "./PostList"
import CommentSubmission from "./CommentSubmission"
import CommentList from "./CommentList"
import PostData from "./PostData"
import { useParams, useNavigate } from "react-router-dom"

function Post({ currentUserId }) {
  const {id} = useParams()

  // function paramTester() {
  //   if (id === undefined || null) {
  //     console.log("undefined")
  //   } else {
  //     console.log(id)
  //   }
  // }
  // paramTester()

  return (
    <div className="main">
      <PostList currentUserId={currentUserId} />
      {/* <PostData /> */}
      <br></br>
      <CommentSubmission currentUserId={currentUserId} />
      <br></br>
      <CommentList currentUserId={currentUserId} />
    </div>
  )
}

export default Post