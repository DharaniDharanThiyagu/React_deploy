import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';

const PostPage = () => {
  const { id } = useParams();
  const history = useNavigate();

  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
const post =getPostById(id)
  // Fetch the post data when the component mounts
  
  // Get the post data from the store

  const handleDelete = (id) => {
    deletePost(id);
    history('/');
  };

  return (
    <main className=' container p-5'>
      <center>
        <article>
          {post ? (
            <>
              <h2>{post.title}</h2>
              <p>{post.datetime}</p>
              <p>{post.body}</p>
              <Link to={`/edit/${post.id}`} className='btn btn-secondary m-3'>
                Edit
              </Link>
              <button
                className='btn btn-danger'
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <p>No post found</p>
              <Link to="/" className='btn btn-danger'>
                Visit your home page
              </Link>
            </>
          )}
        </article>
      </center>
    </main>
  );
};

export default PostPage;
