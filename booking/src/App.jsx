import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import roomData  from '../../rooms.json'
import RommDetails from './component/RommDetails'

function App() {
  const [rooms,setRoom] = useState(roomData)
  const [searchRoom,setSearchRoom] = useState()
  const [showRoomDetails,setShowRoomDetails] = useState()
 
  const handleSearchRoom = (e)=>{

    const searchRoom = rooms.filter((item)=> item.name.includes(e.target.value))

    setSearchRoom(searchRoom)
    if(e.target.value === ''){
      setRoom(roomData)
    }
    
  }
  const searchRoomClick = ()=>{
    setRoom(searchRoom)
    
  }
  const handleShowRoom = (id)=>{
   
    if(showRoomDetails && (showRoomDetails[id] === true || showRoomDetails[id] === true)){
      const value = showRoomDetails[id]
      setShowRoomDetails({...showRoomDetails,[id]:!value})
    }
    else{
    setShowRoomDetails({...showRoomDetails,[id]:true})
    }
  }
  const getStatus = (bookslot)=>{
    const currentDate = new Date();
    
    // Extract the date and time slot information
    const slotDate = new Date(bookslot?.date);
    const slotFrom = bookslot?.slot.from; // "HH:mm" format
    const slotTo = bookslot?.slot.to; // "HH:mm" format
    
    // Format slotFrom and slotTo to match today's date for comparison
    const [fromHours, fromMinutes] = slotFrom.split(':').map(Number);
    const [toHours, toMinutes] = slotTo.split(':').map(Number);
    
    const fromDateTime = new Date(slotDate);
    fromDateTime.setHours(fromHours, fromMinutes, 0, 0);
    
    const toDateTime = new Date(slotDate);
    toDateTime.setHours(toHours, toMinutes, 0, 0);
    
    // Check if the current date matches the slot date and time is within the slot
    if (currentDate.toDateString() === slotDate.toDateString()) {
        return currentDate >= fromDateTime && currentDate <= toDateTime;
    }
    
    return false;
  }
  return (
    <>

      <div style={{display:'flex', justifyContent:'center'}}>
        <input type='text' onChange={(e)=>handleSearchRoom(e)} />
        <button onClick={searchRoomClick}>search</button>
        
      </div>
      {rooms.map((item)=>(
        <>
        <div style={{border:'2px solid black',padding:'0px',marginTop:'10px', display:'flex',justifyContent:'space-between'}}>
        <div style={{display:'flex', flexDirection:'column' }}>
        <h1>{item.name}</h1>

        {Object.keys(item?.bookslots).length === 0 ? "available":<p>{getStatus(item?.bookslots) ? "available":"not available"}</p>}
        </div>  
        
        <div style={{display:'flex', flexDirection:'column' }}>
          <div style={{display:'flex'}}>
          {item.tags.map((tag)=>(
            <p style={{marginLeft:"10px",backgroundColor:'grey'}}>{tag}</p>
          ))}
         </div>
          
           <p>{item.seats} Capacity</p>
         
        </div>
     
      </div>
      <button onClick={()=>handleShowRoom(item.id)}>show Details</button>
      {showRoomDetails && showRoomDetails[item.id] && <RommDetails item={item} setRoom={setRoom} rooms={rooms} />}
      </>
  
      ))}
      
    </>
  )
}

export default App
