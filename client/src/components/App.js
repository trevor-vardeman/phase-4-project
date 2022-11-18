import { useState, useEffect } from 'react'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './Navigation'
import Auth from './Auth'
import NoPath from './NoPath'
import New from './New'
import AllPosts from './AllPosts'
import EditPost from './EditPost'
import Post from './Post'
import User from './User'

function App() {
  const [user, setUser] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [communities, setCommunities] = useState([])
  const navigate = useNavigate()
  const {id} = useParams()

  const handleLogin = user => {
    setUser(user)
    navigate(-1)
  }

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }})
      .then(r => r.json())
      .then(posts => {
        const sortedPosts = posts.sort((a, b) => b.points - a.points)
        sortedPosts.map(post => post.comments.sort((a, b) => b.points - a.points))
        setPosts(sortedPosts)
        setUser(null)
      })
      .catch(err => alert(err.message))
  }

  useEffect(() => {
    fetch("/posts")
      .then(r => r.json())
      .then(posts => {
        const sortedPosts = posts.sort((a, b) => b.points - a.points)
        sortedPosts.map(post => post.comments.sort((a, b) => b.points - a.points))
        setPosts(sortedPosts)
      })
      .catch(err => alert(err.message))
    fetch("/users")
      .then((r) => {
        if (r.ok) {
          r.json().then(users => setAllUsers(users))
        } else {
          r.json().then(error => alert(error))
        }
      })
  },[user])

  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if (r.ok) {
        r.json().then(user => setUser(user))
      } else return
    })
    fetch("/community")
    .then((r) => {
      if (r.ok) {
        r.json().then(communities => setCommunities(communities))
      } else {
        r.json().then(error => alert(error))
      }
    })
  }, [])

  const handlePostUpvote = postId => {
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
      setPosts(postArray)
  
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

  const handlePostDownvote = postId => {
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
      setPosts(postArray)
          
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

  const handlePostDelete = singlePost => {
    fetch(`/posts/${singlePost.id}`, {
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

  const handlePostSubmission = newPost => {
    const newPosts = [...posts, newPost]
    const sortedPosts = newPosts.sort((a, b) => b.points - a.points)
    setPosts(sortedPosts)
  }

  const handlePostEdit = updatedPost => {
    const newPosts = posts.filter(post => post.id !== updatedPost.id)
    newPosts.push(updatedPost)
    const sortedPosts = newPosts.sort((a, b) => b.points - a.points)
    setPosts(sortedPosts)
  }

  const handleNewCommunity = newCommunity => {
    communities.push(newCommunity)
    setCommunities(communities)
  }

  const handleCommentSubmission = (comment, postId) => {
    const newComment = {
      text: comment,
      points: 1,
      post_id: postId,
    }
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
    .then(r => r.json())
    .then(posts => {
      const sortedPosts = posts.sort((a, b) => b.points - a.points)
      sortedPosts.map(post => post.comments.sort((a, b) => b.points - a.points))
      setPosts(sortedPosts)
    })
    .catch(e => alert(e))
  }

  const handleCommentUpvote = comment => {
    if (!user) {
      alert("You must be logged in to vote!")
    } else {
      const postArray = [...posts]
      if (comment.user_upvoted === false && comment.user_downvoted === false) {
        comment.user_upvoted = true
        comment.points += 1
      } else if (comment.user_upvoted === false && comment.user_downvoted === true) {
        comment.user_upvoted = true
        comment.user_downvoted = false
        comment.points += 2
      } else {
        comment.user_upvoted = false
        comment.points -= 1
      }
      setPosts(postArray)
      
      fetch("/upvote-comment", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment_id: comment.id,
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

  const handleCommentDownvote = comment => {
    if (!user) {
      alert("You must be logged in to vote!")
    } else {
      const postArray = [...posts]
      if (comment.user_upvoted === false && comment.user_downvoted === false) {
        comment.user_downvoted = true
        comment.points -= 1
      } else if (comment.user_downvoted === false && comment.user_upvoted === true) {
        comment.user_upvoted = false
        comment.user_downvoted = true
        comment.points -= 2
      } else {
        comment.user_downvoted = false
        comment.points += 1
      }
      setPosts(postArray)

      fetch("/downvote-comment", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment_id: comment.id,
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

  const handleCommentDelete = singleComment => {
fetch(`/comments/${singleComment.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(r => r.json())
    .then(posts => {
      const sortedPosts = posts.sort((a, b) => b.points - a.points)
      sortedPosts.map(post => post.comments.sort((a, b) => b.points - a.points))
      setPosts(sortedPosts)
    })
    .catch(error => alert(error))
  }

  return (
    <div>
      <Navigation user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<AllPosts 
          user={user} 
          posts={posts} 
          onPostUpvote={handlePostUpvote} 
          onPostDownvote={handlePostDownvote} 
          onPostDelete={handlePostDelete} />} 
        />
        <Route path="/post/:id" element={<Post 
          user={user} 
          allUsers={allUsers}
          posts={posts} 
          onPostUpvote={handlePostUpvote} 
          onPostDownvote={handlePostDownvote} 
          onPostDelete={handlePostDelete} 
          onCommentSubmission={handleCommentSubmission} 
          onCommentUpvote={handleCommentUpvote}
          onCommentDownvote={handleCommentDownvote} 
          onCommentDelete={handleCommentDelete}/>} 
        />
        <Route path="/post/:id/edit" element={<EditPost 
          posts={posts} 
          communities={communities} 
          onPostEdit={handlePostEdit}/>} 
        />
        <Route path="/auth" element={<Auth 
          onLogin={handleLogin}/>} 
        />
        <Route path="/new" element={<New 
          user={user} 
          onPostSubmission={handlePostSubmission} 
          onCommunitySubmission={handleNewCommunity}/>} 
        />
        <Route path="/user/:id" element={<User 
          users={allUsers} 
          posts={posts}
          onPostUpvote={handlePostUpvote} 
          onPostDownvote={handlePostDownvote} />} 
        />
        <Route path="*" element={<NoPath />} />
      </Routes>
    </div>
  )
}

export default App