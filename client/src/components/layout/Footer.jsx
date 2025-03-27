import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext.jsx";

function Footer({ items, allItems }) {
  const { setFilter } = useContext(TodoContext);
  return (
    <div className="fixed bottom-0 flex items-center justify-between px-2 m-2 border-t left-1 right-1 text-white/70 border-black/10">
      <div>
        {items.length}/{allItems.length}
        Items
      </div>
      <div className="flex">
        <ul className="bg-transparent menu menu-horizontal rounded-box">
          <li>
            <button onClick={() => setFilter("all")}>Todos</button>
          </li>
          <li>
            <button onClick={() => setFilter("completed")}>Activos</button>
          </li>
          <li>
            <button onClick={() => setFilter("pending")}>Completos</button>
          </li>
        </ul>
      </div>
      <button>Limpiar Completos</button>
    </div>
  );
}

export default Footer;
