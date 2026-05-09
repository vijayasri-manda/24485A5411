const express = require("express");
const cors = require("cors");
const axios = require("axios");

const logger = require("../logging_middleware/logger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

const API =
"http://4.224.186.213/evaluation-service/notifications";

app.get("/notifications", async (req, res) => {
    try {
        const response = await axios.get(API, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyNDQ4NWE1NDExQGdlY2d1ZGxhdmFsbGVydW1pYy5pbiIsImV4cCI6MTc3ODMwNjE2MiwiaWF0IjoxNzc4MzA1MjYyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiODAyYzU5YjQtZmEwZi00NzhlLWEzYjEtMmQ5MDQ1MGU5YjgyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWFuZGEgdmlqYXlhIHNyaSIsInN1YiI6IjNiY2MwZTM5LTQ0N2UtNDRmNy04NDBmLTFjMWEyNzA1NjlkNiJ9LCJlbWFpbCI6IjI0NDg1YTU0MTFAZ2VjZ3VkbGF2YWxsZXJ1bWljLmluIiwibmFtZSI6Im1hbmRhIHZpamF5YSBzcmkiLCJyb2xsTm8iOiIyNDQ4NWE1NDExIiwiYWNjZXNzQ29kZSI6ImVKZEN1QyIsImNsaWVudElEIjoiM2JjYzBlMzktNDQ3ZS00NGY3LTg0MGYtMWMxYTI3MDU2OWQ2IiwiY2xpZW50U2VjcmV0IjoiVUhhYk1XZEZXZGFqZXhhdSJ9.PZRRY7gLQE-HFRIkMSZBV0VGbGGSHqjsoHHZKXEGaZw`,
            },
        });

        let notifications = response.data.notifications;

        const { type, page = 1, limit = 10 } = req.query;

        // filter
        if (type) {
            notifications = notifications.filter(
                (n) => n.Type === type
            );
        }

        // sort latest first
        notifications.sort(
            (a, b) =>
                new Date(b.Timestamp) - new Date(a.Timestamp)
        );

        // pagination
        const start = (page - 1) * limit;
        const end = start + Number(limit);

        const paginated = notifications.slice(start, end);

        res.json({
            total: notifications.length,
            page,
            limit,
            notifications: paginated,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching notifications",
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});