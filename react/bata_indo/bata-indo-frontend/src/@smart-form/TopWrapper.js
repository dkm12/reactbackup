import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';

const TopWrapper = props => {
    if(props.type && props.type == 'table'){
        return (
            <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                <TableRow
                    className="h-48"
                >
                    <TableBody>
                        {props.children}
                    </TableBody>
                </TableRow>
            </Table>
        )
    }else {
        return (
            <Grid container spacing={props.spacing || 0} style={{marginBottom: '16px', marginTop: '16px'}}>
                {props.children}
            </Grid>
        )
    }
}

export default TopWrapper
