import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function ResponseModal({ open, onClose, uploadedData, duplicatesData }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}>
                <h2 id="modal-title">Uploaded Data</h2>
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Admission No</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Render uploaded data */}
                        {uploadedData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.admission_no}</TableCell>
                                <TableCell>{row.message}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableContainer>

                <h2 id="modal-title">Duplicates Data</h2>
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Admission No</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Render duplicates data */}
                        {duplicatesData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.admission_no}</TableCell>
                                <TableCell>{row.message}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            </Box>
        </Modal>
    );
}

export default ResponseModal;
