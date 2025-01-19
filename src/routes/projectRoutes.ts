import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import Task from "../models/Task";
import { taskBelongsToProject, taskExists } from "../middleware/task";

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
router.param("projectId", projectExists);

router.post(
  "/:projectId/tasks",
  param("projectId").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TaskController.createTask
);

router.get(
  "/:projectId/tasks",
  param("projectId").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TaskController.getProjectTasks
);

router.param('taskId', taskExists);
router.param('taskId', taskBelongsToProject);

router.get(
  "/:projectId/tasks/:taskId",
  param("projectId").isMongoId().withMessage("ID del proyecto no valido"),
  param("taskId").isMongoId().withMessage("ID de la tarea no valido"),
  handleInputErrors,
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  param("projectId").isMongoId().withMessage("ID del proyecto no valido"),
  param("taskId").isMongoId().withMessage("ID de la tarea no valido"),
  body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio."),
  body("description")
    .notEmpty()
    .withMessage("La descripcion de la tarea es obligatoria"),
  handleInputErrors,
  TaskController.updateTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  param("projectId").isMongoId().withMessage("ID del proyecto no valido"),
  param("taskId").isMongoId().withMessage("ID de la tarea no valido"),
  handleInputErrors,
  TaskController.deleteTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("projectId").isMongoId().withMessage("ID del proyecto no valido"),
  param("taskId").isMongoId().withMessage("ID de la tarea no valido"),
  body("status").notEmpty().withMessage("El estado es obligatorio."),
  handleInputErrors,
  TaskController.updateStatus
);

export default router;
