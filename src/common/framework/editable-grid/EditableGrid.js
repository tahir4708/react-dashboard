import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Dropdown = ({ options, value, onChange }) => {
  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel>Select</InputLabel>
      <Select value={value} onChange={(e) => onChange(e.target.value)} label="Select">
        <MenuItem value="">
          <em>Select</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
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
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h5" color="primary">
          Editable Grid
        </Typography>
        <Button variant="contained" color="success" onClick={handleAddRow} startIcon={<AddIcon />}>
          Add Row
        </Button>
      </Box>

      {/* Scrollable Table Container */}
      <TableContainer component={Paper} sx={{ maxHeight, overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key} align={column.align || "left"}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell key={column.key} align={column.align || "left"}>
                    {column.render ? (
                      column.render(item, (value) => handleChange(item.id, column.key, value))
                    ) : column.type === "dropdown" ? (
                      <Dropdown
                        options={column.options}
                        value={item[column.key]}
                        onChange={(val) => handleChange(item.id, column.key, val)}
                      />
                    ) : column.type === "checkbox" ? (
                      <Checkbox
                        checked={Boolean(item[column.key])}
                        onChange={(e) => handleChange(item.id, column.key, e.target.checked)}
                      />
                    ) : column.type === "radio" ? (
                      <Checkbox
                        checked={Boolean(item[column.key])}
                        onChange={(e) => handleChange(item.id, column.key, e.target.checked)}
                        color="primary"
                      />
                    ) : (
                      <TextField
                        type={column.type || "text"}
                        value={item[column.key]}
                        onChange={(e) => handleChange(item.id, column.key, e.target.value)}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    )}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(item.id)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSave(items)}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditableGrid;