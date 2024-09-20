import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Experts from './components/Experts';
import Candidates from './components/Candidates';
import Matching from './components/Matching';
import './App.css';
import AuthPage from './components/signIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#115293',
    },
  },
});

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMatching, setIsMatching] = useState(false);
  const [isLogged, setIsLogged] = useState(false)

  const startMatching = () => {
    setIsMatching(true);
  };

  return (
      isLogged ?
        <div className="container">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          <main className="content">
            <Dashboard 
              active={activeSection === 'home'} 
              setActiveSection={setActiveSection}
              startMatching={startMatching}
            />
            <Experts active={activeSection === 'experts'} />
            <Candidates active={activeSection === 'candidates'} />
            <Matching 
              active={activeSection === 'matching'} 
              isMatching={isMatching}
              setIsMatching={setIsMatching}
            />
          </main>
        </div>
      : <>
      <ThemeProvider theme={theme}>
      {/* Wrapper to cover the entire background */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height
          backgroundColor: '#F0F4F8', // White background
          overflow : 'hidden'
        }}
      >
        {/* Centered authentication box */}
        <Box
          sx={{
            width: '100vw',   // Full width initially, can be adjusted
            padding: '2rem',  // Padding inside the box
            backgroundColor: '#F0F4F8', // White background for the box too
            boxShadow: 3,    // Adds a subtle shadow
            borderRadius: '8px', // Rounded corners
            overflow : "hidden"
          }}
        >
          <AuthPage setLogged={setIsLogged} setSession={setActiveSection}/>
        </Box>
      </Box>
    </ThemeProvider>
      </>
  );
}

export default App;