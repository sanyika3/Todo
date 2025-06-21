import axios from "axios";

const BASE_URL = "https://todo-backend-j563.onrender.com";

export const getTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/allTasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${BASE_URL}/deleteTask/${taskId}`, {
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
