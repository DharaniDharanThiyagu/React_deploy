import { useStoreState } from 'easy-peasy';
import React from 'react'

const Footer = () => {
  const postCount=useStoreState((state)=>state.postCount)
  return (
    <footer className='navbar-nav bg-dark fixed-bottom text-light'>
        <center>{postCount}</center>
        </footer>
  )
}

export default Footer
