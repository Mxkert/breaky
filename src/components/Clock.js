import React, { useState, useEffect } from 'react';
import './Timer.css';

const Clock = ({ items }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [stretches, setStrechtes] = useState(null);

  function toggle() {
    setIsActive(!isActive)
    setSeconds(seconds + 1)
    setStrechtes(null)
  }

  function reset() {
    setSeconds(0)
    setIsActive(false)
  }
 
  useEffect(() => {

    requestNotificationPermission();

    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);

      let time = 0;
      
      items.forEach(block => {
        time = time + parseInt(block.time)
        if (seconds === time) {
          setIsActive(false)
          setStrechtes(block.stretches)
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification((block.time / 60) + ' minuten verstreken');
          }
        }
      })

    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, items]);

  useEffect(() => {
    console.log(stretches)
  }, [stretches]);

  function requestNotificationPermission() {
    // Some browsers don't support Notification yet. I'm looking at you iOS Safari
    if ("Notification" in window) {
      if (
        Notification.permission !== "denied" &&
        Notification.permission !== "granted"
      ) {
        Notification.requestPermission();
      }
    }
  }

  return (
    <div className="app">
      { stretches ?
        <>
          <ul>
          { stretches.map(stretch => {
            return (
              <li>{ stretch.stretch }</li>
            )
          }) }
          </ul>
          <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
            {isActive ? 'Pause' : 'Start'}
          </button>
        </>
      :
        <>
          <div className="time">
            {seconds}s
          </div>
          <div className="row">
            <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button className="button" onClick={reset}>
              Reset
            </button>
            <button onClick={() => requestNotificationPermission()}>Vraag</button>
          </div>
        </>
      }
    </div>
  );
};

export default Clock;