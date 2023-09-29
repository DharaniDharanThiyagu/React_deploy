import { createStore, action, thunk, computed } from "easy-peasy";
import api from './api/Post';

export default createStore(
  {
  post: [],
  setPost: action((state, payload) => {
    state.post = payload;
  }),
  postBody: '',
  setPostBody: action((state, payload) => {
    state.postBody = payload;
  }),
  postTitle: '',
  setPostTitle: action((state, payload) => {
    state.postTitle = payload;
  }),
  search: '',
  setSearch: action((state, payload) => {
    state.search = payload;
  }),
  searchResult: [],
  setSearchResult: action((state, payload) => {
    state.searchResult = payload;
  }),
  postCount: computed((state) => state.post.length),
  getPostById: computed((state) => {return(id) =>
    state.post.find((post) => post.id.toString() === id)
}),
setEditTitle: action((state, payload) => {
  state.editTitle = payload;
}),
setEditBody: action((state, payload) => {
  state.editBody = payload;
}),

  savePost: thunk(async (actions, newPost, helpers) => {
    const { post } = helpers.getState();
    try {
      const response = await api.post('/', newPost);
      actions.setPost([...post, response.data]);
      actions.setPostBody('');
      actions.setPostTitle('');
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  }),
  deletePost: thunk(async (actions, id, helpers) => {
    const { post } = helpers.getState();
    try {
      await api.delete(`/${id}`);
      actions.setPost(post.filter((post) => post.id !== id));
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  }),
  editPost: thunk(async (actions, updatePost, helpers) => {
    const { post } = helpers.getState();
    const { id} = updatePost; // Destructure the properties
  
    try {
      // Send the updated data to the API
      const response = await api.put(`/${id}`, updatePost);
  
      // Update the store with the response data
      actions.setPost(
        post.map((post) =>
          post.id === id ? { ...response.data } : post
        )
      );
  
      // Clear the postTitle and postBody
      actions.setEsitTitle('');
      actions.setEditBody('');
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }),
  
});
