import React, { useRef } from 'react';
import { Box, IconButton, Tooltip, SvgIcon, Stack, Typography, Button,useMediaQuery } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarContainer, } from '@mui/x-data-grid';
import img404 from '../../assets/errors/error-404.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import InputSearch from '../InputSearch';
import SectionHeader from '../SectionHeader';

const CustomToolbar = ({ handleExportToPDF, onClickAddButton, onChange, value, buttonAdd }) => (
  <GridToolbarContainer  sx={{
    backgroundColor: 'grey',
    color: 'white',            
    p: 1,
    borderBottom: '1px solid white',
    '@media (max-width: 1451px)': {
      width: '98%',
      flexDirection: 'column-reverse',
    },
  }}>
    <Box sx={{
      display: 'flex',
    }}>
      <GridToolbar />
      <Button onClick={handleExportToPDF} variant='text' size='small' style={{
        paddingBottom: '3px',
        paddingLeft: '5px',
      }} > PDF </Button>
    </Box>

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '58%',
        '@media (max-width: 1451px)': {
          width: '98%',
          flexDirection: 'row',
        },

      }}
    >
      <InputSearch onChange={onChange} text={value} />
      {buttonAdd && <SectionHeader showAddButton onClickAddButton={onClickAddButton} />}
    </Box>
  </GridToolbarContainer>
);
const NoRowsOverlay = () => {
  return (
    <Stack style={{
      display: 'flex',
      jusifyContent: 'center',
      alignItems: 'center',
    }}>
      <Typography color="text.secondary" marginTop={3}>No results</Typography>

      <img
        alt="no results"
        src={img404}
        style={{
          width: 250,

        }}
      />
    </Stack>
  );
}
const NoResultsOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <Typography color="text.primary">No results</Typography>
    </Stack>
  );
}

const GenericDataGrid = ({ rows, columns, loading, actions, onClickAddButton, value, onChange, buttonAdd = true, onRowClick }) => {
  const gridRef = useRef();
  const isMobile = useMediaQuery('(max-width:600px)');
  const filteredColumns = columns
  .filter(col => !(isMobile && col.hideOnMobile))
  .map(col => {
    const updatedCol = { ...col };

    if (updatedCol.width && isMobile) {
      updatedCol.width = Math.min(updatedCol.width, 170);
    }

    if (!updatedCol.width) {
      updatedCol.flex = 1;
      updatedCol.minWidth = 50;
    }

    return updatedCol;
  });

  const handleExportToPDF = () => {
    const input = gridRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -heightLeft, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('data-grid.pdf');
    });
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Box ref={gridRef} sx={{ minWidth: '800px', height: '600px' }}>
        <DataGrid
          sx={{
            backgroundColor: 'white',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#E7FFC9',
              color: 'grey',
            },
            '& .MuiDataGrid-row': {
              backgroundColor: 'white',
            },
          }}
          rows={rows}
          columns={filteredColumns}
          loading={loading}
          onRowClick={onRowClick}
          slots={{
            toolbar: CustomToolbar,
            noRowsOverlay: NoRowsOverlay,
            noResultsOverlay: NoResultsOverlay,
          }}
          slotProps={{
            toolbar: {
              handleExportToPDF,
              onClickAddButton,
              onChange,
              value,
              buttonAdd,

            },
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25, 100]}
        />
      </Box>
    </Box>
  );

  
};

export default GenericDataGrid;
