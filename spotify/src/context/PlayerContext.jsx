import { createContext, useEffect, useState } from "react";
import { useRef } from "react";
import { songsData } from "../assets/assets";
export const PlayerContext=createContext()
const PlayerContextProvider=(props)=>{
    const audioref=useRef()
    const seekBg=useRef()
    const seekBar=useRef()
    const [track,setTrack]=useState(songsData[0])
    const [playStatus,setPlayStatus]=useState(false)
    const [time,setTime]=useState({
        currentTime:{
            seconnd:0,
            minute:0,
        },
        totalTime:{
            seconnd:0,
            minute:0,
        }
    })
    
    const play=()=>{
        audioref.current.play()
        setPlayStatus(true)
    }
    const pause=()=>{
        audioref.current.pause()
        setPlayStatus(false)
    }
    const previous=async ()=>{
        if(track.id>0){
            await setTrack(songsData[track.id-1])
            await audioref.current.play()
            setPlayStatus(true)
        }
    }
        const next=async ()=>{
            if(track.id<songsData.length-1){
                await setTrack(songsData[track.id+1])
                await audioref.current.play()
                setPlayStatus(true)
            }
        }
        const seekSong=async(e)=>{
            audioref.current.currentTime=(e.nativeEvent.offsetX/seekBg.current.offsetWidth)*audioref.current.duration
        }
    useEffect(()=>{
        setTimeout(()=>{
            audioref.current.ontimeupdate=()=>{
                seekBar.current.style.width=(audioref.current.currentTime/audioref.current.duration)*100+"%"
                setTime({
                    currentTime:{
                        seconnd:Math.floor(audioref.current.currentTime%60),
                        minute:Math.floor(audioref.current.currentTime/60),
                    },
                    totalTime:{
                        seconnd:Math.floor(audioref.current.duration%60),
                        minute:Math.floor(audioref.current.duration/60),
                    }
                    
                });
        }},1000)
    },[audioref])
    const playWithId=async(id)=>{
        await setTrack(songsData[id])
        // await audioref.current.src=songsData[id].file
        await audioref.current.play()
        setPlayStatus(true)
    }
    const contextvalue={
        audioref,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,pause,
        playWithId,
        next,
        previous,
        seekSong
    }
    return (
        <PlayerContext.Provider value={contextvalue}>
            {props.children}
        </PlayerContext.Provider>
    )
}
export default PlayerContextProvider