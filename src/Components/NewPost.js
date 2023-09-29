import { useNavigate } from 'react-router-dom';
import format from 'date-fns/format';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';

const NewPost = () => {
  const history = useNavigate();
  const post = useStoreState((state) => state.post);
  const savePost = useStoreActions((actions) => actions.savePost);
  const postBody = useStoreState((state) => state.postBody);
  const postTitle = useStoreState((state) => state.postTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = post.length ? post[post.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    savePost(newPost);
    history('/');
  };

  return (
    <main className='container p-5'>
      <center><h3>New Post</h3></center>
      <form onSubmit={handleSubmit} className='form-control card m-5'>
        <label>Post Title</label>
        <input
          type='text'
          value={postTitle}
          className='form-control'
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label>Post Body</label>
        <textarea
          className='form-control'
          rows='5'
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        ></textarea>
        <button className='btn btn-success p-2 mt-4'>Submit</button>
      </form>
    </main>
  );
}

export default NewPost;
