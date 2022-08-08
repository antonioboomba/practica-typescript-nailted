import React, { useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Users from './pages/Users'

function App() {
  return (
    <div>
      <Users />
    </div>
  )
}


export default App;
