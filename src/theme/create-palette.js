import { alpha } from '@mui/material/styles';
import { backgroundColor, error, info, neutral, grey, success, primary, secondary } from './colors';

export function createPalette() {
  return {
    mode: 'light',
    background: {
      default: backgroundColor,
      paper: '#ffffff',
    },
    divider: '#E0E0E0',
    primary,
    secondary,
    error,
    info,
    success,
    neutral,
    text: {
      primary: grey.main,
      secondary: alpha(grey.main, 0.7),
      disabled: alpha(grey.main, 0.5),
    },
    action: {
      active: grey.main,
      hover: alpha(grey.main, 0.04),
      selected: alpha(grey.main, 0.12),
      disabled: alpha(grey.main, 0.38),
      disabledBackground: alpha(grey.main, 0.12),
      focus: alpha(grey.main, 0.16),
    },
  };
}
