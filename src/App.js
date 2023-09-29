
import About from './Components/About';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Nav from './Components/Nav';
import NewPost from './Components/NewPost';
import PostPage from './Components/PostPage';
import { Routes, Route } from 'react-router-dom';
import Missing from './Components/Missing';
import EditPost from './Components/EditPost';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useEffect } from 'react';
import {  useStoreActions } from 'easy-peasy';

const App = () => {  
  const setPost = useStoreActions((actions) => actions.setPost);
  const{data,fetchError,isLoading}=useAxiosFetch(" http://localhost:3001/post")
  useEffect(()=>{
    setPost(data)


  },[data,setPost])
  
  return (
    <>
      <Nav />
      <div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route
            path=""
            element={<Home fetchError={fetchError} isLoading={isLoading}/>}
          />
          <Route
            path="/newpost"
            element={
              <NewPost
               
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <EditPost/> } />
          <Route
            path="/post/:id"
            element={<PostPage />}
          />
           <Route
            path="/missing"
            element={<Missing />}
          />
        </Routes>
      </div>

      <Footer />

    </>
  );

};

export default App;
