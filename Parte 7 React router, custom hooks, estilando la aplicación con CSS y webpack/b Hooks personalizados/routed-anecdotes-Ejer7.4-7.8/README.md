# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



7.4: Anécdotas y Hooks paso 1
Simplifica el formulario de creación de anécdotas de tu aplicación con el hook personalizado useField que definimos anteriormente.

Un lugar natural para guardar los hooks personalizados en tu aplicación es el archivo /src/hooks/index.js.

Si utilizas la exportación nombrada en lugar de la exportación predeterminada:

import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// los módulos pueden tener muchas exportaciones nombradas
export const useAnotherHook = () => {
  // ...
}copy
Luego, la importación ocurre de la siguiente manera:

import  { useField } from './hooks'

const App = () => {
  // ...
  const username = useField('text')
  // ...
}

7.5: Anécdotas y Hooks paso 2
Agrega un botón al formulario que puedas usar para borrar todos los campos de entrada:
Amplia la funcionalidad del hook useField para que ofrezca una nueva operación reset para limpiar el campo.

Dependiendo de tu solución, es posible que veas la siguiente advertencia en tu consola:


