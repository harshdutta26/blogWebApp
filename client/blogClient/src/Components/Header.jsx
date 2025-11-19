import React, { useContext } from 'react';
import { MyContext } from './MyContext';
import { Link } from 'react-router-dom';
import '../index.css'
function Header() {
  const { toggle, toggleHandle } = useContext(MyContext);

  return (
    <div className="header border-2 border-red-500 w-full bg-green-600">
      <h1 className={toggle ? 'blogHeading' : 'darkBlogHeading'}>Blog</h1>
      <div className="buttonGroup">
        <Link to="/CreateBlog">
          <button id="create">Create New</button>
        </Link>
        <button id="switch" onClick={toggleHandle}>Switch</button>
      </div>
    </div>
  );
}

export default Header;
