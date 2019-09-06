const express = require("express");
const router = express.Router();
const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");

//! CREATE
//* Create an action for a project by id
router.post("/:id", validateProjectId, validateAction, (req, res) => {
  try {
    actions.insert(req.body).then(response => {
      res.status(201).json(response);
    });
  } catch (err) {
    res.status(500).json({
      Error: "Internal server error while trying to create the project's action"
    });
  }
});
//! READ
//* Read all project's actions by id
router.get("/:id", validateProjectId, (req, res) => {
  try {
    projects.getProjectActions(req.project.id).then(response => {
      res.status(200).json(response);
    });
  } catch (err) {
    res.status(500).json({
      Error:
        "Internal server error while trying to request the project's actions"
    });
  }
});
//* Read project's action by action id
router.get("/:id/:action_id", validateProjectId, (req, res) => {
  try {
    actions.get(req.params.action_id).then(response => {
      res.status(200).json(response);
    });
  } catch (err) {
    res.status(500).json({
      Error: "Internal server error while trying to request the action"
    });
  }
});
//! UPDATE
//* Update an action by action's id
router.put("/:id", validateAction, (req, res) => {
  try {
    actions.update(req.params.id, req.body).then(response => {
      res.status(201).json(response);
    });
  } catch (err) {
    res.status(500).json({
      Error: "Internal server error while trying to create the project's action"
    });
  }
});
//! DELETE
//* Delete project by id
router.delete("/:id", (req, res) => {
  try {
    actions.remove(req.params.id).then(() => {
      res
        .status(200)
        .json(`Successfully deleted action with the id of ${req.params.id}`);
    });
  } catch (err) {
    res.status(500).json({
      Error: "Internal server error while trying to delete the project"
    });
  }
});
//!

//! MIDDLEWARE
function validateAction(req, res, next) {
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
