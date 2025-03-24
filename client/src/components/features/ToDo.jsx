import { Trash2 } from "lucide-react";
import { useModal } from "../../context/ModalContext.jsx";

export const Todo = ({
  id,
  title,
  description,
  completed,
  onRemoveTodo,
  onToggleComplete,
}) => {
  const handleChangeCheckbox = (event) => {
    onToggleComplete({
      id,
      completed: event.target.checked,
    });
  };
  const { openModal } = useModal();
  return (
    <div className="flex items-center justify-between gap-2 p-1">
      <div className="flex items-center gap-2">
        <input
          className="me-2 checkbox"
          checked={completed}
          type="checkbox"
          onChange={handleChangeCheckbox}
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
          onRemoveTodo({ id });
        }}
      >
        <Trash2 />
      </button>
    </div>
  );
};
