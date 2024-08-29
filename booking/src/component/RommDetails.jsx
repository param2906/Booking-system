import React, { useState } from 'react'

function RommDetails({item,setRoom,rooms}) {
    const [date,setDate] = useState()
    const [toTime,toSetTime] = useState()
    const [fromTime,fromSetTime] = useState()
    console.log(rooms)
    const handleBook = ()=>{
            const time = {from: fromTime, to:toTime}
            const slotTime = {
                date  : new Date(date),
                slot:time
            }
            const newRoom = rooms.map((data)=>{
                if(data.id === item.id){
                    data.bookslots = slotTime
                }
                return data
            })
            setRoom(newRoom)
            setDate('')
            fromSetTime('')
            toSetTime('')
    }
    const handleTime = (e)=>{
        if(e.target.name === 'date'){
            setDate(e.target.value)
        }
        else if(e.target.name === 'from'){
            fromSetTime(e.target.value)
        }
        else if(e.target.name === 'to'){
            toSetTime(e.target.value)
        }
    }
  return (
    <div style={{marginTop:'2px', border:'2px dotted black', borderTop:'0px'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <h1>{item.name}</h1>
        <div>
            
        <div style={{display:'flex', flexDirection:'column' }}>
          <div style={{display:'flex', }}>
          {item.tags.map((tag)=>(
            <p style={{marginLeft:"10px",backgroundColor:'grey'}}>{tag}</p>
          ))}
         </div>
          
           <p>{item.seats} Capacity</p>
         
        </div>
        <button onClick={handleBook}>{item.status === "available" ? 'Booked': 'book slot'} </button>
        </div>
        </div>
        Date: <input type="date" name="date"  value = {date} onChange={(e)=>handleTime(e)}/>
        From: <input type="time" name="from"  value = {fromTime}onChange={(e)=>handleTime(e)}/>
        To: <input type="time" name="to" value = {toTime} onChange={(e)=>handleTime(e)}/>
    </div>
  ) 
}

export default RommDetails
