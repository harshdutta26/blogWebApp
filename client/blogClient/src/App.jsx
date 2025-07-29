
import { useState, useEffect } from 'react'
import './index.css'
import { Link, Outlet } from "react-router-dom"
import { MyContext } from './Components/MyContext';
import { useContext } from 'react';

function App() {
  const [author, setAuthor] = useState('');
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, SetshowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [toggle, setToggle] = useState(false);
  const [expanded, setExpanded] = useState({}); // <-- for showMore/showLess per blog

        const backendUrl=import.meta.env.BACKEND_URL;

  const fetchedData = async () => {
    try {
      setLoading(true);

      let res = await fetch(backendUrl);
      var data = await res.json();
      setBlog(data);
    } catch (err) {
      console.log(`Error is found ${err}`);
    }
  }

  useEffect(() => {
    fetchedData();
  }, []);

  function titleChange(e) {
    setTitle(e.target.value);
  }

  function contentChange(e) {
    setContent(e.target.value);
  }

  function authorChange(e) {
    setAuthor(e.target.value);
  }

  const createBlog = () => {
    SetshowForm(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await fetch(`${backendUrl}/newBlog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          author
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTitle('');
        setContent('');
        setAuthor('');
        fetchedData();
      } else {
        console.log('failed in handle submit');
      }
    }
    catch (err) { console.log(`err`); }
    SetshowForm(false);
  }

  const handleSubmitAi = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
        }),
      });
      const data = await res.json();
      if (data.success) {
        SetshowForm(true);
        setTitle('');
        setContent(data.blog);
        setAuthor('');
        fetchedData();
      }
      else {
        console.log('failed in handle submit');
      }
    }
    catch (err) { console.log(`err`); }
  }

  const deleteBlog = async (b) => {
    try {
      const res = await fetch(`${backendUrl}/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: b._id,
        }),
      });
    }
    catch (err) {
      console.log(`Error while deleting is ${err}`);
    }
    fetchedData();
  }

  const updateBlog = async (b) => {
    try {
      const res = await fetch(`${backendUrl}/update`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: b._id, title: b.title
        })
      })
      let data = await res.json();
      if (data.sucess) {
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
        SetshowForm(true);
      }
    }
    catch (err) {
      console.log(`Error at update blog function ${err}`);
    }
  }

  const toggleHandle = () => {
    setToggle(prev => !prev);
    console.log({ toggle });
  }

  const toggleExpand = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className={toggle ? 'parent' : 'darkParent'}>
      <div className={`${showForm ? 'shrink' : 'blog'}`} >
        <div className='header'>
          <h1 className={toggle ? 'blogHeading' : 'darkBlogHeading'}>Blog</h1>
          <div className='buttonGroup'>
            <button onClick={createBlog} id="create" >Create New</button>
            <button id="switch" onClick={toggleHandle} >Switch</button>
            <Outlet />
          </div>
        </div>

        {
          blog.length > 0 ? (
            blog.map((b) => {
              const isExpanded = expanded[b._id];
              const contentPreview = b.content.length > 200 ? b.content.substring(0, 200) + '...' : b.content;

              return (
                <div key={b._id} className={toggle ? "blogView" : "darkBlogview"}>
                  <h2>{b.title}</h2>
                  <p>{isExpanded ? b.content : contentPreview}</p>
                  {
                    b.content.length > 200 && (
                      <button className="showBtn" onClick={() => toggleExpand(b._id)}>
                        {isExpanded ? 'Show Less' : 'Show More'}
                      </button>
                    )
                  }
                  <br />
                  <strong>Author : {b.author}</strong>
                  <button id='del' onClick={() => deleteBlog(b)}>Delete</button>
                  <button id='update' onClick={() => updateBlog(b)}>Update</button>
                </div>
              );
            })
          ) : (
            <p>No blogs Found</p>
          )
        }
      </div>

      <div className={toggle ? 'formDiv' : 'darkFormDiv'}>
        {showForm ? (<form onSubmit={(e) => handleSubmit(e)}>
          <h1>Enter Details</h1>
          <label htmlFor="#i1">Enter Title :
            <input type="text" id="i1" name="title" value={title} onChange={titleChange} />
          </label>
          <br />
          <label htmlFor="#i2">Enter Blog :
            <textarea name="content" id="i2" value={content} onChange={contentChange}></textarea>
          </label>
          <br />
          <label htmlFor="#i3">Enter Author :
            <input type="text" id="i3" name="author" value={author} onChange={authorChange} />
          </label>
          <br />
          <button id="submitBtn">Submit</button>
        </form>) : null}
      </div>

      <div className={toggle ? 'formDiv' : 'darkFormDiv'}>
        {showForm ? (<form onSubmit={(e) => handleSubmitAi(e)}>
          <h1>Create With AI</h1>
          <label htmlFor="#aI1">Enter Title :
            <input type="text" id="aI1" name="title" value={title} onChange={titleChange} />
          </label>
          <br />
          <br />
          <button id="submitBtn">Generate</button>
        </form>) : null}
      </div>

    </div>
  )
}

export default App;
