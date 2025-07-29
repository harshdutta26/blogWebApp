// import { StrictMode,useState } from 'react'
// import { createRoot} from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import CreateBlog from './Components/CreateBlog.jsx'
// import { MyContext } from './Components/MyContext.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//     {/* <BrowserRouter>
//       <Routes>
//         <Route path='/CreateBlog'element={CreateBlog}/>
//       </Routes>
//     </BrowserRouter> */}
    
//   </StrictMode>,
// )

import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateBlog from './Components/CreateBlog.jsx'
import { MyContext } from './Components/MyContext.jsx'

function AppProvider() {
  const [author, setAuthor] = useState('');
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, SetshowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [toggle, setToggle] = useState(false);

  return (
    <MyContext.Provider
      value={{
        author, setAuthor,
        blog, setBlog,
        loading, setLoading,
        showForm, SetshowForm,
        title, setTitle,
        content, setContent,
        toggle, setToggle
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/CreateBlog" element={<CreateBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>
)
