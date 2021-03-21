const Actions = require("../actions/actions-model.js");
const Projects = require("../projects/projects-model.js");

async function validateActionId(req, res, next) {
  const { id } = req.params;
  const user = await Actions.get(id);
  try {
    if (action) {
      req.action = action;
      next();
    } else {
      next({
        message: `user(${id}) not found`,
        status: 404,
      });
    }
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
}

function validateActionBody(req, res, next) {
  const body = req.body;
  try {
    if (body && Object.keys(body).length === 0) {
      next({
        message: "missing actions data: project_id, description and notes",
        status: 400,
      });
    } else if (!body.project_id) {
      next({ message: "missing required project id", status: 400 });
    } else if (!body.description) {
      next({ message: "missing required description", status: 400 });
    } else if (!body.notes) {
      next({ message: "missing required action notes", status: 400 });
    } else {
      next();
    }
  } catch (err) {
    next({ message: err.message, status: 500 });
  }
}

async function validateProjectId(req, res, next) {
  const { id } = req.params;
  try {
    const project = await Projects.get(id);
    if (project) {
      req.project = project;
      next();
    } else {
      next({ message: `${id} is not a valid id.`, status: 404 });
    }
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
}

function validateProjectBody(req, res, next) {
  const body = req.body;
  try {
    if (body && Object.keys(body).length === 0) {
      next({
        message: "missing required project info: name and description",
        status: 400,
      });
    } else if (!body.name) {
      next({ message: "missing required project name", status: 400 });
    } else if (!body.description) {
      next({ message: "missing required project description", status: 400 });
    } else {
      next();
    }
  } catch (err) {
    next({ message: err.message, status: 500 });
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  validateActionId: validateActionId,
  validateActionBody: validateActionBody,
  validateProjectId: validateProjectId,
  validateProjectBody: validateProjectBody,
};
