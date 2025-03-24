import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

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
    { label: "Desktop", value: 45 },
    { label: "Mobile", value: 35 },
    { label: "Tablet", value: 20 },
];

const StatCard = ({ title, value, color }) => (
    <Card sx={{ textAlign: "center", p: 3, boxShadow: 5, borderRadius: 2, backgroundColor: "#FFFFFFFF", color: "white" }}>
        <CardContent>
            <Typography variant="h6" sx={{ color: "#b0bec5" }}>
                {title}
            </Typography>
            <Typography variant="h4" sx={{ color }}>{value}</Typography>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    return (
        <Box sx={{ p: 4, minHeight: "100vh" }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: "#64b5f6", fontWeight: "bold" }}>
                Dashboard
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={4}>
                    <StatCard title="Total Sales" value="$15,000" color="#4caf50" />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="New Orders" value="120" color="#f44336" />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="Active Users" value="3,250" color="#2196f3" />
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3} sx={{ mt: 4 }}>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 3, boxShadow: 5, borderRadius: 2, backgroundColor: "#FFFFFFFF" }}>
                        <Typography variant="h6" align="center" sx={{ color: "#b0bec5" }}>Sales & Orders</Typography>
                        <BarChart
                            dataset={barData}
                            xAxis={[{ scaleType: "band", dataKey: "name" }]}
                            series={[{ dataKey: "sales", label: "Sales" }, { dataKey: "orders", label: "Orders" }]}
                            width={400}
                            height={300}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 3, boxShadow: 5, borderRadius: 2, backgroundColor: "#FFFFFFFF" }}>
                        <Typography variant="h6" align="center" sx={{ color: "#b0bec5" }}>Website Visitors</Typography>
                        <LineChart
                            dataset={lineData}
                            xAxis={[{ scaleType: "band", dataKey: "name" }]}
                            series={[{ dataKey: "visitors", label: "Visitors" }, { dataKey: "conversions", label: "Conversions" }]}
                            width={400}
                            height={300}
                        />
                    </Card>
                </Grid>
            </Grid>

            {/* Pie Chart */}
            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 3, boxShadow: 5, borderRadius: 2, backgroundColor: "#FFFFFFFF", textAlign: "center" }}>
                        <Typography variant="h6" sx={{ color: "#b0bec5" }}>Device Usage</Typography>
                        <PieChart series={[{ data: pieData, innerRadius: 50 }]} width={300} height={300} />
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;