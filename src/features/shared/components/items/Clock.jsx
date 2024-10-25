import React, { useEffect, useState } from 'react'
import moment from 'jalali-moment';

function Clock() {
    const [time, setTime] = useState(moment().format('jYYYY-jMM-jDD | hh:mm A'));

    useEffect(() => {
      const timer = setInterval(() => {
        setTime(moment().format('jYYYY-jMM-jDD | hh:mm A'));
      }, 60000);
  
      return () => clearInterval(timer); 
    }, []); 
  return (
    <div>
    <div className='today-date' style={{display:'flex',gap:'1rem'}}>
      <div>
          {time}            
      </div>
      <div style={{direction:'rtl'}}>
          امروز:              
      </div>
    </div>
  </div>
  )
}

export default Clock