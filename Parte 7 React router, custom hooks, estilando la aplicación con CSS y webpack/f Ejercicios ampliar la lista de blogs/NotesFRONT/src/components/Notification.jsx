  import React from 'react';
  import { useSelector, useDispatch } from 'react-redux';
  import { hideNotification } from '../redux/notificationSlice';
  
  const Notification = () => {

    
    const dispatch = useDispatch();
    const { message, type, isVisible } = useSelector((state) => state.notification);
    
    const notificationStyle = {
      color: type === 'success' ? 'green' : 'red',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    }
    
    if (!isVisible) return null;
  
    const closeNotification = () => {
      dispatch(hideNotification());
    };
  
    return (
      <div style={notificationStyle} className={`notification ${type}` }>
        <p>{message}</p>
        <button onClick={closeNotification}>Cerrar</button>
      </div>
    );
  };
  

  export default Notification