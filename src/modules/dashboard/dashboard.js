import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
    // Dummy Data
    const barData = [
        { name: "Jan", sales: 4000, orders: 2400 },
        { name: "Feb", sales: 3000, orders: 2210 },
        { name: "Mar", sales: 5000, orders: 2290 },
        { name: "Apr", sales: 2780, orders: 2000 },
        { name: "May", sales: 1890, orders: 2181 },
    ];

    const lineData = [
        { name: "Mon", visitors: 100, conversions: 30 },
        { name: "Tue", visitors: 200, conversions: 50 },
        { name: "Wed", visitors: 150, conversions: 40 },
        { name: "Thu", visitors: 220, conversions: 70 },
        { name: "Fri", visitors: 300, conversions: 100 },
    ];

    const pieData = [
        { name: "Desktop", value: 45 },
        { name: "Mobile", value: 35 },
        { name: "Tablet", value: 20 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary">Dashboard</h2>

            {/* Top Row - Stats Cards */}
            <div className="row my-4">
                <div className="col-md-4">
                    <div className="card shadow p-3 text-center">
                        <h5>Total Sales</h5>
                        <h3 className="text-success">$15,000</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow p-3 text-center">
                        <h5>New Orders</h5>
                        <h3 className="text-danger">120</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow p-3 text-center">
                        <h5>Active Users</h5>
                        <h3 className="text-primary">3,250</h3>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="row">
                {/* Bar Chart */}
                <div className="col-md-6">
                    <div className="card p-3 shadow">
                        <h5 className="text-center">Sales & Orders</h5>
                        <BarChart width={400} height={300} data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#8884d8" />
                            <Bar dataKey="orders" fill="#82ca9d" />
                        </BarChart>
                    </div>
                </div>

                {/* Line Chart */}
                <div className="col-md-6">
                    <div className="card p-3 shadow">
                        <h5 className="text-center">Website Visitors</h5>
                        <LineChart width={400} height={300} data={lineData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
                            <Line type="monotone" dataKey="conversions" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="row mt-4">
                <div className="col-md-6 offset-md-3">
                    <div className="card p-3 shadow text-center">
                        <h5>Device Usage</h5>
                        <PieChart width={300} height={300}>
                            <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
