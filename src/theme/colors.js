import { alpha } from '@mui/material/styles';

const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};

// Fondo general
export const backgroundColor = '#fffdf6';

export const neutral = {
  50: '#F0F0F0',
  100: '#D9D9D9',
  200: '#C0C0C0',
  300: '#A6A6A6',
  400: '#8C8C8C',
  500: '#737373',
  600: '#595959',
  700: '#404040',
  800: '#262626',
  900: '#0D0D0D',
};

// Botones
export const primary = withAlphas({
  lightest: '#E7FFC9',
  light: '#DFFFAC',
  main: '#D4FFA3', // botones
  dark: '#A3CC7D',
  darkest: '#7AA359',
  contrastText: '#000000',
});

// Navbar y footer
export const secondary = withAlphas({
  lightest: '#EEF3FF',
  light: '#CEDBFF',
  main: '#ACCCFF', // navbar y footer
  dark: '#7A9FD9',
  darkest: '#5373AC',
  contrastText: '#000000',
});

// Éxito o validaciones correctas
export const success = withAlphas({
  lightest: '#E6F4E6',
  light: '#BFE6BF',
  main: '#A3FFA3',
  dark: '#7CD67C',
  darkest: '#57AD57',
  contrastText: '#000000',
});

// Información general
export const info = withAlphas({
  lightest: '#F0FCFF',
  light: '#CCF2FF',
  main: '#A3E9FF',
  dark: '#79B6CC',
  darkest: '#528899',
  contrastText: '#000000',
});

// Errores
export const error = withAlphas({
  lightest: '#FFE5E5',
  light: '#FFBABA',
  main: '#FF9E9C', // errores
  dark: '#D97C7A',
  darkest: '#A35655',
  contrastText: '#000000',
});

// Tipografía gris
export const grey = withAlphas({
  lightest: '#F5F5F5',
  light: '#D9D9D9',
  main: '#8C8C8C', // tipografía
  dark: '#595959',
  darkest: '#262626',
  contrastText: '#000000',
});
