import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { ThemeProvider } from './context/ThemeContext'
import { WallpaperProvider } from './context/WallpaperContext'
import ChatPage from './pages/ChatPage'
import AuthPage from './pages/AuthPage'
import { useAuth } from '@clerk/react'


function App() {
  const { isSignedIn, isLoaded } = useAuth();

  if(!isLoaded) return <p>loading...</p>

  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path="/" element={isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace />} />
          <Route
            path="/auth"
            element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />}
          />
        </Routes>
        <Toaster />
      </WallpaperProvider>
    </ThemeProvider>
  )
}

export default App
