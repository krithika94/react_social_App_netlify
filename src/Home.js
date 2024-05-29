import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'

const Home = () => {
  const {searchResults,isLoading,fetchError}=useContext(DataContext)
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading posts...</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{color:'red'}}>{fetchError}</p>}
      {!isLoading && !fetchError && 
      (searchResults.length?
        <Feed posts={searchResults} />:
        <h2 style={{marginTop:'2em'}}>No posts to display</h2>)}
    </main>
  )
}

export default Home