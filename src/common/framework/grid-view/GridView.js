import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GridView.css"; // Custom CSS for additional styling

const GridView = ({
                      columns,
                      data,
                      totalRecords,
                      onPageChange,
                      onSearch,
                      onFilter,
                      onEdit,
                      onDelete,
                      tableWidth = "100%", // Default table width
                      tableHeight = "500px", // Default table height
                  }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({});

    // Handle page change
    const handlePageChange = (page) => {
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
        <div className="grid-view-container">
            {/* Search Input */}
            <div className="search-container mb-3">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control"
                />
            </div>

            {/* Table with Horizontal and Vertical Scrolling */}
            <div
                className="table-responsive"
                style={{ maxHeight: tableHeight, overflow: "auto" }}
            >
                <table
                    className="table table-bordered table-striped"
                    style={{ width: tableWidth }}
                >
                    <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                style={{ width: column.width || "auto" }} // Set column width
                            >
                                <div>{column.title}</div>
                                {column.filterable && (
                                    <input
                                        type="text"
                                        placeholder={`Filter ${column.title}`}
                                        onChange={(e) =>
                                            handleFilterChange(column.key, e.target.value)
                                        }
                                        className="form-control form-control-sm"
                                    />
                                )}
                            </th>
                        ))}
                        <th style={{ width: "120px" }}>Actions</th> {/* Fixed width for Actions column */}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => (
                                <td key={column.key} style={{ width: column.width || "auto" }}>
                                    {row[column.key]}
                                </td>
                            ))}
                            <td>
                                <button
                                    className="btn btn-sm btn-primary me-2"
                                    onClick={() => onEdit(row)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => onDelete(row)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="pagination-container d-flex justify-content-between align-items-center mt-3">
                <div>
          <span>
            Page {currentPage} of {totalPages}
          </span>
                </div>
                <div>
                    <button
                        className="btn btn-sm btn-secondary me-2"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-sm btn-secondary"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GridView;