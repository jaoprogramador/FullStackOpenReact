import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => setValue(''); // Agrega una función para resetear el valor

  return {
    input: { type, value, onChange },
    reset,
  };
};

