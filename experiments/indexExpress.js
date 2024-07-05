const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

// GET endpoint to retrieve students
app.get("/students", (req, res) => {
    const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    res.json(data.students);
});

// GET endpoint to retrieve teachers
app.get("/teachers", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error reading data");
        } else {
            const parsedData = JSON.parse(data);
            res.json(parsedData.teachers);
        }
    });
});

// POST endpoint to add a student
app.post("/students", (req, res) => {
    const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    data.students.push(req.body);
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
    res.status(201).send("Student added successfully");
});

// DELETE endpoint to remove a student by ID
app.delete("/students/:name", (req, res) => {
    const studentId = req.params.name;
    const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    const filteredStudents = data.students.filter(student => student.name !== studentId);
    
    if (filteredStudents.length === data.students.length) {
        return res.status(404).send("Student not found");
    }

    data.students = filteredStudents;
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
    res.send("Student deleted successfully");
});

app.listen(4500, () => {
    console.log("Server running on port 4500");
});
