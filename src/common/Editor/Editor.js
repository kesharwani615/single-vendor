import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the required CSS
import './style.css'
import { modules, formats } from "./Module";

const Editor = ({setContentState,content}) => {

  const handleEditorChange = (content) => {
    // setValue(content);
    setContentState((prev)=>({...prev,details:content}));
    };



  return (
    <div className="editor-container">
      <ReactQuill 
        theme="snow"
        value={content}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        placeholder="Write something awesome..."
      />
      {/* <div className="output">
        <h3>Editor Output:</h3>
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div> */}
    </div>
  );
};

export default Editor;
