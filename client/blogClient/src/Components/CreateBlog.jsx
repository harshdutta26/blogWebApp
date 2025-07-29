import React from 'react'
import { useContext } from 'react';
import { MyContext } from './MyContext'; 
function CreateBlog() {
  const {
    showForm,
    SetshowForm,
    title,
    setTitle,
    content,
    setContent,
    author,
    setAuthor,
    toggle
  } = useContext(MyContext);
  return (
    <div>
        <form onSubmit={(e)=>handleSubmit(e)}>
              <h1>Enter Details</h1>
              <label htmlFor="#i1">Enter Title : 
                  <input type="text" id="i1" name="title" value={title} onChange={titleChange} />
              </label>
              <br />
              <label htmlFor="#i2">Enter Blog : 
                  <textarea name="content" id="i2" value={content} onChange={contentChange}></textarea>
              </label>
              <br />
              <label htmlFor="i3">Enter Author : 
                  <input type="text" id="i3" name="author" value={author} onChange={authorChange} />
              </label>
              <br />
              <button id="submitBtn">Submit</button>
          </form>

                      <div className={toggle? 'formDiv' : 'darkFormDiv'}>
          {showForm? (<form onSubmit={(e)=>handleSubmitAi(e)}>
              <h1>Create With AI</h1>
              <label htmlFor="#ai1">Enter Title : 
                  <input type="text" id="ai1" name="title" value={title} onChange={titleChange} />
              </label>
              <br />
             
              <br />
              <button id="submitBtn">Generate</button>
          </form>) : null}
          
        </div>
        

    </div>
  )
}

export default CreateBlog
