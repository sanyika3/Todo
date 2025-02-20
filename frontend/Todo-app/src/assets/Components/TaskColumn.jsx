import { Droppable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";
import PropTypes from "prop-types";

const TaskColumn = ({ title, tasks, id, deleteTask }) => (
  <Droppable droppableId={id}>
    {(provided) => (
      <div className="Column" id={id} ref={provided.innerRef} {...provided.droppableProps}>
        <span className="titleBlock">{title}</span>
        <hr />
        {tasks.map((task, index) => (
          <TaskItem key={task.id} task={task} index={index} deleteTask={deleteTask} />
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

TaskColumn.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskColumn;
