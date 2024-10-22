"use client"
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type TProps = {
  setDiscription: (description: string) => void;
};

function QuillEditor({ setDiscription }: TProps) {
  const [value, setValue] = useState("");

  const handleChange = (content: string) => {
    setValue(content);
    // Strip HTML tags from the content
    const plainText = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    setDiscription(plainText);
  };

  return <ReactQuill theme="snow" value={value} onChange={handleChange} />;
}

export default QuillEditor;
