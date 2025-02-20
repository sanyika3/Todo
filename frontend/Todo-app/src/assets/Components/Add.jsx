import { useState } from "react";
import axios from "axios";
import "./Add.css";

function Add() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/addTasks",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": document.cookie.match(/csrftoken=([^;]+)/)[1],
          },
        }
      );

      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      alert("Error:" + error.message);
    }
  };

  return (
    <div className="addContainer">
      <div className="Add">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
          <span className="name">Title:</span>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <br />
          </label>
          <label htmlFor="description">
          <span className="name">Description:</span>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <br />
          </label>
          <label htmlFor="status">
            <span className="name">Status:</span>
            <input
              type="number"
              name="status"
              id="status"
              min="2"
              max="4"
              value={formData.status}
              onChange={handleChange}
              required
            />
            <br />
          </label>
          <label htmlFor="priority">
          <span className="name">Priority:</span>
            <input
              type="number"
              name="priority"
              id="priority"
              min="1"
              max="3"
              value={formData.priority}
              onChange={handleChange}
              required
            />
            <br />
          </label>
          <br />
          <button className="btnAdd" type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
