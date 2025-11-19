import React, { useContext } from 'react';
import { MyContext } from './MyContext';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
  const {
    title, setTitle,
    content, setContent,
    author, setAuthor,
    titleChange, contentChange, authorChange,
    toggle
  } = useContext(MyContext);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/api/newBlog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author }),
      });
      const data = await res.json();
      if (data.success) {
        setTitle('');
        setContent('');
        setAuthor('');
        navigate('/'); // redirect to home after submit
      } else {
        console.log('Submit failed');
      }
    } catch (err) {
      console.log(`Submit error: ${err}`);
    }
  };

  const handleSubmitAi = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/api/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      if (data.success) {
        setContent(data.blog);
      } else {
        console.log('AI generation failed');
      }
    } catch (err) {
      console.log(`AI generation error: ${err}`);
    }
  };

  return (
    <div className={toggle ? 'formDiv' : 'darkFormDiv'}>
      <form onSubmit={handleSubmit}>
        <h1>Enter Details</h1>
        <label htmlFor="i1">Enter Title:
          <input type="text" id="i1" name="title" value={title} onChange={titleChange} />
        </label>
        <br />
        <label htmlFor="i2">Enter Blog:
          <textarea id="i2" name="content" value={content} onChange={contentChange}></textarea>
        </label>
        <br />
        <label htmlFor="i3">Enter Author:
          <input type="text" id="i3" name="author" value={author} onChange={authorChange} />
        </label>
        <br />
        <button id="submitBtn">Submit</button>
      </form>

      <br /><hr /><br />

      <form onSubmit={handleSubmitAi}>
        <h1>Create With AI</h1>
        <label htmlFor="ai1">Enter Title:
          <input type="text" id="ai1" name="title" value={title} onChange={titleChange} />
        </label>
        <br />
        <button id="submitBtn">Generate</button>
      </form>
    </div>
  );
}

export default CreateBlog;
