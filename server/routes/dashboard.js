const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

router.get("/count/pengguna", async (req, res) => {
  const [results] = await db.promise().query("SELECT COUNT(*) AS total FROM pengguna");
  res.json(results[0]);
});

router.get("/count/capaian", async (req, res) => {
  const [results] = await db.promise().query("SELECT COUNT(*) AS total FROM capaian");
  res.json(results[0]);
});

router.get("/capaian", async (req, res) => {
  const [results] = await db.promise().query("SELECT * FROM capaian ORDER BY createdAt DESC LIMIT 4");
  res.json(results);
});

module.exports = router;