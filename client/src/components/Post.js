import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

function Post() {
  const {id} = useParams()

  useEffect(() => {
    fetch(`/post/${id}`)
      .then(r => r.json())
      .then(post => console.log(post))
      .catch(err => alert(err.message))
  },[])


  return (
    <div>Post</div>
  )
}

export default Post