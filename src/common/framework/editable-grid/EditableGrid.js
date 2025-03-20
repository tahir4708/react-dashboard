import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EditableGrid.css";

const Dropdown = ({ options, value, onChange }) => {
    return (
        <select className="form-control" value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">Select</option>
            {options.map((option) => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
        </select>
    );
};

const EditableGrid = ({ initialData, columns, onSave, maxHeight = "400px" }) => {
    const [items, setItems] = useState(initialData);
    const [nextId, setNextId] = useState(initialData.length + 1);

    const handleAddRow = () => {
        const newItem = columns.reduce((acc, column) => {
            acc[column.key] = column.defaultValue || "";
            return acc;
        }, { id: nextId });

        setItems([...items, newItem]);
        setNextId(nextId + 1);
    };

    const handleDelete = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const handleChange = (id, field, value) => {
        const updatedItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setItems(updatedItems);
    };

    return (
        <div className="editable-grid-container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-primary">Editable Grid</h4>
                <button className="btn btn-success" onClick={handleAddRow}>
                    <i className="bi bi-plus-lg"></i> Add Row
                </button>
            </div>

            {/* Scrollable Table Container */}
            <div className="table-container" style={{ maxHeight, overflowY: "auto" }}>
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} className={`text-center ${column.align || ""}`}>
                                {column.label}
                            </th>
                        ))}
                        <th className="text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            {columns.map((column) => (
                                <td key={column.key} className={`${column.align || ""}`}>
                                    {column.render ? (
                                        column.render(item, (value) => handleChange(item.id, column.key, value))
                                    ) : column.type === "dropdown" ? (
                                        <Dropdown
                                            options={column.options}
                                            value={item[column.key]}
                                            onChange={(val) => handleChange(item.id, column.key, val)}
                                        />
                                    ) : column.type === "checkbox" ? (
                                        <input
                                            type="checkbox"
                                            checked={Boolean(item[column.key])}
                                            onChange={(e) => handleChange(item.id, column.key, e.target.checked)}
                                        />
                                    ) : column.type === "radio" ? (
                                        <input
                                            type="radio"
                                            name={column.key}
                                            checked={Boolean(item[column.key])}
                                            onChange={(e) => handleChange(item.id, column.key, e.target.checked)}
                                        />
                                    ) : (
                                        <input
                                            type={column.type || "text"}
                                            value={item[column.key]}
                                            onChange={(e) => handleChange(item.id, column.key, e.target.value)}
                                            className="form-control"
                                        />
                                    )}
                                </td>
                            ))}
                            <td className="text-center">
                                <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">
                                    <i className="bi bi-trash"></i> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="text-end mt-2">
                <button onClick={() => onSave(items)} className="btn btn-primary">
                    <i className="bi bi-save"></i> Save
                </button>
            </div>
        </div>
    );
};

export default EditableGrid;