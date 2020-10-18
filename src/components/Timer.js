import React, { useState } from 'react';
import { useForm, useFieldArray }  from 'react-hook-form';
import './Blocks.css';
import { FaTimes, FaCheck, FaPlus } from 'react-icons/fa'
import Blocks from './Blocks'
import Clock from './Clock'

const Timer = () => {

  const { register, control, reset, handleSubmit } = useForm({
    defaultValues: {
      stretches: [{ title: "" }]
    }
  });
  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "stretches"
    }
  );

  const [blocks, setBlocks] = useState(null)
  const [blockTime, setBlockTime] = useState(null)
  const [addingBlock, setAddingBlock] = useState(false)
  const [startWorking, setStartWorking] = useState(false)
  
  const addBlock = (data) => {
    const newBlock = {
      time: data.time * 60,
      stretches: data.stretches
    }
    blocks ? setBlocks(blocks => [...blocks, newBlock]) : setBlocks([newBlock])
    setAddingBlock(false)
    reset();
  }

  // function addABlock() {
  //   setAddingBlock(true)
  // }

  return (
    <div className="container">
      <div className="wrapper">

          { addingBlock ?
          <form onSubmit={handleSubmit(addBlock)}>
            <label htmlFor="time">
              <input type="number" ref={register} name="time" placeholder="Amount of minutes in block" />
            </label>
            {fields.map((item, index) => {
              return (
                <div className="input-with-button" key={item.id}>
                  <input
                    name={`stretches[${index}].stretch`}
                    defaultValue={`${item.title}`} // make sure to set up defaultValue
                    placeholder="Stretch description"
                    ref={register()}
                  />
                  <button className="button delete-button" type="button" onClick={() => remove(index)}>
                    <FaTimes />
                  </button>
                </div>
              );
            })}
            <div style={{ display: 'flex', flexDirection: 'column'}}>
              <button
                className="button"
                type="button"
                style={{ marginBottom: '1rem' }}
                onClick={() => {
                  append({ title: "" });
                }}
              >
                Add another stretch
              </button>
              <button type="submit" className="button success-button"><FaCheck /></button>
            </div>
          </form>
          : 
            <>
              { blocks ? 
                <>
                  { startWorking ?
                    <Clock items={blocks} />
                  :
                    <div className="blocks-container">
                      <Blocks items={blocks} />
                      <div className="start-timer">
                        <button className="button" onClick={() => setAddingBlock(true)} style={{ marginBottom: '1rem'}}>Add another block</button>
                        <button className="button success-button" onClick={() => setStartWorking(true)}><FaCheck style={{ position: 'relative', top: '2px' }}/></button>
                      </div>
                    </div>
                  }
                </>
              :
                <div className="start">
                  <button className="button success-button" onClick={() => setAddingBlock(true)}><FaPlus style={{ position: 'relative', top: '2px', marginRight: '.5rem' }}/> Add your first block</button>
                </div>
              }
            </>
          }

      </div>
    </div>
  );
};

export default Timer;