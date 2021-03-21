// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("../projects/projects-model.js");
const MW = require("../middleware/middleware.js");

// Both Projects and Actions have an optional completed property (see Database Schemas below). In both cases it's a boolean stored in the database as a 1 or a 0. Make sure to transform the raw completed values obtained from the db to true or false, before sending them back to the client.

// Inside api/projects/projects-router.js build endpoints for performing CRUD operations on projects:

// [GET] /api/projects returns an array of projects (or an empty array) as the body of the response.
// [GET] /api/projects/:id returns a project with the given id as the body of the response.
// [POST] /api/projects returns the newly created project as the body of the response.
// [PUT] /api/projects/:id returns the updated project as the body of the response.
// [DELETE] /api/projects/:id returns no response body.
//  Inside api/projects/projects-router.js add an endpoint for retrieving the list of actions for a project:

// [GET] /api/projects/:id/actions sends an array of actions (or an empty array) as the body of the response.
module.exports = router;
