// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Actions = require("../actions/actions-model.js");
const MW = require("../middleware/middleware.js");
// Both Projects and Actions have an optional completed property (see Database Schemas below). In both cases it's a boolean stored in the database as a 1 or a 0. Make sure to transform the raw completed values obtained from the db to true or false, before sending them back to the client.

// When adding an action, make sure the project_id provided belongs to an existing project.

// If you try to add an action with an id of 3 and there is no project with that id the database will return an error.

// Inside api/actions/actions-router.js build endpoints for performing CRUD operations on actions:

// [GET] /api/actions returns an array of actions (or an empty array) as the body of the response.

router.get("/", async (req, res, next) => {
  try {
    const action = await Actions.get();
    res.status(200).json(action);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

// [GET] /api/actions/:id returns an action with the given id as the body of the response.

router.get("/:id", MW.validateActionId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await Actions.get(id);
    res.status(200).json(action);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});
// [POST] /api/actions returns the newly created action as the body of the response.

router.post("/", MW.validateActionBody, async (req, res, next) => {
  try {
    const newAction = await Actions.insert(req.body);
    res.status(20).json(newAction);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});
// [PUT] /api/actions/:id returns the updated action as the body of the response.

router.put(
  "/:id",
  MW.validateActionId,
  MW.validateActionBody,
  async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    try {
      const updatedAction = await Actions.update(id, changes);
      res.status(200).json(updatedAction);
    } catch (err) {
      next({ error: err, message: err.message, status: 500 });
    }
  }
);
// [DELETE] /api/actions/:id returns no response body

router.delete("/:id", MW.validateActionId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await Actions.remove(id);
    res.status(204).json(action);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

module.exports = router;
