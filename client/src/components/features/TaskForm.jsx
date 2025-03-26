import { Send, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TodoContext } from "../../context/TodoContext.jsx";
import { useAlert } from "../../context/AlertContext.jsx";

function TaskForm({ setFormTask }) {
  const [hasContent, setHasContent] = useState(false);
  const { showAlert } = useAlert();
  const { addTask } = useContext(TodoContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const title = watch("title");
  const description = watch("description");

  useEffect(() => {
    setHasContent(title.trim() !== "" || description.trim() !== "");
  }, [title, description]);

  const onSubmit = async (data) => {
    const newTask = {
      title: data.title,
      description: data.description,
      completed: false,
    };

    const res = await addTask(newTask);

    if (res.success) {
      setFormTask(false);
      reset();
      showAlert("success", "Tarea creada con exito!");
    } else {
      showAlert("error", "Problemas al crear la tarea");
    }
  };

  const handleCancel = () => {
    setFormTask(false);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full gap-4">
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-row gap-2 px-4 rounded-md select-none bg-black/25 backdrop-blur-sm">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            className="w-full bg-transparent border-none outline-none"
            {...register("title", {
              required: "El título es obligatorio",
              minLength: {
                value: 3,
                message: "El título debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 50,
                message: "El título no puede tener más de 50 caracteres",
              },
            })}
          />
        </div>

        <div className="flex flex-row gap-2 px-4 rounded-md select-none bg-black/25 backdrop-blur-sm">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            rows="1"
            maxLength="250"
            className="w-full overflow-hidden bg-transparent border-none outline-none resize-none min-h-6"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            {...register("description", {
              required: "La descripción es obligatoria",
              minLength: {
                value: 10,
                message: "La descripción debe tener al menos 10 caracteres",
              },
              maxLength: {
                value: 250,
                message: "La descripción no puede tener más de 250 caracteres",
              },
            })}
          ></textarea>
        </div>
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <button
        type={hasContent ? "submit" : "button"}
        onClick={hasContent ? undefined : handleCancel}
        className="flex items-center gap-2 px-4 border border-transparent rounded-md select-none bg-black/25 backdrop-blur-sm max-h-16"
      >
        {!hasContent ? <X size={24} /> : <Send size={24} />}
      </button>
    </form>
  );
}

export default TaskForm;
