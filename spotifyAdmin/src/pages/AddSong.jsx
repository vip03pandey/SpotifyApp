import React, { useState,useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { url } from '../App'
import { toast } from 'react-toastify'
const AddSong = () => {
    const [image,setImage]=useState(false);
    const [audio,setaudio]=useState(false);
    const [name,setName]=useState("");
    const [desc,setDescription]=useState("");
    const [album,setAlbum]=useState("");
    const [loading,setLoading]=useState(false);
    const [albumData,setAlbumData]=useState([]);

    const onSubmitHandler=async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const formData = new FormData();
            formData.append('name',name);
            formData.append('desc',desc);
            formData.append('image',image);
            formData.append('audio',audio);
            formData.append('album',album);
            const response=await axios.post('http://localhost:4000/api/song/add',formData);
            if (response.data.status === "success" || response.data.message === "Song Added Successfully") {
                toast.success("Song Added Successfully");
                setName("");
                setDescription("");
                setImage(false);
                setaudio(false);
                setAlbum("");
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
    const loadAlbumData=async()=>{
        try{
            const response=await axios.get('http://localhost:4000/api/album/list')
            if(response.data.success){
                setAlbumData(response.data.albums)
            }
            else{
                console.error('Error in loadAlbumData:',response.data.message)
            }
        } 
        catch (err) {
            console.error("Error details:", err.response ? err.response.data : err.message);
            toast.error(err.response?.data?.message || "An unexpected error occurred");
        }
    }
    useEffect(()=>{
        loadAlbumData()
    },[])
  return loading ? (
    <div className='grid place-items-center min-h-[80vh] '>
        <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'>

        </div>
    </div>
  ) :(
   <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>
    <div className='flex gap-6'>
    <div className='flex flex-col gap-4'>
        <p>Upload Song</p>
        <input onChange={(e)=>{setaudio(e.target.files[0])}} type="file" id='song' accept='audio/*' hidden />
        <label htmlFor="song">
            <img src={audio ? assets.upload_added : assets.upload_song} alt="Upload Song" className='w-24 cursor-pointer'/>
        </label>
        </div>
    <div className='flex flex-col gap-4'>
        <p>Upload Image</p>
        <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id='image' accept='image/*' hidden />
        <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image): assets.upload_area} alt="Upload Image" className='w-24 cursor-pointer'/>
        </label>
    </div>
    </div>
    <div className='flex flex-col gap-2.5'>
        <p>Song Name</p>
        <input onChange={(e)=>{setName(e.target.value)}} value={name} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' type="text" required />
    </div>
    <div className='flex flex-col gap-2.5'>
        <p>Song Description</p>
        <input onChange={(e)=>{setDescription(e.target.value)}} value={desc} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' type="text" required />
    </div>
    <div className='flex flex-col gap-2.5 '>
        <p>Album</p>
        <select onChange={(e)=>{setAlbum(e.target.value)}} defaultValue={album} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]'>
        <option value="">Select Album</option>
        {albumData.map((album,index)=>(
            <option value={album._id} key={index}>{album.name}</option>
        ))}
        </select>
    </div>
    <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer rounded-full'>Add Song</button>
   </form>
  )
}

export default AddSong
