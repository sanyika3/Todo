import axios from "axios";

//const BASE_URL = "http://127.0.0.1:8000";

export const getTasks = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/allTasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deleteTask/${taskId}`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": document.cookie.match(/csrftoken=([^;]+)/)?.[1] || "",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
