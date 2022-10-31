import { useEffect, useState } from 'react'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './Navigation'
import Auth from './Auth'
import NoPath from './NoPath'
import New from './New'
import Post from './Post'
import PostList from './PostList'
import EditPost from './EditPost'

function App() {
  const [user, setUser] = useState("")
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if (r.ok) {
        r.json().then(user => setUser(user))
      }
    })
    fetch("/post")
      .then(r => r.json())
      .then(posts => {
        const sortedPosts = posts.sort((a, b) => b.points - a.points)
        setPosts(sortedPosts)
        console.log(sortedPosts)
      })
      .catch(err => alert(err.message))
  }, [])

  function handleLogin(user) {
    setUser(user)
    navigate(-1)
  }

  function handleLogout() {
    setUser(null)
    navigate("/")
  }

  function handleUpvote(postId) {
    const postArray = [...posts]
    const clickedPost = postArray.find(posts => posts.id === postId)
    if (clickedPost.user_upvoted === false && clickedPost.user_downvoted === false) {
      clickedPost.user_upvoted = true
      clickedPost.points += 1
    } else if (clickedPost.user_upvoted === false && clickedPost.user_downvoted === true) {
      clickedPost.user_upvoted = true
      clickedPost.user_downvoted = false
      clickedPost.points += 2
    } else {
      clickedPost.user_upvoted = false
      clickedPost.points -= 1
    }
    const sortArray = postArray.sort((a, b) => b.points - a.points)
    setPosts(sortArray)

    fetch("/upvote-post", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: postId,
        points: 1
      }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then()
        } else {
          r.json().then(data => alert(data.error))
        }
      })
      .catch(e => alert(e))
  }

  function handleDownvote(postId) {
    const postArray = [...posts]
    const clickedPost = postArray.find(posts => posts.id === postId)
    if (clickedPost.user_upvoted === false && clickedPost.user_downvoted === false) {
      clickedPost.user_downvoted = true
      clickedPost.points -= 1
    } else if (clickedPost.user_downvoted === false && clickedPost.user_upvoted === true) {
      clickedPost.user_upvoted = false
      clickedPost.user_downvoted = true
      clickedPost.points -= 2
    } else {
      clickedPost.user_downvoted = false
      clickedPost.points += 1
    }
    const sortArray = postArray.sort((a, b) => b.points - a.points)
    setPosts(sortArray)
        
    fetch("/downvote-post", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: postId,
        points: -1
      }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then()
        } else {
          r.json().then(data => alert(data.error))
        }
      })
      .catch(e => alert(e))
  }

  function handleDelete(singlePost) {
    fetch(`/post/${singlePost.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then ((r) => {
      if (r.ok) {
        setPosts(posts.filter(post => singlePost.id !== post.id))
        if (id) navigate("/")
      } else {
        alert(r)
      }})
    .catch(error => alert(error))
  }

  function postSubmission(newPost, postCommunity, communityId) {
    newPost.comments = []
    newPost.user = user
    newPost.community = {
      id: communityId,
      name: postCommunity
    }
    // newPost.user_can_modify = true
    const newPosts = [...posts, newPost]
    const sortedPosts = newPosts.sort((a, b) => b.points - a.points)
    setPosts(sortedPosts)
  }

  return (
    <div>
      <Navigation currentUsername={user.username} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<PostList posts={posts} onUpvote={handleUpvote} onDownvote={handleDownvote} onDelete={handleDelete} />} />
        <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
        <Route path="/new" element={<New user={user} onPostSubmission={postSubmission} />} />
        <Route path="/posts/:id" element={<Post posts={posts} user={user} />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
        <Route path="*" element={<NoPath />} />
      </Routes>
    </div>
  )
}

export default App