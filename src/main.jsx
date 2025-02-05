import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import {Provider} from "react-redux"
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="153833494907-jbs4qeekih99hi2hu3ftanrral4df6uc.apps.googleusercontent.com">

    <App />

  </GoogleOAuthProvider>
  
)
