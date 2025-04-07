import {
  createTheme,
  filledInputClasses,
  inputLabelClasses,
  outlinedInputClasses,
  paperClasses,
  tableCellClasses,
} from '@mui/material'

// Used only to create transitions
const muiTheme = createTheme()

export function createComponents(config) {
  const { palette } = config

  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
        },
        sizeSmall: {
          padding: '6px 16px',
        },
        sizeMedium: {
          padding: '8px 20px',
        },
        sizeLarge: {
          padding: '11px 24px',
        },
        textSizeSmall: {
          padding: '7px 12px',
        },
        textSizeMedium: {
          padding: '9px 16px',
        },
        textSizeLarge: {
          padding: '12px 16px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          outline: 'none !important',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          [`&.${paperClasses.elevation1}`]: {
            boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '32px 24px',
          '&:last-child': {
            paddingBottom: '32px',
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
        },
        subheaderTypographyProps: {
          variant: 'body2',
        },
      },
      styleOverrides: {
        root: {
          padding: '32px 24px 16px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        '#root': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
        '#nprogress': {
          pointerEvents: 'none',
        },
        '#nprogress .bar': {
          backgroundColor: palette.primary.main,
          height: 3,
          left: 0,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 2000,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            opacity: 1,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
          '&::placeholder': {
            color: palette.text.secondary,
          },
        },
      },
    },
    MuiTextareaAutosize: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderRadius: 8,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: palette.neutral[200],
          padding: '14px',
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
          width: '100%',
          transition: muiTheme.transitions.create(['border-color', 'box-shadow']),
          '&:hover': {
            backgroundColor: palette.action.hover,
          },
          '&:focus': {
            backgroundColor: 'transparent',
            borderColor: palette.primary.main,
            boxShadow: `${palette.primary.main} 0 0 0 2px`,
          },
          '&:disabled': {
            backgroundColor: 'transparent',
            borderColor: palette.neutral[200],
          },
          '&:error': {
            borderColor: palette.error.main,
            boxShadow: `${palette.error.main} 0 0 0 2px`,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          outline: 'none !important',
        }
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderRadius: 8,
          borderStyle: 'solid',
          borderWidth: 1,
          overflow: 'hidden',
          borderColor: palette.neutral[200],
          transition: muiTheme.transitions.create(['border-color', 'box-shadow']),
          '&:hover': {
            backgroundColor: palette.action.hover,
          },
          '&:before': {
            display: 'none',
          },
          '&:after': {
            display: 'none',
          },
          [`&.${filledInputClasses.disabled}`]: {
            backgroundColor: 'transparent',
          },
          [`&.${filledInputClasses.focused}`]: {
            backgroundColor: 'transparent',
            borderColor: palette.primary.main,
            boxShadow: `${palette.primary.main} 0 0 0 2px`,
          },
          [`&.${filledInputClasses.error}`]: {
            borderColor: palette.error.main,
            boxShadow: `${palette.error.main} 0 0 0 2px`,
          },
        },
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: palette.action.hover,
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.neutral[200],
            },
          },
          // [`&.${outlinedInputClasses.focused}`]: {
          //   backgroundColor: 'transparent',
          //   [`& .${outlinedInputClasses.notchedOutline}`]: {
          //     borderColor: palette.primary.main,
          //     boxShadow: `${palette.primary.main} 0 0 0 2px`,
          //   },
          // },
          // [`&.${filledInputClasses.error}`]: {
          //   [`& .${outlinedInputClasses.notchedOutline}`]: {
          //     borderColor: palette.error.main,
          //     boxShadow: `${palette.error.main} 0 0 0 2px`,
          //   },
          // },
        },
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
        },
        notchedOutline: {
          borderColor: palette.neutral[200],
          transition: muiTheme.transitions.create(['border-color', 'box-shadow']),
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          [`&.${inputLabelClasses.filled}`]: {
            transform: 'translate(12px, 18px) scale(1)',
          },
          [`&.${inputLabelClasses.shrink}`]: {
            [`&.${inputLabelClasses.standard}`]: {
              transform: 'translate(0, -1.5px) scale(0.85)',
            },
            [`&.${inputLabelClasses.filled}`]: {
              transform: 'translate(12px, 6px) scale(0.85)',
            },
            [`&.${inputLabelClasses.outlined}`]: {
              transform: 'translate(14px, -9px) scale(0.85)',
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 900,
          lineHeight: 1.71,
          minWidth: 'auto',
          paddingLeft: 0,
          paddingRight: 0,
          color: '#85878a',
          textTransform: 'none',
          '& + &': {
            marginLeft: 24,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: palette.divider,
          padding: '10px 10px',
          color: "#585653",
          fontWeight: 500,
          textAlign: 'center',
          

        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          border: '2px solid #85878a',
          overflow: 'scroll',
     
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          boxShadow:  ' -1px 3px 5px 0px rgba(0,0,0,0.75)',
          borderBottom: 'none',
          [`& .${tableCellClasses.root}`]: {
            backgroundColor: '#686868',
            color: 'white',
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          },
          [`& .${tableCellClasses.paddingCheckbox}`]: {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
    // MuiInputBase: {
    //   defaultProps: {
    //     variant: 'filled',
    //   },
    //   styleOverrides: {
    //     root: {
    //       '& .MuiInputBase-input': {
    //         color: '#585653',
    //       },
    //       '&:focus .MuiOutlinedInput-notchedOutline': {
    //         borderColor: 'transparent !important',
    //         boxShadow: 'none !important'
    //       },
    
    //     },
    //   },
    // },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&.focus': {
            color: 'blue',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'center',
          color: '#686868',
        },
      }
    },
    MuiDataGrid:{
      styleOverrides: {
        root: {
          color: '#585653',
          backgroundColor: '#FFEEEE',
          boxShadow:  ' 3px 3px 3px 0px rgba(0,0,0,0.55)' ,
         
      
        },
        columnHeaders:{
          backgroundColor: '#c5c5c5',
          boxShadow:  ' -1px 2px 2px 0px rgba(0,0,0,0.55)',
          fontSize: '15px',
          color:'#686868',
        },
        columnHeaderTitle:{
          fontWeight: 'bold',
        
        },
     
        
      },
    
    },
 

  }
}
