
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import Navbar  from './Navbar.jsx'
import Section  from './Section.jsx'
import InputFile  from './InputFile.jsx'
import axios from "axios";

const Add = () => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [images, setImages] = useState(null);
  // =======================================================================================================================================

  // Settingan toolbar wysiwyg
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["clean"],
      [{ align: [] }, { color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
    ],
  };

  // fungsi nge set gambar
  const handleFileSelect = (file) => {
    setImages(file);
  };


  // fungsi neg set judul
  const handleInputTitle = (e) => {
    setTitle(e.target.value)
  }


  const saveData = async () => {

    if(!images) return alert('please input images first!');

    const formData = new FormData();
    formData.append('file', images);
    formData.append('title', title);
    formData.append('content', value);

    try {
      const response = await axios.post('http://localhost:3001/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <>
      <Navbar />
      <Section >
        <p className="text-2xl font-semibold">Tambah Article</p>
        <div className="mt-8 flex flex-col gap-2">
          <div className="py-2 flex flex-col gap-2">
            <label className="text-xl font-semibold" htmlFor="">Add Image</label>
            <InputFile onFileSelect={handleFileSelect} />
          </div>
          <div className="py-2 flex flex-col gap-2">
            <label className="text-xl font-semibold" htmlFor="">Title</label>
            <input type="text" className="w-full border-2 border-slate-300 focus:outline-none focus:border-primary transition-colors p-4 rounded-lg"  placeholder="Input title" onChange={handleInputTitle}/>
          </div>
          <div className="py-2 flex flex-col gap-2 overflow-scroll h-64">
            <label className="text-xl font-semibold" htmlFor="">Content</label>
            <ReactQuill modules={modules} placeholder="Start typing..." theme="snow" value={value} onChange={setValue} className="h-36"/>
          </div>
          <button className="w-fit px-8 py-4 border-none bg-primary text-white font-semibold rounded-lg ml-auto" onClick={saveData} >Simpan</button>
        </div>

      </Section>
    </>
  )
}
export default Add;