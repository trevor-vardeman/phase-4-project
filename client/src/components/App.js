import { useState, useEffect } from 'react'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './Navigation'
import Auth from './Auth'
import NoPath from './NoPath'
import New from './New'
import PostList from './PostList'
import EditPost from './EditPost'

function App() {
  const [user, setUser] = useState("")
  const [posts, setPosts] = useState([])
  const [communities, setCommunities] = useState([])
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
      fetch("/community")
      .then((r) => {
        if (r.ok) {
          r.json().then(communities => setCommunities(communities))
        } else {
          r.json().then(error => alert(error))
        }
      })
  }, [])

  function handleLogin(user) {
    setUser(user)
    navigate(-1)
  }

  function handleLogout() {
    setUser(null)
    const resetPostVotes = posts.map((post => post.user_upvoted = false))
    console.log(resetPostVotes)
  }

  function handlePostUpvote(postId) {
    if (!user) {
      alert("You must be logged in to vote!")
    } else {
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
      const sortedPostArray = postArray.sort((a, b) => b.points - a.points)
      setPosts(sortedPostArray)
  
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
  }

  function handlePostDownvote(postId) {
    if (!user) {
      alert("You must be logged in to vote!")
    } else {
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
      const sortedPostArray = postArray.sort((a, b) => b.points - a.points)
      setPosts(sortedPostArray)
          
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
  }

  function handlePostDelete(singlePost) {
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
    .catch(e => alert(e))
  }

  function postSubmission(newPost) {
    const newPosts = [...posts, newPost]
    const sortedPosts = newPosts.sort((a, b) => b.points - a.points)
    setPosts(sortedPosts)
  }

  return (
    <div>
      <Navigation user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<PostList posts={posts} user={user} onUpvote={handlePostUpvote} onDownvote={handlePostDownvote} onDelete={handlePostDelete} />} />
        <Route path="/posts/:id" element={<PostList posts={posts} user={user} onUpvote={handlePostUpvote} onDownvote={handlePostDownvote} onDelete={handlePostDelete} />} />
        <Route path="/posts/:id/edit" element={<EditPost posts={posts} communities={communities} />} />
        <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
        <Route path="/new" element={<New user={user} onPostSubmission={postSubmission} />} />
        <Route path="*" element={<NoPath />} />
      </Routes>
    </div>
  )
}

export default App