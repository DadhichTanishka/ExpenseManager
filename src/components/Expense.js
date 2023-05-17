import React, { useState } from "react";
import { registerables } from "chart.js";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "./Expense.css"
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Modal,
} from "@mui/material";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: "", amount: "", date: "" });
  const [editExpense, setEditExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddExpense = () => {
    setExpenses([...expenses, newExpense]);
    setNewExpense({ description: "", amount: "", date: "" });
  };

  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleEditExpense = (index) => {
    setEditExpense(index);
    setIsModalOpen(true);
  };

  const handleSaveEditExpense = () => {
    setExpenses(
      expenses.map((expense, index) => (index === editExpense ? { ...newExpense } : expense))
    );
    setIsModalOpen(false);
    setEditExpense(null);
    setNewExpense({ description: "", amount: "", date: "" });
  };

  const chartData = {
    labels: expenses.map((expense) => expense.description),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div style={{backgroundColor:'beige' ,height:"100vh"}}>
      <Box style={{backgroundColor:"black"}} mb={3} className="heading">
        <Typography style={{backgroundColor:"black"}} variant="h3" className="text-primary">
          Expense Manager
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        className="task_description"
      >
        <Box style={{display:"flex",flexDirection:"column"}} className="task_fields">
          <TextField
            name="description"
            label="Description"
            value={newExpense.description}
            onChange={handleInputChange}
          />
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={newExpense.amount}
            onChange={handleInputChange}
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            value={newExpense.date}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button style={{backgroundColor:"black"}} variant="contained" onClick={handleAddExpense} className="button-primary">
            Add
          </Button>
        </Box>
        <Box width="20%">
          <Pie data={chartData} />
        </Box>
      </Box>
      <Box mt={3} className="table_div">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell className="text-secondary">Description</TableCell>
                <TableCell className="text-secondary">Amount</TableCell>
                <TableCell className="text-secondary">Date</TableCell>
                <TableCell align="left" className="text-secondary">
                  Action
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditExpense(index)} className="button-secondary">
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteExpense(index)} className="button-secondary">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          <Typography variant="h5" className="modal-title">
            Edit Expense
          </Typography>
          <TextField
            name="description"
            label="Description"
            value={newExpense.description}
            onChange={handleInputChange}
            className="modal-field"
          />
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={newExpense.amount}
            onChange={handleInputChange}
            className="modal-field"
          />
          <TextField
            name="date"
           
            type="date"
            value={newExpense.date}
            onChange={handleInputChange}
            className="modal-field"
          />
          <Button variant="contained" onClick={handleSaveEditExpense} className="modal-save-button">
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
export default ExpenseTracker;
