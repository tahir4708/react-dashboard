import React, { useState } from "react";
import GridView from "../../common/framework/grid-view/GridView";


const Sales = () => {
    const [data, setData] = useState([
        { id: 1, name: "John Doe", age: 28, email: "john@example.com" },
        { id: 2, name: "Jane Smith", age: 34, email: "jane@example.com" },
        // Add more data here
    ]);

    const [totalRecords, setTotalRecords] = useState(100); // Total records from the server
    const [currentPage, setCurrentPage] = useState(1);

    const columns = [
        { key: "id", title: "ID", filterable: false, width: "100px" }, // Fixed width for ID column
        { key: "name", title: "Name", filterable: true, width: "200px" }, // Fixed width for Name column
        { key: "age", title: "Age", filterable: true, width: "100px" }, // Fixed width for Age column
        { key: "email", title: "Email", filterable: true }, // Auto width for Email column
    ];

    const handlePageChange = (page, pageSize) => {
        // Fetch data from the server for the new page
        console.log("Page changed to:", page);
        setCurrentPage(page);
    };

    const handleSearch = (term) => {
        // Perform server-side search
        console.log("Search term:", term);
    };

    const handleFilter = (filters) => {
        // Perform server-side filtering
        console.log("Filters:", filters);
    };

    const handleEdit = (row) => {
        console.log("Edit row:", row);
    };

    const handleDelete = (row) => {
        console.log("Delete row:", row);
    };

    return (
        <div className="container mt-4">
            <GridView
                columns={columns}
                data={data}
                totalRecords={totalRecords}
                onPageChange={handlePageChange}
                onSearch={handleSearch}
                onFilter={handleFilter}
                onEdit={handleEdit}
                onDelete={handleDelete}
                tableWidth="1200px" // Custom table width
                tableHeight="400px" // Custom table height
            />
        </div>
    );
};

export default Sales;