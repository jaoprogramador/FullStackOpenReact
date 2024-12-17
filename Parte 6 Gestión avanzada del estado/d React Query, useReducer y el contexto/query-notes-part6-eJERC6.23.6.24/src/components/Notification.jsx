import React, { useEffect } from 'react';
import { useNotification } from './NotificationContext';

const Notification = () => {
  const { notification, dispatch } = useNotification();

  // Oculta la notificación después de 5 segundos
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);

      return () => clearTimeout(timer); // Limpia el temporizador
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
      {notification}
    </div>
  );
};

export default Notification;
