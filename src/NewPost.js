import React, { useContext } from 'react'
import DataContext from './context/DataContext'

const NewPost = () => {
  const{postTitle,setPostTitle,postBody,setPostBody,handleSubmit}=useContext(DataContext)
  return (
    <main className='NewPost'>
        <h1>NewPost</h1>
        <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
          <label htmlFor='postTitle'>Title:</label>
          <input type="text" id="postTitle" value={postTitle} onChange={(e)=>setPostTitle(e.target.value)} required/>
          <label htmlFor='postBody'>Post:</label>
          <textarea id="postBody" type="text" value={postBody} onChange={e=>setPostBody(e.target.value)} required/>
          <button type="submit" onClick={handleSubmit}>Submit</button>

        </form>
    </main>
  )
}

export default NewPost