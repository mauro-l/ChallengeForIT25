import React, { useContext, useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext.jsx";
import { Pencil, Undo2 } from "lucide-react";
import { useForm } from "react-hook-form";
import ButtonForm from "../common/ButtonForm.jsx";
import { TodoContext } from "../../context/TodoContext.jsx";
import baseUrl from "../../services/config.js";
import { format } from "date-fns";

function TaskItem() {
  const { isOpen, closeModal, modalData } = useModal();
  const [isViewMode, setIsViewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskDetail, setTaskDetail] = useState();
  /* const [formattedDate, setFormattedDate] = useState(); */
  const { updateTask, error } = useContext(TodoContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchTask = async () => {
      if (!modalData) return;

      setIsViewMode(true);

      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/${modalData}`);

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
        }

        const data = await res.json();

        if (data.status === "success") {
          setTaskDetail(data.payload);
          /* const formateDate = format(new Date(data.payload.createdAt); */
          reset({
            title: data.payload.title,
            description: data.payload.description,
          });
        } else {
          throw new Error(data.message || "Failed to get task");
        }
      } catch (err) {
        console.error(err.message || "An error occurred");
        alert("Error al cargar la tarea. Por favor, inténtalo de nuevo.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [modalData, reset]);

  const onSubmit = async (data) => {
    const newTask = {
      title: data.title,
      description: data.description,
      completed: false,
    };
    const result = await updateTask(modalData, newTask);

    if (result.success) {
      setTaskDetail((prevTaskDetail) => ({
        ...prevTaskDetail,
        ...newTask,
      }));
      closeModal();
      alert(result.message);
    } else {
      alert(`Error: ${error}`);
    }
  };

  const handleEdit = () => {
    setIsViewMode(false);
  };

  const handleCancel = () => {
    reset({ title: taskDetail.title, description: taskDetail.description });
    setIsViewMode(true);
  };

  if (!isOpen) return null;
  return (
    <div className="absolute top-0 z-50 flex items-center mx-2 w-max min-w-[40rem] h-3/4">
      <section className="w-full p-5 mx-auto text-white border-2 bg-gray-700/95 border-white/5 rounded-xl backdrop-blur-sm">
        {isLoading ? (
          <div className="flex items-center justify-center h-40 p-5">
            <p>Cargando tarea...</p>
          </div>
        ) : (
          <article>
            <div className="flex justify-between pb-2 mb-2 border-b border-white/40">
              <h2>Detalle de Tarea</h2>
              <p>
                Fecha de creación:{" "}
                {format(new Date(taskDetail.createdAt), "dd-MM-yyyy")}
              </p>
            </div>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col w-full gap-2">
                <div
                  className={`flex flex-row gap-2 px-4 rounded-md select-none ${
                    isViewMode
                      ? ""
                      : "border-2 border-white/40 bg-black/25 backdrop-blur-sm"
                  } `}
                >
                  <label htmlFor="title"></label>
                  <input
                    type="text"
                    id="title"
                    className={`w-full py-1 ${
                      isViewMode ? "text-2xl" : "text-base"
                    } bg-transparent border-none outline-none`}
                    disabled={isViewMode}
                    {...register("title", {
                      required: "El título es obligatorio",
                      minLength: {
                        value: 3,
                        message: "El título debe tener al menos 3 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message:
                          "El título no puede tener más de 50 caracteres",
                      },
                    })}
                  />
                </div>
                {errors.title && (
                  <span className="text-sm text-red-400">
                    {errors.title.message}
                  </span>
                )}
                <div
                  className={`flex flex-row gap-2 px-4 rounded-md select-none ${
                    isViewMode
                      ? ""
                      : "border-2 border-white/40 bg-black/25 backdrop-blur-sm"
                  } `}
                >
                  <label htmlFor="description"></label>
                  <textarea
                    id="description"
                    rows="4"
                    maxLength="250"
                    className={`overflow-hidden bg-transparent border-none w-full outline-none resize-none text-white/80 min-h-[5.5rem] ${
                      isViewMode ? "" : "text-sm pt-2"
                    }`}
                    disabled={isViewMode}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                    {...register("description", {
                      required: "La descripción es obligatoria",
                      minLength: {
                        value: 10,
                        message:
                          "La descripción debe tener al menos 10 caracteres",
                      },
                      maxLength: {
                        value: 250,
                        message:
                          "La descripción no puede tener más de 250 caracteres",
                      },
                    })}
                  ></textarea>
                  {errors.description && (
                    <span className="text-sm text-red-400">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-300">
                  <span
                    className={`badge badge-xs ${
                      taskDetail.completed ? "badge-success" : "badge-info"
                    }  me-2`}
                  ></span>
                  Estado de la tarea:{" "}
                  {taskDetail.completed ? "Completado" : "Pendiente"}
                </p>
                <div
                  className={`${
                    isViewMode ? "hidden" : "flex"
                  } justify-end gap-5`}
                >
                  <ButtonForm onClick={() => handleCancel()}>
                    Cancelar
                  </ButtonForm>
                  <button className="flex items-center gap-2 px-4 py-1 my-3 text-sm border border-transparent rounded-md select-none bg-white/15 backdrop-blur-sm">
                    Guardar Cambios
                  </button>
                </div>
                <div
                  className={`${
                    !isViewMode ? "hidden" : "flex"
                  } justify-end gap-5`}
                >
                  <ButtonForm onClick={() => closeModal()}>
                    <Undo2 size={16} />
                    Volver
                  </ButtonForm>
                  <ButtonForm onClick={() => handleEdit()}>
                    <Pencil size={16} />
                    Editar
                  </ButtonForm>
                </div>
              </div>
            </form>
          </article>
        )}
      </section>
    </div>
  );
}

export default TaskItem;
