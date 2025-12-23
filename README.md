# React + TypeScript + Vite

This project is a **Retail Management System** built with **React, TypeScript, and Vite**.  
It provides a simple frontend interface for managing products, stock, carts, users, and reports. The project uses HMR for development and includes ESLint rules for code quality.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## Project Description

The system has two main roles:

### 1. Admin
- Stock management  
- Cart management  
- Manager reports  
- Logout  
- Add/Edit/Remove Users  
- Settings (can add, edit, remove products)  

### 2. User
- Stock management  
- Cart management  
- Manager reports  
- Logout  

> In the **Manager** section, all reports are visible, and you can **filter reports by specific dates**.

---

## Getting Started

After cloning the repository, follow these steps to run the project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
