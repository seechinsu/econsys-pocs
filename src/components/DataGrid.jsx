import React, { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import "./DataGrid.css";

const DataGrid = ({
  widthProp,
  heightProp,
  data: rowData,
  columns,
  updateSelectedRows,
  rowSelection,
}) => {
  const grid = useRef();

  const defaultColDef = {
    cellClass: "default-cell-class",
    autoheight: true,
    sortable: true,
    filter: true,
    resizable: true,
  };

  const columnDefs = columns.map((col) => {
    return {
      headerName: col,
      field: col,
    };
  });

  const onGridReady = (params) => {
    grid.current = params;
  };

  const onFirstDataRendered = () => {
    const { columnApi } = grid.current;
    const columnIds = columnApi.getAllColumns().map((column) => column.colId);
    columnApi.autoSizeColumns(columnIds, false);
  };

  const onSelectionChanged = () => {
    const { api } = grid.current;
    const selectedRows = api.getSelectedRows();
    updateSelectedRows(selectedRows);
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: `${heightProp}px`,
      }}>
      <AgGridReact
        ref={grid}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        paginationAutoPageSize={true}
        pagination={true}
        rowHeight={30}
        headerHeight={30}
        animateRows={true}
        rowSelection={rowSelection}
        onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
        onFirstDataRendered={onFirstDataRendered}
      />
    </div>
  );
};

export default DataGrid;
