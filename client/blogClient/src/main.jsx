import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import CreateBlog from './Components/CreateBlog.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MyContext } from './Components/MyContext.jsx';
import Header from './Components/Header.jsx';


function AppProvider() {
  const [author, setAuthor] = useState('');
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, SetshowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [toggle, setToggle] = useState(false);

  function titleChange(e) {
    setTitle(e.target.value);
  }

  function contentChange(e) {
    setContent(e.target.value);
  }

  function authorChange(e) {
    setAuthor(e.target.value);
  }
  function toggleHandle() {
  setToggle(prev => !prev);
}

  return (
    <MyContext.Provider value={{
      author, setAuthor,
      blog, setBlog,
      loading, setLoading,
      showForm, SetshowForm,
      title, setTitle,
      content, setContent,
      toggle, setToggle,toggleHandle,
      titleChange, contentChange, authorChange
    }}>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/CreateBlog" element={<CreateBlog />} />
        </Routes>
      </BrowserRouter>

    </MyContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>
);
