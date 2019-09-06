const express = require("express");
const router = express.Router();
const projects = require("../data/helpers/projectModel");

//! CREATE
//* Create a project
router.post("/", validateProject, (req, res) => {
  try {
    projects.insert(req.body).then(response => {
      res.status(201).json(response);
    });
  } catch (err) {
    res.status(500).json({
      Error: "Internal server error while trying to create a project"
    });
  }
});
//! READ
//* Read all projects
router.get("/", (req, res) => {
  try {
    projects.get().then(response => {
      res.status(200).json(response);
    });
  } catch (err) {
    res.status(500).json({
      Error: `Internal server error while trying to request project ${rep.params.id}`
    });
  }
});
//* Read project by id
router.get("/:id", validateProjectId, (req, res) => {
  try {
    projects.get(req.project.id).then(response => {
      res.status(200).json(response);
    });
  } catch (err) {
    res.status(500).json({
      Error: "Internal server error while trying to request the project"
    });
  }
});
//! UPDATE
//* Update project by id
router.put("/:id", validateProjectId, validateProject, (req, res) => {
  try {
    projects.update(req.project.id, req.body).then(() => {
      projects.get(req.project.id).then(response => {
        res.status(200).json(response);
      });
    });
  } catch (err) {
    res.status(500).json({
      Error: "Internal server error while trying to update the project"
    });
  }
});
//! DELETE
//* Delete project by id
router.delete("/:id", validateProjectId, (req, res) => {
  try {
    projects.remove(req.project.id).then(() => {
      res
        .status(200)
        .json(`Successfully deleted project with the id of ${req.project.id}`);
    });
  } catch (err) {
    res.status(500).json({
      Error: "Internal server error while trying to delete the project"
    });
  }
});
//!

//! MIDDLEWARE
function validateProject(req, res, next) {
  !req.body
    ? res.status(404).json({ message: "missing project keys" })
    : !req.body.name && !req.body.description
    ? res.status(404).json({ message: "missing project values" })
    : next();
}

function validateProjectId(req, res, next) {
  projects.get(req.params.id).then(response => {
    !response
      ? res.status(404).json({ message: "invalid project id" })
      : (req.project = response);
    next();
  });
}

module.exports = router;
