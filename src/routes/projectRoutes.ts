import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

const router = Router();

// Crear Proyecto
router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio."),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio."),
  body("description")
    .notEmpty()
    .withMessage("La descripcion del proyecto es obligatoria"),
  handleInputErrors,
  ProjectController.createProject
);

// Obtener todos los proyectos
router.get("/", ProjectController.getAllProjects);

// Obtener proyecto por ID
router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  ProjectController.getProjectById
);

// Actualizar proyecto por ID
router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio."),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio."),
  body("description")
    .notEmpty()
    .withMessage("La descripcion del proyecto es obligatoria"),
  handleInputErrors,
  ProjectController.updateProject
);

// Eliminar proyecto por ID
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  ProjectController.deleteProject
);

// Routes for TASKS
router.post(
  "/:projectId/tasks",
  param("projectId").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  validateProjectExists,
  TaskController.createTask
);

export default router;
