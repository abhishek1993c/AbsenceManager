import React, { FC, useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import './AbsenceLanding.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const AbsenceLanding: FC = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch('http://ec2-13-233-141-189.ap-south-1.compute.amazonaws.com:5000/api/absences/getAll')
      .then(res => res.json())
      .then(result => setRowData(result));
  }, []);

  // eslint-disable-next-line
  const avatarFormatter = ({ value }) => {
    return <img src={value} width="50px" height="50px" />
  }

  return (
    <div className="absence-landing-container">
      <div>
          <h2>Implement AG Grid in React</h2>
      </div>
        <div className="ag-theme-alpine ag-style landing-table">
          <AgGridReact
            defaultColDef={{ flex: 1 }}
            rowHeight={60}
            pagination={true}
            paginationPageSize={10}
            rowData={rowData} >
            <AgGridColumn field="userId" headerName="ID" sortable={true} filter={false} cellClass="vertical-middle" />
            <AgGridColumn field="type" headerName="Type" sortable={true} filter={true} cellClass="vertical-middle" />
            <AgGridColumn field="startDate" headerName="Start Date" sortable={true} filter={true} cellClass="vertical-middle" />
            <AgGridColumn field="endDate" headerName="End Date" sortable={true} filter={true} cellClass="vertical-middle" />
            <AgGridColumn field="memberNote" headerName="Member Note" sortable={true} filter={false} cellClass="vertical-middle" />
            <AgGridColumn field="admitterNote" headerName="Admitter Note" sortable={true} filter={false} cellClass="vertical-middle" />
            {/* <AgGridColumn field="avatar" headerName="Avatar" sortable={true} filter={true} cellRendererFramework={avatarFormatter} cellClass="vertical-middle" /> */}
        </AgGridReact>
      </div>
    </div>
  );
}

export default AbsenceLanding;
