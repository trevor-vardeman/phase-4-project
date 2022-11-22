import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Dropdown from 'react-bootstrap/Dropdown'

function New({ user, onPostSubmission, onCommunitySubmission }) {
  const [allCommunities, setAllCommunities] = useState([])
  const [communitiesToDisplay, setCommunitiesToDisplay] = useState([])
  const [newPost, setNewPost] = useState(true)
  const [postCommunity, setPostCommunity] = useState("")
  const [postTitle, setPostTitle] =  useState("")
  const [postText, setPostText] = useState("")
  const [postImageURL, setPostImageURL] = useState("")
  const [communityName, setCommunityName] = useState("")
  const [communityDescription, setCommunityDescription] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/community")
    .then((r) => {
      if (r.ok) {
        r.json().then(community => {
          setAllCommunities(community)
          setCommunitiesToDisplay((community.map(({ name }) => name)))
        })
      } else {
        r.json().then(error => alert(error))
      }
    })
  }, [])

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/new"
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {children} &#x25bc;
    </a>
  ))

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('')
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      )
    },
  )

  const submitPost = e => {
    e.preventDefault()
    if (!postCommunity) {
      alert("You must select a community for your post.")
    } else if (!postTitle) {
      alert("You must give your post a title.")
    } else if (postImageURL && postImageURL.match(/\.(jpeg|jpg|gif|png)$/) === null) {
      alert("The image's file extension must end in jpg, jpeg, png, or gif.")
    } else {
      const communityId = allCommunities.filter(community => {
        return community.name === postCommunity
      })[0].id

      const newPost = {
        title: postTitle,
        text: postText,
        image_url: postImageURL,
        community_id: communityId,
        points: 1
      }

      fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( newPost ),
      })
      .then(r => r.json())
      .then(post => {
        setPostTitle("")
        setPostText("")
        setPostImageURL("")
        onPostSubmission(post)
        navigate("/")
      })
      .catch(e => alert(e))
    }
  }

  const submitCommunity = e => {
    e.preventDefault()
    const newCommunity = {
      name: communityName,
      description: communityDescription
    }
    if (!communityName || !communityDescription) {
      alert("You must give your new community a name and description.")
    } else {
      fetch("/community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommunity),
      })
      .then(community => {
        setCommunityName("")
        setCommunityDescription("")
        navigate("/")
        onCommunitySubmission(community)
      })
      .catch(e => alert(e))
    }
  }

  return (
    <Stack gap={3} className="centered">
      {user 
        ? <Stack gap={3}>
          {newPost
            ? <Stack gap={3}>
                <h2>New Post</h2>
                <Form>
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="community-dropdown">Community</Dropdown.Toggle>
                    <Dropdown.Menu as={CustomMenu}>
                      {communitiesToDisplay.map((community) => (
                        <Dropdown.Item onClick={(e) => setPostCommunity(community)} key={community}>{community}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <p>{postCommunity}</p>

                  <Form.Group controlId="postTitleForm">
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="postTextForm">
                    <Form.Label>Text (Optional)</Form.Label>
                    <Form.Control type="text" placeholder="Text" value={postText} onChange={(e) => setPostText(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="postImageUrlForm">
                    <Form.Label>Image URL (Optional)</Form.Label>
                    <Form.Control type="url" placeholder="Image URL" value={postImageURL} onChange={(e) => setPostImageURL(e.target.value)} />
                  </Form.Group>
                </Form>
                <Button variant="dark" type="submit" onClick={submitPost}>Post</Button>
                <p>Want to create a new community instead? <Alert.Link onClick={() => setNewPost(false)}>New Community</Alert.Link></p>
              </Stack>
            : <Stack gap={3}>
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
                </Form>
                <Button variant="dark" type="submit" onClick={submitCommunity}>Create</Button>
                <p>Want to submit a post instead? <Alert.Link onClick={() => setNewPost(true)}>New Post</Alert.Link></p>
              </Stack>
          }
          </Stack>
        : <Stack className="text-center">
            <p>You must be logged in to create a new community or post.</p><br></br>
            <Alert.Link onClick={() => navigate("/auth")}>Click here to sign in</Alert.Link>
          </Stack>
      }
  </Stack>
  )
}

export default New