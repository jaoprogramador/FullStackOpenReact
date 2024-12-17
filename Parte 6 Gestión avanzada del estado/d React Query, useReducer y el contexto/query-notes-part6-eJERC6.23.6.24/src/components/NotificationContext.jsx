import { createContext, useReducer, useContext } from 'react';

// Crea el contexto
const NotificationContext = createContext();

// Reducer para manejar el estado de la notificación
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.payload;
    case 'HIDE_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

// Proveedor del contexto
export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, '');

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook para usar el contexto
export const useNotification = () => useContext(NotificationContext);
