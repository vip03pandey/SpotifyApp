import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/album/list');
      if (response.data.success) {
        setData(response.data.albums);
      } else {
        console.error('Error in fetchAlbums:', response.data.message);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this album?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                removeAlbum(id);
                closeToast();
              }}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="px-2 py-1 bg-gray-300 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const removeAlbum = async (id) => {
    try {
      const response = await axios.post('http://localhost:4000/api/album/remove', { id });
      if (response.data.success) {
        toast.success("Album Removed Successfully");
        await fetchAlbums();
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div>
      <p>All Album List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>
        {data.map((album, index) => (
          <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
            <img src={album.image} alt="Album Image" className='w-12 rounded-full' />
            <p>{album.name}</p>
            <p>{album.desc}</p>
            <p>{album.bgColor}</p>
            <p onClick={() => confirmDelete(album._id)} className='cursor-pointer text-red-600'>x</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
