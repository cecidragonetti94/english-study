import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };

  return (
    <Box sx={{ textAlign: "center", padding: 3 }}>
      <Typography variant="h1">Welcome!</Typography>
      <Button variant="contained" onClick={handleLogin} sx={{ marginTop: 2 }}>
        Start
      </Button>
    </Box>
  );
}

export default Login;
