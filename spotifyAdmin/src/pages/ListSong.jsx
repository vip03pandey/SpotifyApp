import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/song/list');
      if (response.data.success) {
        setData(response.data.songs);
      } else {
        console.error('Error in fetchSongs:', response.data.message);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this song?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                removeSong(id);
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

  const removeSong = async (id) => {
    try {
      const response = await axios.post('http://localhost:4000/api/song/remove', { id });
      if (response.data.success) {
        toast.success("Song Removed Successfully");
        await fetchSongs();
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((song, index) => (
          <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
            <img src={song.image} alt="Song Image" className='w-12 rounded-full' />
            <p>{song.name}</p>
            <p>{song.album}</p>
            <p>{song.duration}</p>
            <p onClick={() => confirmDelete(song._id)} className='cursor-pointer text-red-600'>x</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListSong;
