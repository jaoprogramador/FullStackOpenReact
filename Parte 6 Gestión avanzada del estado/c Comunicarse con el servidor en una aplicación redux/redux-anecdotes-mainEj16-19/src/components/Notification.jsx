import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null; // No mostrar nada si no hay notificación
  }

  return (
    <div style={{ border: '1px solid green', padding: '10px', margin: '10px 0' }}>
      {notification}
    </div>
  );
};

// Exporta el componente por defecto
export default Notification;

