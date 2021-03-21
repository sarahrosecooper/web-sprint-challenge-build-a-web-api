// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("../projects/projects-model.js");
const MW = require("../middleware/middleware.js");

// Both Projects and Actions have an optional completed property (see Database Schemas below). In both cases it's a boolean stored in the database as a 1 or a 0. Make sure to transform the raw completed values obtained from the db to true or false, before sending them back to the client.

// Inside api/projects/projects-router.js build endpoints for performing CRUD operations on projects:

// [GET] /api/projects returns an array of projects (or an empty array) as the body of the response.

router.get("/", async (req, res, next) => {
  try {
    const project = await Projects.get();
    res.status(200).json(project);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

// [GET] /api/projects/:id returns a project with the given id as the body of the response.

router.get("/:id", MW.validateProjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Projects.get(id);
    res.status(200).json(project);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

// [POST] /api/projects returns the newly created project as the body of the response.

router.post("/", MW.validateProjectBody, async (req, res, next) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(201).json(project);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

// [PUT] /api/projects/:id returns the updated project as the body of the response.

router.put(
  "/:id",
  MW.validateProjectId,
  MW.validateProjectBody,
  async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    try {
      const updatedProj = await Projects.update(id, changes);
      res.status(202).json(updatedProj);
    } catch (err) {
      next({ error: err, message: err.message, status: 500 });
    }
  }
);

// [DELETE] /api/projects/:id returns no response body.

router.delete("/:id", MW.validateProjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProj = await Projects.remove(id);
    res.status(204).json(deletedProj);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

//  Inside api/projects/projects-router.js add an endpoint for retrieving the list of actions for a project:

// [GET] /api/projects/:id/actions sends an array of actions (or an empty array) as the body of the response.

router.get("/:id/actions", MW.validateProjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const projActions = await Projects.getProjectActions(id);
    res.status(200).json(projActions);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

module.exports = router;
