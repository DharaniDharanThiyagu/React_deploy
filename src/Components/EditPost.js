import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import format from 'date-fns/format';
import { useStoreActions, useStoreState } from 'easy-peasy';

const EditPost = () => {
  const history = useNavigate();
  const { id } = useParams();

  // Use useStoreActions for thunks, and useStoreState for state properties
  const editBody = useStoreState((state) => state.editBody);
  const editTitle = useStoreState((state) => state.editTitle);

  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);
  const editPost = useStoreActions((actions) => actions.editPost);




  // Fetch post data by dispatching the getPostById action
  const getPostById = useStoreState((state) => state.getPostById);
  const post= getPostById(id);

  useEffect(() => {
    if(post)
    {
      setEditTitle(post.title)
// Inside your component where you need to update editBody
setEditBody(post.body); // Replace 'new body value' with the actual value you want to set


    }
  }, [post,setEditTitle,setEditBody]);

  const handleEdit = () => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatePost = { id, title: editTitle, datetime, body: editBody };
  
    // Dispatch the editPost thunk to update the post
    editPost(updatePost);
  
    // Redirect to another route
    history('/');
  };
  

  return (
    <main className='container p-5'>
      {editTitle ? (
        <>
          <center><h3>Edit Post</h3></center>
          <form onSubmit={(e) => e.preventDefault()} className='form-control card m-5'>
            <label>Post Title</label>
            <input
              type='text'
              value={editTitle}
              className='form-control'
              onChange={(e) => setEditTitle(e.target.value)} required
            />
            <label>Post Body</label>
            <br />
            <textarea
              className='form-control'
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              required
            ></textarea>
            <button
              type='button'
              className='btn btn-primary p-2 mt-4'
              onClick={handleEdit}
            >
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <h2>Page not found</h2>
          <Link to="/">Visit the home page</Link>
        </>
      )}
    </main>
  );
};

export default EditPost;
