import { Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../../../redux/action/counter.action'

function Counter() {
    const dispatch = useDispatch();
    const count = useSelector(state => state.counter.count); // 4
    const handleIncrement = () => { // 1
        dispatch(increment());
    }
    const handleDecrement = () => {
        dispatch(decrement());
    }    
  return (
    <>
          <h1>Counter</h1>
          <Button onClick={handleIncrement} variant="contained" color="primary">
                Increment
          </Button>
          {' '}
          <span>{count}</span>
          {' '}
          <Button onClick={handleDecrement} variant="contained" color="primary">
              decrement
          </Button>
    </>
  )
}

export default Counter