import React, { useEffect } from 'react'
import { useSnackbar } from 'notistack';

const Alert = () => {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    enqueueSnackbar('I love hooks', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    })
  },[])

  return (
    <div></div>
  )
}

export default Alert