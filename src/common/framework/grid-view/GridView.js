import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Pagination,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const GridView = ({
                      columns,
                      data,
                      totalRecords,
                      onPageChange,
                      onSearch,
                      onFilter,
                      onEdit,
                      onDelete,
                      tableWidth = "100%",
                      tableHeight = "500px",
                  }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({});

    // Handle page change
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        onPageChange(page, pageSize);
    };

    // Handle search
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    // Handle filter change
    const handleFilterChange = (column, value) => {
        const newFilters = { ...filters, [column]: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    // Calculate total pages
    const totalPages = Math.ceil(totalRecords / pageSize);

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Search Input */}
            <TextField
                fullWidth
                variant="outlined"
                label="Search"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ mb: 2 }}
            />

            {/* Table with Material-UI */}
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: tableHeight,
                    overflow: "auto",
                }}
            >
                <Table stickyHeader sx={{ width: tableWidth }}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.key} sx={{ fontWeight: "bold" }}>
                                    {column.title}
                                    {column.filterable && (
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            placeholder={`Filter ${column.title}`}
                                            onChange={(e) =>
                                                handleFilterChange(column.key, e.target.value)
                                            }
                                            sx={{ mt: 1 }}
                                        />
                                    )}
                                </TableCell>
                            ))}
                            <TableCell sx={{ fontWeight: "bold", width: "120px" }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, rowIndex) => (
                            <TableRow key={rowIndex} hover>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>{row[column.key]}</TableCell>
                                ))}
                                <TableCell>
                                    <IconButton color="primary" onClick={() => onEdit(row)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => onDelete(row)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{ mt: 2, alignSelf: "center" }}
            />
        </div>
    );
};

export default GridView;
