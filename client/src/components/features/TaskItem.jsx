import React, { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext.jsx";
import { Undo2 } from "lucide-react";
import { useForm } from "react-hook-form";
import ButtonForm from "../common/ButtonForm.jsx";

const fetchTaskById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: `Tarea ${id}`,
        description: `Esta es la descripción detallada de la tarea ${id}. Aquí se encuentran todos los detalles importantes sobre lo que se debe realizar.`,
      });
    }, 500);
  });
};

function TaskItem() {
  const { isOpen, closeModal, modalData } = useModal();
  const [isViewMode, setIsViewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    if (modalData) {
      setIsLoading(true);
      setIsViewMode(true);

      fetchTaskById(modalData)
        .then((taskData) => {
          reset(taskData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error al cargar la tarea:", error);
          setIsLoading(false);
        });
    }
  }, [modalData, reset]);

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const handleEdit = () => {
    setIsViewMode(false);
  };

  const handleUndo = () => {
    reset({ title: "", description: "" });
    closeModal();
  };

  const handleCancel = () => {
    fetchTaskById(modalData).then((taskData) => {
      reset(taskData);
      setIsViewMode(true);
    });
  };

  if (!isOpen) return null;
  return (
    <div className="absolute top-0 z-50 flex items-center w-1/2 mx-2 h-3/4">
      <section className="p-5 mx-auto text-white border-2 border-white/5 rounded-xl bg-black/70 backdrop-blur-sm">
        {isLoading ? (
          <div className="flex items-center justify-center h-40 p-5">
            <p>Cargando tarea...</p>
          </div>
        ) : (
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
                  className="w-full pt-3 text-2xl bg-transparent border-none outline-none"
                  disabled={isViewMode}
                  {...register("title")}
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
                  className="w-full overflow-hidden bg-transparent border-none outline-none resize-none text-white/80 min-h-[5.5rem]"
                  disabled={isViewMode}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  {...register("description")}
                ></textarea>
              </div>
            </div>
            <div className={`${isViewMode ? "hidden" : "flex"}`}>
              <ButtonForm onClick={() => handleCancel()}>Cancelar</ButtonForm>
              <button className="flex items-center gap-2 px-4 m-1 border border-transparent rounded-md select-none backdrop-blur-sm">
                Guardar Cambios
              </button>
            </div>
            <div
              className={`${!isViewMode ? "hidden" : "flex"} justify-around`}
            >
              <ButtonForm onClick={() => handleUndo()}>
                <Undo2 size={20} />
                Volver
              </ButtonForm>
              <ButtonForm onClick={() => handleEdit()}>Editar</ButtonForm>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export default TaskItem;
