import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {FC} from "react";
import {FlashCard} from "../../model/flash-card";

interface Props {
    headers: string[];
    rows: FlashCard[];
}

const BasicTable: FC<Props> = (props) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {props.headers.map((header) => (
                            <TableCell align={"center"} key={header}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row) => (
                        <TableRow
                            key={row.ID}
                        >
                            <TableCell align={"center"} style={{"fontWeight": "bold"}}>
                                {row.Front}
                            </TableCell>
                            <TableCell align="center">{row.Back}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BasicTable;
