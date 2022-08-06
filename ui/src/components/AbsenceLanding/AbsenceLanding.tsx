import React, { FC, useState, useEffect, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import './AbsenceLanding.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from '@mui/material';

const AbsenceLanding: FC = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [metaData, setMetaData] = useState<any>();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 50,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true
    },
    {
      field: 'type',
      headerName: 'Type',
      filter: 'agSetColumnFilter'
    },
    { field: 'startDate', headerName: 'Leave Start' },
    { field: 'endDate', headerName: 'Leave End' },
    { field: 'memberNote', headerName: 'Member Note' },
    { field: 'status', headerName: 'Status' },
    { field: 'admitterNote', headerName: 'Admitter Note' }]);

  useEffect(() => {
    // fetch('http://ec2-13-233-141-189.ap-south-1.compute.amazonaws.com:5000/api/computed/getTableData?sort=date')
    fetch('http://localhost:5000/api/computed/getTableData?sort=date')
      .then(res => res.json())
      .then(result => { setRowData(result.data); setMetaData(result.meta); });
  }, []);

  // eslint-disable-next-line
  const avatarFormatter = ({ value }) => {
    return <img src={value} width="50px" height="50px" />
  }

  const onSelectionChanged = useCallback((event) => {
    setSelectedRows(event.api.getSelectedNodes().map(selection => selection.rowIndex));
  }, []);

  return (
    <div className="absence-landing-container">
      <div className='absence-data-header'>
          <h2>Absence Data</h2>
      </div>
      <div className='table-top-content'>
        <div className='total-absences'>
          Total Absences: {metaData?.total}
        </div>
        {selectedRows.length > 0 &&
        <div>
          <Button variant="outlined">Generate iCal</Button>
        </div>}
      </div>
      <div className="ag-theme-alpine ag-style landing-table">
        <AgGridReact
          defaultColDef={{ flex: 1, minWidth: 50, filter: true }}
          rowHeight={60}
          pagination={true}
          paginationPageSize={10}
          rowSelection={'multiple'}
          rowData={rowData}
          columnDefs={columnDefs}
          onSelectionChanged={onSelectionChanged}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default AbsenceLanding;
