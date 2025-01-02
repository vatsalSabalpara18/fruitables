import { Button } from '@mui/material'
import React from 'react'
import { decrement, increment } from '../../../redux/action/counter.action'

function Counter() {

    const handleIncrement = () => {
        increment();
    }
    const handleDecrement = () => {
        decrement();
    }
  return (
    <>
          <h1>Counter</h1>
          <Button onClick={handleIncrement} variant="contained" color="primary">
                Increment
          </Button>
          {' '}
          <span>0</span>
          {' '}
          <Button onClick={handleDecrement} variant="contained" color="primary">
              decrement
          </Button>
    </>
  )
}

export default Counter