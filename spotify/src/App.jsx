import React, { useRef } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Player from './components/Player.jsx'
import Display from './components/Display.jsx'
import { useContext } from 'react'
import { PlayerContext } from './context/PlayerContext.jsx'
function App() {
  const {audioref,track}=useContext(PlayerContext)
  
  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <Display/>
      </div>
      <Player />
      <audio ref={audioref} src={track.file} preload='auto'></audio>
    </div>
  )
}

export default App
