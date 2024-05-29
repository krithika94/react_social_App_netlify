import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/DataContext';

const EditPost = () => {
    const{posts,editTitle,setEditTitle,editBody,setEditBody,handleEdit}=useContext(DataContext)

    const{id} =useParams();
    const editPost = posts.find(post=>(post.id).toString()===id)
    useEffect(()=>{
        if(editPost){
            console.log(editPost,"post")
            setEditTitle(editPost.title)
            setEditBody(editPost.body)
        }
    },[editPost,setEditTitle,setEditBody])
    return (
        <>
        {editTitle &&
    <main className='NewPost'>
        <h1>Edit Post</h1>
        <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
          <label htmlFor='editTitle'>Title:</label>
          <input type="text" id="editTitle" value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} required/>
          <label htmlFor='editBody'>Post:</label>
          <textarea id="editBody" type="text" value={editBody} onChange={e=>setEditBody(e.target.value)} required/>
          <button type="submit" onClick={()=>handleEdit(editPost.id)}>Submit</button>

        </form>
    </main>}
    {!editTitle &&
        <>
        <h2>Post Not Found</h2>
        <p>Well, that's disappointing.</p>
        <p><Link to='/'>Visit Our Homepage</Link></p>
        </>
    }
    </>
   
  )
}

export default EditPost