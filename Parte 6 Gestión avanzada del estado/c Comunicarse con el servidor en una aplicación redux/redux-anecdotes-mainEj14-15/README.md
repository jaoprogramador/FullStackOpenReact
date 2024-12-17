# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# 6.14 Anécdotas y el Backend, paso 1
Cuando la aplicación se inicie, obtén las anécdotas del backend implementado usando json-server.

Como datos de backend iniciales, puedes usar, por ejemplo, esto.
# Arranca primero el back y luego el front
# 1         json-server --watch db.json --port 3003
# 2         npm run dev

6.15 Anécdotas y el Backend, paso 2
Modifica la creación de nuevas anécdotas, de forma que las anécdotas se almacenen en el backend.