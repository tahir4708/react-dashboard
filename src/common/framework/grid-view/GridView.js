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
                      defaultPageSize = 10, // Added default page size
                  }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(defaultPageSize); // Now using the prop
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({});

    // Calculate total pages ensuring at least 1 page
    const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

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
                    flexGrow: 1, // Takes available space
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
                            {(onEdit || onDelete) && (
                                <TableCell sx={{ fontWeight: "bold", width: "120px" }}>
                                    Actions
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <TableRow key={rowIndex} hover>
                                    {columns.map((column) => (
                                        <TableCell key={column.key}>
                                            {row[column.key]}
                                        </TableCell>
                                    ))}
                                    {(onEdit || onDelete) && (
                                        <TableCell>
                                            {onEdit && (
                                                <IconButton color="primary" onClick={() => onEdit(row)}>
                                                    <EditIcon />
                                                </IconButton>
                                            )}
                                            {onDelete && (
                                                <IconButton color="error" onClick={() => onDelete(row)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} align="center">
                                    No records found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination - Only show if we have more than one page */}
            {totalPages > 1 && (
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{ mt: 2, alignSelf: "center" }}
                />
            )}
        </div>
    );
};

export default GridView;