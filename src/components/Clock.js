import React, { useState, useEffect } from 'react';
import { FaCheck, FaPause } from 'react-icons/fa'
import './Timer.css';

const Clock = ({ items }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeToStretch, setTimeToStretch] = useState(false);
  const [stretches, setStrechtes] = useState(null);
  const [focusMode, setFocusMode] = useState(false);

  function toggle() {
    setIsActive(!isActive)
    setSeconds(seconds + 1)
    setStrechtes(null)
  }

  // function reset() {
  //   setSeconds(0)
  //   setIsActive(false)
  // }
 
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
          setStrechtes(block.stretches)
          if (!focusMode) {
            setIsActive(false)
            setTimeToStretch(true)
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification((block.time / 60) + ' minutes passed. Time for a stretch!');
            }
          }
        }
      })

    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, items, focusMode]);

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

  function toggleFocusMode() {
    setFocusMode(!focusMode)
  }

  return (
    <div className="clock">
      { timeToStretch ?
        <div className="stretches">
          { stretches.map(stretch => {
            return (
              <div className="stretch">
                { stretch.stretch }
              </div>
            )
          }) }
          <button className="button success-button" onClick={() => setTimeToStretch(false)}><FaCheck style={{ position: 'relative', top: '2px', marginRight: '.5rem' }}/> Resume work</button>
        </div>
      :
        <>
          <div className={focusMode ? 'time focus-enabled' : 'time'}>
            {seconds}s
          </div>
          <div className="timer-buttons">
            {isActive ? 
            <button className={`button`} onClick={toggle}>
              <FaPause style={{ position: 'relative', top: '2px', marginRight: '.5rem' }}/> Pause
            </button>
            : 
            <button className={`button success-button`} onClick={toggle}>
              <FaCheck style={{ position: 'relative', top: '2px', marginRight: '.5rem' }}/> Start working
            </button>
            }
            <button className="button" onClick={() => toggleFocusMode()}>
              { focusMode ? 
                <span>Focus mode activated</span>
              :
                <span>Start focus mode</span>
              }
            </button>
          </div>
        </>
      }
    </div>
  );
};

export default Clock;