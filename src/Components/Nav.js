import  { React,useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useStoreState, useStoreActions } from 'easy-peasy';

const Nav = () => {
  const post = useStoreState((state) => state.post);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setSearchResult = useStoreActions((actions) => actions.setSearchResult);

  useEffect(() => {

    const filteredResults = post.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResult(filteredResults.reverse());
  }, [post,search,setSearchResult]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <Link className="navbar-brand text-light" to="/">
        React js Blog
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link text-light" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/newpost">
              New Post
            </Link>
          </li>
        </ul>
        <form
          className="form-inline my-2 my-lg-0"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="search"
            id="search"
            className="form-control mr-sm-2"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
};

export default Nav;
