const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/test", (req, res) => {
  res.send("Backend working on port 3001 🚀");
});

// DB test route
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Add franchise API route

app.post("/franchise", async (req, res) => {
  try {
    const { franchise_name, address } = req.body;

    const result = await pool.query(
      `INSERT INTO public.franchise (franchise_name, address)
       VALUES ($1, $2)
       RETURNING *`,
      [franchise_name, address]
    );

    res.status(201).json({
      message: "Franchise added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
//////////////////////////////////

// ADD INSTITUTE API route
app.post("/institute", async (req, res) => {
  try {
    const {
      franchise_id,
      institute_name,
      institute_type,
      address,
      contact_email,
      contact_phone
    } = req.body;

    const result = await pool.query(
      `INSERT INTO public.institute
       (franchise_id, institute_name, institute_type, address, contact_email, contact_phone)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        franchise_id,
        institute_name,
        institute_type,
        address,
        contact_email,
        contact_phone
      ]
    );

    res.status(201).json({
      message: "Institute added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

/////////////////////////////////

// ADD STUDENT API route
app.post("/student", async (req, res) => {
  try {
    const {
      institute_id,
      roll_no,
      first_name,
      last_name,
      gender,
      date_of_birth,
      email,
      phone,
      class: student_class,
      section
    } = req.body;

    const result = await pool.query(
      `INSERT INTO public.student
       (institute_id, roll_no, first_name, last_name, gender, date_of_birth, email, phone, class, section)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [
        institute_id,
        roll_no,
        first_name,
        last_name,
        gender,
        date_of_birth,
        email,
        phone,
        student_class,
        section
      ]
    );

    res.status(201).json({
      message: "Student added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
/////////////////////////////////


// server start
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
