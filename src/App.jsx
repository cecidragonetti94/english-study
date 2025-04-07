import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'
import { createCustomTheme } from './theme/index'
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack'



function App() {
  const defaultTheme = createCustomTheme();
 
  return (
    <>
    <Router>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <SnackbarProvider maxSnack={3} anchorOrigin={{vertical:'bottom',horizontal:'center'}}>
            <Routes />
          </SnackbarProvider>
        </ThemeProvider>
    </Router>
     

    </>
  )
}

export default App
