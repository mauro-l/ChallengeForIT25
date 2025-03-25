import { Trash2 } from "lucide-react";
import { useModal } from "../../context/ModalContext.jsx";
import { useTodo } from "../../context/TodoContext.jsx";
import { useAlert } from "../../context/AlertContext.jsx";

export const Todo = ({ task }) => {
  const { id, title, description, completed } = task;
  const { showAlert } = useAlert();
  const { removeTask, toggleComplete, error } = useTodo();

  const handleToggleComplete = async (event) => {
    const result = await toggleComplete({
      id,
      completed: event.target.checked,
    });

    if (!result.success) {
      showAlert("error", `Error: ${error}`);
    }
  };

  const handleRemove = async ({ id }) => {
    const result = await removeTask(id);

    if (result.success) {
      showAlert("success", result.message);
    } else {
      showAlert("error", `Error: ${error}`);
    }
  };

  const { openModal } = useModal();
  return (
    <div className="flex items-center justify-between gap-2 p-1">
      <div className="flex items-center gap-2">
        <input
          className="me-2 checkbox"
          checked={completed}
          type="checkbox"
          onChange={handleToggleComplete}
        />
        <label>
          <button onClick={() => openModal(id)} className="text-start">
            <p>{title}</p>
            <p className="text-xs opacity-65">{description}</p>
          </button>
        </label>
      </div>
      <button
        onClick={() => {
          handleRemove({ id });
        }}
      >
        <Trash2 />
      </button>
    </div>
  );
};
