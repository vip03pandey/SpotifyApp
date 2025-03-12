import React from 'react'
import { useState } from 'react';
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios';
const AddAlbum = () => {
  const [image,setImage]=useState(false);
  const [bgColor,setColor]=useState("#000000");
  const [name,setName]=useState("");
  const [desc,setDescription]=useState("");
  const [loading,setLoading]=useState(false);

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const formData=new FormData();
      formData.append('name',name);
      formData.append('desc',desc);
      formData.append('bgColor',bgColor);
      formData.append('image',image);
      const response=await axios.post('http://localhost:4000/api/album/add',formData);
      if (response.data.status === "success" || response.data.message === "Album Added Successfully") {
        toast.success("Album Added Successfully");
        setName("");
        setDescription("");
        setImage(false);
        setColor("#000000");
      }
      else{
        toast.error("something went wrong");
        console.error("Error details:",response.data.message);
      }
    }catch (err) {
      console.error("Error details:", err.response ? err.response.data : err.message);
      toast.error(err.response?.data?.message || "An unexpected error occurred");
    }
    
    setLoading(false)
  }
  
  return loading?( <div className='grid place-items-center min-h-[80vh] '>
  <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'>

  </div>
</div>): (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>
      <div className='flex flex-col gap-4'>
        <p>Upload Image</p>
        <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id='image' accept='image/*' hidden />
        <label htmlFor="image">
          <img src={(image ? URL.createObjectURL(image): assets.upload_area)} alt="Upload Image" className='w-24 cursor-pointer'/>
        </label>
      </div>
    <div className='flex flex-col gap-2.5'>
      <p>Album Name</p>
      <input onChange={(e)=>{setName(e.target.value)}} value={name} type="text" placeholder='type here' className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' required />
    </div>
    <div className='flex flex-col gap-2.5'>
      <p>Album Description</p>
      <input onChange={(e)=>{setDescription(e.target.value)}} value={desc} type="text" placeholder='type here' className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' required />
    </div>
    <div className='flex flex-col gap-1 '>
      <p>Background Color</p>
      <input onChange={(e)=>{setColor(e.target.value)}} value={bgColor} type="color"  />
    </div>
    <button className='text-base bg-black text-white cursor-pointer px-12 py-2.5 rounded-full' type='submit'>ADD</button>
  </form>
  )
}


export default AddAlbum
