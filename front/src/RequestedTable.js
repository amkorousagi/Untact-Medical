import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: '이름', width: 130 },
    { field: 'major', headerName: '전공', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'hostipal',
      headerName: '소속병원',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `경대`,
    },
    {
      field: 'time',
      headerName: '보낸 일시',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `2021/3/22`,
    },
  ];
  
  const rows = [
    { id: 1, name: '홍길동', major: '팔', age: 35 },
    { id: 2, name: '김철수', major: '다리', age: 42 },
    { id: 3, name: '박진영', major: '어깨', age: 45 },
    { id: 4, name: '엄준식', major: '발', age: 16 },
    { id: 5, name: '임경식', major: '무릅', age: null },
    { id: 6, name: '서영균', major: null, age: 150 },
    { id: 7, name: '누구', major: '발', age: 44 },
    { id: 8, name: '누구', major: '신경', age: 36 },
    { id: 9, name: '누구', major: '머리', age: 65 },
  ];
  
  export default function DataTable() {
    return (
      <div style={{ height: 500, width: 900, backgroundColor:"deepskyblue"}}>
        <DataGrid rows={rows} columns={columns} pageSize={7} checkboxSelection />
      </div>
    );
  }