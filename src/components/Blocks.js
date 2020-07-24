import React from 'react';
import './Blocks.css';

const Blocks = ({ items }) => {

  return (
    <>
      { items.map(block => {
        return (
          <div className="blocks">
            <div className="block work">
              <span className="digits">{ block.time / 60 }</span>
              <span>MIN</span>
            </div>
            {/* { block.stretches.map(stretch => {
              return (
                <h3>{ stretch.stretch }</h3>
              )
            }) } */}
          </div>
        )
      }) }
    </>
  )
};

export default Blocks;