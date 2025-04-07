import React, { useState, useMemo, useCallback } from 'react';
import GenericDataGrid from '../../../components/DataGrid';
import AddWord from './AddWord';

const mockRows = [
  { id: 1, word: 'sleep', meaning: 'dormir', prayer: 'you have to sleep like Rhysand' },
  { id: 2, word: 'eat', meaning: 'comer', prayer: 'you have to eat like Rhysand' },
  { id: 3, word: 'poop', meaning: 'caca', prayer: 'you have to poop like rhysand' },
  { id: 4, word: 'run', meaning: 'correr', prayer: 'you have to run like Rhysand' },
  { id: 5, word: 'fly', meaning: 'volar', prayer: 'you have to fly like Rhysand' },
  { id: 6, word: 'fight', meaning: 'pelear', prayer: 'you have to fight like Rhysand' },
];

const GridHome = () => {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e);
  };

  const filteredRows = useMemo(() => {
    return mockRows.filter(
      (row) =>
        row.word.toLowerCase().includes(search.toLowerCase()) ||
        row.prayer.toLowerCase().includes(search.toLowerCase()) ||
        row.meaning.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);


  const handleClickAdd = useCallback((event) => {
    setOpen(event.isTrusted)
  }, []);

  const columns = [
    { field: 'word', headerName: 'Word' },
    { field: 'meaning', headerName: 'Meaning' },
    { field: 'prayer', headerName: 'Prayer' },
  ];
  

  return (
   <>
   {open && <AddWord open={open} onClose={() => setOpen(false)} />}
    <GenericDataGrid
      rows={filteredRows}
      columns={columns}
      loading={false}
      onChange={handleChange}
      value={search}
      buttonAdd={true}
      onClickAddButton={handleClickAdd}
      
    />
   
   </>
   
  );
};

export default GridHome;
