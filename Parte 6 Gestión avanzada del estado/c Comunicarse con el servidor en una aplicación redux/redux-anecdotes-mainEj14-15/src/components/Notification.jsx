import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification); // Obtiene el estado de la notificación
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div style={style}>
      {notification} {/* Muestra el mensaje de la notificación */}
    </div>
  );
};

export default Notification;
