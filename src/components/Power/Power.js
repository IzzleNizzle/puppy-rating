import React, { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'
import time from '../../utils/time'
import camo from '../../images/camo.png'
import fragGrenade from '../../images/fragGrenade.png'
import overshield from '../../images/overshield.png'
import carbine from '../../images/carbine.png'
import mauler from '../../images/mauler.png'
import plasmaPistol from '../../images/plasmaPistol.png'
import rocketLauncher from '../../images/rocketLauncher.png'
// import sniperRifle from '../../images/sniperRifle.png'
import sniper2 from '../../images/sniper2.png'

  let powerStyles = {
    textAlign: "center",
    maxWidth: '270px',
    backgroundColor: ''
  }

export default function Power(props) {
  const {
    seconds,
    minutes,
    restart,
    reset
  } = useTimer({
    expiryTimestamp: props.t,
    onExpire: () => restart(time.getTimeStamp(props.time))
  });
  
  // Initialize color of background state
  let [bc, setBc] = useState('')
  // Change background color if time is right
  useEffect(() => {
    console.log(`${props.name} seconds is ${seconds}`);
    
    if (seconds <= 15) {
      setBc('blue')
    } else {
      if (bc !== ''){
        setBc('')
      }
    }

    if (props.time - seconds <= 10) {
      setBc('green')
    }
  }, [seconds])

  // Turning off timer on dismount
  useEffect(() => {
    return reset
  }, [])

  const displayZero = num => ((num < 10) ? `0${num}` : num)

  // Display image based off of what Power item is being timed
  const displayPower = power => {
    switch( power ) {
      case "rocket":
      return rocketLauncher
      case "sniper":
      return sniper2
      case "mauler":
      return mauler
      case "carbine":
      return carbine
      case "grenades":
      return fragGrenade
      case "plasmaPistol":
      return plasmaPistol
      case "custom":
      return overshield
      case "camo":
      return camo
      case "overshield":
      return overshield
      default: 
    }
  }

  return (
    <div
      className="card"
      style={{...powerStyles,
        backgroundColor: bc
      }}
      onDoubleClick={() => restart(time.getTimeStamp(props.time))}
    >
      <img
      src={displayPower(props.name)} className="card-img-top image" 
      alt={props.displayName}
      />
      <div className="card-body">
        <h1>{props.displayName}</h1>
        <h3 className="card-text">
          <span>{displayZero(minutes)}</span>:<span>{displayZero(seconds)}</span>
        </h3>
      </div>
    </div>
  )
}
