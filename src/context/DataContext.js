import {createContext,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from './../api/posts'
import useWindowSize from './../hooks/useWindowSize';
import useAxioFetch from './../hooks/useAxioFetch';
const DataContext = createContext({});

export const DataProvider = ({children})=>{
    const[posts,setPosts]=useState([])
  const[search,setSearch] = useState('')
  const[searchResults,setSearchResults]=useState([])
  const[postTitle,setPostTitle] = useState('')
  const[postBody,setPostBody] = useState('')
  const[editTitle,setEditTitle] = useState('')
  const[editBody,setEditBody] = useState('')
  const navigate=useNavigate()
  const{width} = useWindowSize()
  // useEffect(()=>{
  //   const fetchPosts = async ()=>{
  //     try{
  //       const response = await api.get('/posts');
  //       setPosts(response.data)
  //     }
  //     catch(err){
  //       if(err.response){
  //         console.log(err.response.data)
  //         console.log(err.response.status)
  //         console.log(err.response.headers);
  //       }
  //       else{
  //         console.log(`Error:${err.message}`)
  //       }
  //     }
  //   }
  //   fetchPosts()
  // },[])
  const{data,fetchError,isLoading} = useAxioFetch('http://localhost:3500/posts');
  useEffect(()=>{
    setPosts(data)
  },[data])
  const handleSubmit=async ()=>{
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    console.log(typeof(id),id);
    const datetime = format(new Date(),'MMMM dd, yyyy pp')
    const newPost = {id,title:postTitle,datetime,body:postBody}
    try{
    const response = await api.post('/posts', newPost);
    const allPosts=[...posts,response.data]
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
    }
    catch(err){
      console.log(`Error:${err.message}`)
    }
  }
  const handleEdit=async (id)=>{
    const datetime = format(new Date(),'MMMM dd, yyyy pp')
    const editPost = {id,title:editTitle,datetime,body:editBody};
    try{
    const response = await api.put(`/posts/${id}`,editPost)
   setPosts(posts.map(post=>post.id===id?{...response.data}:post));
   setEditTitle('')
   setEditBody('')
   navigate('/')
    }
    catch(err){
      console.log(err.message)
    }
  }
  const handleDelete=async (id)=>{
    try{
      await api.delete(`/posts/${id}`)
    const deletePost=posts.filter(post=>post.id!==id)
    setPosts(deletePost)
    navigate('/')
    }
    catch(err){
      console.log(err.message)
    }

  }
  useEffect(()=>{
    const filteredPost = posts.filter(post=>((post.body).toLowerCase()).includes(search.toLowerCase())||((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResults(filteredPost.reverse())

  },[posts,search])
    return (<DataContext.Provider value={{width,search,setSearch,searchResults,isLoading,fetchError,postTitle, postBody, setPostTitle, setPostBody, handleSubmit,handleDelete,posts,editTitle,setEditTitle,editBody,setEditBody,handleEdit}}>
    {children}
    </DataContext.Provider>)
}
export default DataContext;