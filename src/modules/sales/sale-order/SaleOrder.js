import React, { useState, useEffect } from "react";
import EditableGrid from "../../../common/framework/editable-grid/EditableGrid";
import Server from "../../../common/services/common/Server";


const App = () => {
    const [columns, setColumns] = useState([
        { key: "product", label: "Product", type: "text" },
        { key: "quantity", label: "Quantity", type: "number", align: "text-right" },
        { key: "price", label: "Price", type: "number", align: "text-right" },
        {
            key: "category",
            label: "Category",
            type: "dropdown",
            options: [] // Initially empty, will be fetched from server
        },
        { key: "isAvailable", label: "Available", type: "checkbox" }
    ]);

    const [initialData, setInitialData] = useState([
        { id: 1, product: "Laptop", quantity: 2, price: 1200, category: "", isAvailable: true },
        { id: 2, product: "Shirt", quantity: 5, price: 25, category: "", isAvailable: false }
    ]);

    // Fetch dropdown options from server
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await Server.get("/categories");

                const categoryOptions = data.map(item => ({
                    key: item.id, // Server-side ID
                    value: item.name // Server-side value
                }));

                // Update columns with fetched dropdown options
                setColumns(prevColumns =>
                    prevColumns.map(col =>
                        col.key === "category" ? { ...col, options: categoryOptions } : col
                    )
                );
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleSave = async (data) => {
        try {
            await Server.post("/save", { data });
            console.log("Data saved successfully");
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    return <EditableGrid initialData={initialData} columns={columns} onSave={handleSave} maxHeight="500px" />;
};

export default App;
