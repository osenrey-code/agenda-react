# Agenda React

Aplicación web de una agenda de contactos desarrollada con React como parte de la Tarea 4.

## Funcionalidades

- Agregar contactos con nombre, teléfono y correo electrónico.
- Visualizar los contactos en una lista.
- Buscar por nombre, teléfono o correo.
- Eliminar contactos.
- Diseño adaptable a computadoras y móviles.

## Estructura de componentes

- `App`: componente padre que administra los contactos y la búsqueda.
- `ContactForm`: componente hijo para registrar nuevos contactos.
- `ContactList`: componente hijo que muestra, filtra y elimina contactos.

## Requisitos

- Node.js 20 o superior.
- pnpm 9 o superior.

## Ejecutar el proyecto

```bash
pnpm install
pnpm dev
```

Luego abre la dirección que muestra Vite, normalmente `http://localhost:5173`.

## Compilación de producción

```bash
pnpm build
```

La versión compilada se genera en la carpeta `dist`.
