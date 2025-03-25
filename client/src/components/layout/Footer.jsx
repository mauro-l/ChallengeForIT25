function Footer({ items, allItems }) {
  return (
    <div className="fixed bottom-0 flex items-center justify-between px-2 m-2 border-t left-1 right-1 text-white/70 border-black/10">
      <div>
        {items.length}/{allItems.length}
        Items
      </div>
      <div className="flex">
        <ul className="bg-transparent  menu menu-horizontal rounded-box">
          <li>
            <button>Todos</button>
          </li>
          <li>
            <button>Activos</button>
          </li>
          <li>
            <button>Completos</button>
          </li>
        </ul>
      </div>
      <button>Limpiar Completos</button>
    </div>
  );
}

export default Footer;
