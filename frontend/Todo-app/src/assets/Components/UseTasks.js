import { useState, useEffect } from "react";
import { getTasks } from "./TaskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState({ Not_Started: [], In_Progress: [], Done: [] });

  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = localStorage.getItem("kanbanTasks");
      let mergedTasks = savedTasks ? JSON.parse(savedTasks) : { Not_Started: [], In_Progress: [], Done: [] };

      const serverTasks = await getTasks();
      const existingTaskIds = new Set(Object.values(mergedTasks).flat().map((t) => t.id));

      serverTasks.forEach((task) => {
        if (!existingTaskIds.has(task.id)) {
          mergedTasks.Not_Started.push(task);
        }
      });

      setTasks(mergedTasks);
      localStorage.setItem("kanbanTasks", JSON.stringify(mergedTasks));
    };

    loadTasks();
  }, []);

  return { tasks, setTasks };
};
