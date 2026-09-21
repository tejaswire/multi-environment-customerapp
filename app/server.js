const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.NODE_ENV || "DEV";
const DB_HOST = process.env.DB_HOST || "customer-db";

const customers = [
    { id: 1, name: "Tejaswi" },
    { id: 2, name: "Rahul" },
    { id: 3, name:  "Anita" }
];

app.get("/", (req, res) => {
    res.json({
        application: "Customer Application",
        environment: ENVIRONMENT,
        version: "1.0.0"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        environment: ENVIRONMENT
    });
});

app.get("/customers/search", (req, res) => {

    const name = (req.query.name || "").toLowerCase();

    const result = customers.filter(customer =>
        customer.name.toLowerCase().includes(name)

    );

    res.json({
        environment: ENVIRONMENT,
        database: DB_HOST,
        customers: result
        
    });
});

app.listen(PORT, () => {
    console.log(`Customer application running on port ${PORT}`);
});