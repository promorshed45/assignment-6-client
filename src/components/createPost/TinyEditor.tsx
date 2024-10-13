import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import default snow theme for Quill
import { useForm } from "react-hook-form";

export default function RichTextEditor() {
  const { setValue, watch } = useForm();

  const handleContentChange = (value: string) => {
    setValue("content", value);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      {/* Editor Label */}
      <label className="text-lg font-semibold text-white mb-2" htmlFor="travel-guide-editor">
        Write Your Travel Guide
      </label>

      {/* ReactQuill Editor */}
      <div id="travel-guide-editor"> {/* Associate the label with this div */}
        <ReactQuill
          className="text-white placeholder:text-gray-400 rounded-lg focus:border-primary-500 bg-gray-800"
          formats={formats}
          modules={modules}
          placeholder="Write your travel guide here..."
          theme="snow"
          value={watch("content")}
          onChange={handleContentChange}
        />
      </div>
    </div>
  );
}

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    ["link", "image"],
    [{ align: [] }, { color: [] }, { background: [] }],
    ["clean"], // remove formatting button
  ],
};

const formats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "link",
  "image",
  "align",
  "color",
  "background",
];

// qizqec943m1j8zita6zclt89gnzba641rcss4uqviqidlu35