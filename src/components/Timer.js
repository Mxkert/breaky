import React, { useState } from 'react';
import { useForm, useFieldArray }  from 'react-hook-form';
import './Blocks.css';
import Blocks from './Blocks'
import Clock from './Clock'

const Timer = () => {

  const { register, control, handleSubmit } = useForm({
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

  const [blocks, setBlocks] = useState([])
  
  const addBlock = (data) => {
    setBlocks(blocks => [...blocks, data])
  }

  return (
    <div className="app">
      <div className="container">

        <Clock items={blocks} />

        <form onSubmit={handleSubmit(addBlock)}>
          <label htmlFor="time">
            <input type="number" ref={register} name="time" placeholder="Time" />
          </label>
          {fields.map((item, index) => {
            return (
              <div className="input-with-button" key={item.id}>
                <input
                  name={`stretches[${index}].stretch`}
                  defaultValue={`${item.title}`} // make sure to set up defaultValue
                  placeholder="Stretch"
                  ref={register()}
                />
                <button className="closeButton" type="button" onClick={() => remove(index)}>
                  Oefening verwijderen
                </button>
              </div>
            );
          })}
          <button
            className="grayButton"
            type="button"
            onClick={() => {
              append({ title: "" });
            }}
          >
            Oefening toevoegen
          </button>
          <button type="submit">Block toevoegen</button>
        </form>

        <Blocks items={blocks} />

      </div>
    </div>
  );
};

export default Timer;