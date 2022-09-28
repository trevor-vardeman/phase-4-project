import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

function New() {
  const [allCommunities, setAllCommunities] = useState([])
  const [newPost, setNewPost] = useState(true)
  const [postCommunity, setPostCommunity] = useState("")
  const [postTitle, setPostTitle] =  useState("")
  const [postText, setPostText] = useState("")
  const [postLink, setPostLink] = useState("")
  const [communityName, setCommunityName] = useState("")
  const [communityDescription, setCommunityDescription] = useState("")

  useEffect(() => {
    fetch("/community")
    .then((r) => {
      if (r.ok) {
        r.json().then(community => console.log(community.map(({ name }) => name)))
      } else {
        r.json().then(error => alert(error))
      }
    })
  }, [])

  function submitPost(e) {
    e.preventDefault()

  }

  return (
    <div>
    {newPost
    ? 
    <div>
      <h2>New Post</h2>
      <Form>
        <Form.Group controlId="postCommunityForm">
          <Form.Label>Community</Form.Label>
          <Form.Control type="text" placeholder="Community" value={postCommunity} onChange={(e) => setPostCommunity(e.target.value)} />
          <Form.Text className="text-muted">What community do you want to post this to?</Form.Text>
        </Form.Group>

        <Form.Group controlId="postTitleForm">
          <Form.Label>Post Title</Form.Label>
          <Form.Control type="text" placeholder="Title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="postTextForm">
          <Form.Label>Text</Form.Label>
          <Form.Control type="text" placeholder="Text" value={postText} onChange={(e) => setPostText(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="postLinkForm">
          <Form.Label>Link</Form.Label>
          <Form.Control type="url" placeholder="Link" value={postLink} onChange={(e) => setPostLink(e.target.value)} />
        </Form.Group>

        <Button variant="dark" type="submit" onClick={submitPost}>Post</Button>
      </Form>
      <p>Want to create a new community instead? <Alert.Link onClick={() => setNewPost(false)}>New Community</Alert.Link></p>
    </div>
    : 
    <div>
      <h2>New Community</h2>
      <Form>
        <Form.Group controlId="communityNameForm">
          <Form.Label>Community Name</Form.Label>
          <Form.Control type="text" placeholder="Community Name" value={communityName} onChange={(e) => setCommunityName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="communityDescriptionForm">
          <Form.Label>Community Description</Form.Label>
          <Form.Control type="text" placeholder="Description" value={communityDescription} onChange={(e) => setCommunityDescription(e.target.value)} />
        </Form.Group>

        {/* <Button variant="dark" type="submit" onClick={handleSignUp}>Sign Up</Button> */}
      </Form>
      <p>Want to submit a post instead? <Alert.Link onClick={() => setNewPost(true)}>New Post</Alert.Link></p>
    </div>}
  </div>
  )
}

export default New