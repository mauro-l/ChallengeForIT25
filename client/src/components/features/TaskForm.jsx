import { Send, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function TaskForm({ setFormTask }) {
  const [hasContent, setHasContent] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm({
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

  const onSubmit = (data) => {
    console.log(data);
    setFormTask(false);
    reset();
  };

  const handleCancel = () => {
    setFormTask(false);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full gap-4">
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-row gap-2 px-4 border-2 rounded-md select-none border-white/40 bg-black/25 backdrop-blur-sm">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            className="w-full bg-transparent border-none outline-none"
            {...register("title")}
          />
        </div>
        <div className="flex flex-row gap-2 px-4 border-2 rounded-md select-none border-white/40 bg-black/25 backdrop-blur-sm">
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
            {...register("description")}
          ></textarea>
        </div>
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
