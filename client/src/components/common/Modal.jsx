/* import { Send, X } from "lucide-react";
import { useForm } from "react-hook-form"; */

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;
  console.log("si se abre");
  /* const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  }); */

  const sendMessage = (values) => {
    console.log(values);
    onClose();
  };

  return (
    <>
      <div className="absolute inset-0 top-0 left-0 flex items-center justify-center !mt-0 bg-black/50">
        {/* <div className="modal-box">
          <button
            className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
            onClick={onClose}
          >
            <X />
          </button>
          <form onSubmit={handleSubmit(sendMessage)}>
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
                  className="w-full overflow-hidden bg-transparent border-none outline-none resize-none"
                  style={{ minHeight: "1.5rem" }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  {...register("description")}
                ></textarea>
              </div>
            </div>
            <button
              type={"submit"}
              onClick={sendMessage}
              className="flex items-center gap-2 px-4 border border-transparent rounded-md select-none bg-black/25 backdrop-blur-sm max-h-16"
            >
              <Send size={24} />
            </button>
          </form>
        </div> */}
        asdsad
        <button onClick={() => sendMessage()}></button>
      </div>
    </>
  );
}

export default Modal;
