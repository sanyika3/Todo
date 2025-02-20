import { Draggable } from "@hello-pangea/dnd";
import PropTypes from "prop-types";

const TaskItem = ({ task, index, deleteTask }) => (
  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
    {(provided) => (
      <div 
        className="Todo"
        ref={provided.innerRef} 
        {...provided.draggableProps} 
        {...provided.dragHandleProps}
      >
        <span className="CurrentTodo">{task.description}</span>
        <button
          className="deleteButton"
          onClick={() => deleteTask(task.id)}
        >
          ❌
        </button>
      </div>
    )}
  </Draggable>
);

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskItem;
