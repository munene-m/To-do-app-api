const express = require("express")
const router = express.Router()
const { getAllTasks, newTask, singleTask, updateTask, deleteTask } = require("../controllers/taskController")
router.route("/").get(getAllTasks)
router.route("/create").post(newTask)
router.route("/task/:id").get(singleTask)
router.route("update/:id").put(updateTask)
router.route("delete/:id").delete(deleteTask)

module.exports = router