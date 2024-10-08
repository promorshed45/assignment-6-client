import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type TProps = {
  setDiscription: (description: string) => void;
};

function QuillEditor({ setDiscription }: TProps) {
  const [value, setValue] = useState("");

  //   console.log(value);
  //   setDiscription(value)

  const handleChange = (content: string) => {
    setValue(content);
    setDiscription(value);
  };

  return <ReactQuill theme="snow" value={value} onChange={handleChange}/>
}

export default QuillEditor;
