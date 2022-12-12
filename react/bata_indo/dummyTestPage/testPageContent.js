import React from 'react';
// import * as React from 'react';
import FuseScrollbars from '@core/core/Scrollbars';
import Table from '@material-ui/core/Table';
// import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import  Paper from '@mui/material/Paper';
import { Label, GetLabel } from '@common/utils/label';

function TestPageContent(){
	const rows = [
		{
			id: 'id',
			align: 'left',
			disablePadding: false,
			// label: <Label labelId="BL00192" />,
			label: "dkm",
			sort: true
		},
		{
			id: 'createdOn',
			align: 'left',
			disablePadding: false,
			label: <Label labelId="BL00193" />,
			sort: true
		},

		{
			id: 'amount',
			align: 'left',
			disablePadding: false,
			label: <Label labelId="BL00186" />,
			sort: true
		},
		{
			id: 'statusCode',
			align: 'left',
			disablePadding: false,
			label: <Label labelId="BL00194" />,
			sort: true
		},
		{
			id: '-',
			align: 'left',
			disablePadding: false,
			label: <Label labelId="BL00195" />,
			sort: false
		}
	];




return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
			<TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
				
			</FuseScrollbars>
</div>
);

}


export default TestPageContent;