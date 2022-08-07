import React, { FC, useState, useEffect, useCallback } from 'react';
import { Button } from '@mui/material';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import saveICall from '../../library/iCalendar';
import filterParams from '../../library/dateFilterParams';
import './AbsenceLanding.css';

const AbsenceLanding: FC = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [rowData, setRowData] = useState<Array<any>>([]);
  const [metaData, setMetaData] = useState<any>();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 50,
      checkboxSelection: true
    },
    {
      field: 'type',
      headerName: 'Type',
      filter: 'agSetColumnFilter'
    },
    { field: 'startDate', headerName: 'Leave Start', filter: 'agDateColumnFilter', filterParams: filterParams, floatingFilter: true },
    { field: 'endDate', headerName: 'Leave End', filter: 'agDateColumnFilter', filterParams: filterParams, floatingFilter: true },
    { field: 'memberNote', headerName: 'Member Note' },
    { field: 'status', headerName: 'Status' },
    { field: 'admitterNote', headerName: 'Admitter Note' }]);

  useEffect(() => {
    fetch('http://ec2-13-233-141-189.ap-south-1.compute.amazonaws.com:5000/api/computed/getTableData?sort=date')
    // fetch('http://localhost:5000/api/computed/getTableData?sort=date')
      .then(res => res.json()).catch((error) => {
        console.error(`API load error: ${error}`);
      })
      .then(result => { setRowData(result.data); setMetaData(result.meta); })
      .catch((error) => {
        console.error(`API response parse error: ${error}`);
      });
  }, []);

  const onSelectionChanged = useCallback((event) => {
    console.log(event.api.getSelectedNodes());
    setSelectedRow(Number(event.api.getSelectedNodes()[0]?.id) ?? null);
  }, []);

  const onGenerateICal = (e:any) => {
    if (selectedRow === null || selectedRow === undefined) return;
    const event: any = {};
    const currentAbsence = rowData[selectedRow];
    event.dateStart = currentAbsence.startDate;
    event.dateEnd = currentAbsence.endDate;
    event.name = `Absence of ${currentAbsence.name} starting ${currentAbsence.startDate}`;
    event.description = `${currentAbsence.name} is on absence of type ${currentAbsence.type} starting ${currentAbsence.startDate} and ending on ${currentAbsence.endDate}`;
    event.address = 'Calendar';
    saveICall(event);
  }

  return (
    <div className="absence-landing-container">
      <div className='absence-data-header'>
          <h2>Absence Data</h2>
      </div>
      <div className='table-top-content'>
        <div className='total-absences'>
          Total Absences: {metaData?.total}
        </div>
        {selectedRow !== null
          ? <div className='generate-iCal-button'>
            <Button variant="outlined" onClick={onGenerateICal}>Generate iCal</Button>
          </div>
          : <div className='generate-iCal-static-text'>
            Select an absence to general iCal
          </div>
        }
      </div>
      <div className="ag-theme-alpine ag-style landing-table">
        <AgGridReact
          defaultColDef={{ flex: 1, minWidth: 50 }}
          rowHeight={60}
          pagination={true}
          paginationPageSize={10}
          rowData={rowData}
          columnDefs={columnDefs}
          onSelectionChanged={onSelectionChanged}
          overlayLoadingTemplate={
            '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
          }
          overlayNoRowsTemplate={'<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow">No rows to show at the moment</span>'}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default AbsenceLanding;
