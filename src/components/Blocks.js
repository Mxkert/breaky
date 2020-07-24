import React from 'react';
import { FaList } from 'react-icons/fa'
import './Blocks.css';

const Blocks = ({ items }) => {

  return (
    <>
      { items.map(block => {
        return (
          <>
            <div className="block work">
              <span className="digits">{ block.time }</span>
              <span>MIN</span>
            </div>
            <div className="block stretch">
              <span>STRETCH</span>
              { block.stretches.map(stretch => {
                return (
                  <h3>{ stretch.stretch }</h3>
                )
              }) }
              <FaList />
            </div>
          </>
        )
      }) }
    </>
  );
};

export default Blocks;