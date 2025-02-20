/*import "./Todo.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";

function Todo() {
  const [tasks, setTasks] = useState({ Not_Started: [], In_Progress: [], Done: [] });

  useEffect(() => {
    const savedTasks = localStorage.getItem("kanbanTasks");

    const loadTasks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/allTasks");
        const serverTasks = response.data;

        let mergedTasks = savedTasks ? JSON.parse(savedTasks) : { Not_Started: [], In_Progress: [], Done: [] };
        const existingTaskIds = new Set(Object.values(mergedTasks).flat().map(t => t.id));

        serverTasks.forEach(task => {
          if (!existingTaskIds.has(task.id)) {
            mergedTasks.Not_Started.push(task);
          }
        });

        setTasks(mergedTasks);
        localStorage.setItem("kanbanTasks", JSON.stringify(mergedTasks));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    loadTasks();
  }, []);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    
    const newTasks = { ...tasks };
    const [movedTask] = newTasks[source.droppableId].splice(source.index, 1);
    newTasks[destination.droppableId].splice(destination.index, 0, movedTask);
    
    setTasks(newTasks);
    localStorage.setItem("kanbanTasks", JSON.stringify(newTasks));
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`http://127.0.0.1:8000/deleteTask/${taskId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          "X-CSRFToken": document.cookie.match(/csrftoken=([^;]+)/)[1],  // Ezt a függvényt meg kell írnod
      },
      credentials: 'include'
      });
  
      const newTasks = { ...tasks };
      for (let status in newTasks) {
        newTasks[status] = newTasks[status].filter(task => task.id !== taskId);
      }
  
      setTasks(newTasks);
      localStorage.setItem("kanbanTasks", JSON.stringify(newTasks));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="KanbanBoard">
        {Object.keys(tasks).map((status) => (
          <TaskColumn key={status} title={status} tasks={tasks[status]} id={status} deleteTask={deleteTask} />
        ))}
      </div>
    </DragDropContext>
  );
}
export default Todo;*/

import "./Todo.css";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";
import { useTasks } from "./useTasks";
import { deleteTask as apiDeleteTask } from "./TaskService";

function Todo() {
  const { tasks, setTasks } = useTasks();

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const newTasks = { ...tasks };
    const [movedTask] = newTasks[source.droppableId].splice(source.index, 1);
    newTasks[destination.droppableId].splice(destination.index, 0, movedTask);

    setTasks(newTasks);
    localStorage.setItem("kanbanTasks", JSON.stringify(newTasks));
  };

  const deleteTask = async (taskId) => {
    await apiDeleteTask(taskId);

    const newTasks = { ...tasks };
    for (let status in newTasks) {
      newTasks[status] = newTasks[status].filter((task) => task.id !== taskId);
    }

    setTasks(newTasks);
    localStorage.setItem("kanbanTasks", JSON.stringify(newTasks));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="KanbanBoard">
        {Object.keys(tasks).map((status) => (
          <TaskColumn key={status} title={status} tasks={tasks[status]} id={status} deleteTask={deleteTask} />
        ))}
      </div>
    </DragDropContext>
  );
}

export default Todo;


