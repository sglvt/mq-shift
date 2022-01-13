import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import FetchPage from "./components/FetchPage";
import MovePage from "./components/MovePage";
import InsertPage from "./components/InsertPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="fetch" element={<FetchPage />} />
        <Route path="move" element={<MovePage />} />
        <Route path="insert" element={<InsertPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
