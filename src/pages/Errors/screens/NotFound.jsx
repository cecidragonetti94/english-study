import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import img401 from "../../../assets/errors/error-401.png";
import img404 from "../../../assets/errors/error-404.png";
import img500 from "../../../assets/errors/error-500.png";

const IMAGE_MAP = {
  401: img401,
  404: img404,
  500: img500,
};

const STATUS_DATA = {
  401: {
    title: "No Autorizado",
    description: "No tienes permisos para acceder a esta página.",
    goBackButton: "Ir al Inicio",
  },
  404: {
    title: "Página no encontrada",
    description: "La página que buscas no existe o fue movida.",
    goBackButton: "Volver a Inicio",
  },
  500: {
    title: "Error Interno del Servidor",
    description: "Ocurrió un error inesperado. Inténtalo más tarde.",
    goBackButton: "Volver",
  },
};

function ErrorPage({ status }) {
  const navigate = useNavigate();
  const img = IMAGE_MAP[status];
  const statusInfo = STATUS_DATA[status] || STATUS_DATA[404]; 

  const goToLogin = () => {
    navigate(status === "401" ? "/" : "/home-comedor");
  };

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100vh",
        my: 2,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <img
              alt={statusInfo.title}
              src={img}
              style={{ display: "inline-block", maxWidth: "100%", width: 400 }}
            />
          </Box>
          <Typography align="center" sx={{ mb: 3 }} variant="h3">
            {statusInfo.title}
          </Typography>
          <Typography align="center" color="text.secondary" variant="body1">
            {statusInfo.description}
          </Typography>
          <Button
            onClick={goToLogin}
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowLeftIcon />
              </SvgIcon>
            }
            sx={{ mt: 3 }}
          >
            {statusInfo.goBackButton}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

ErrorPage.propTypes = {
  status: PropTypes.string.isRequired,
};

export default ErrorPage;
