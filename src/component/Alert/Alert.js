import React, { useEffect } from 'react'
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { resetAlert } from '../../redux/reducer/slice/alert.slice';

const Alert = () => {

  const dispatch = useDispatch();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { message, varriant } = useSelector(s => s.alert);

  useEffect(() => {
    if (message && varriant){
      enqueueSnackbar(message, {
        variant: varriant,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
      setTimeout(() => {
        dispatch(resetAlert());
      }, 2000);
    }    
  }, [varriant, message]);

  return (
    <div></div>
  )
}

export default Alert