function Footer() {
  return (
    <div className="fixed bottom-0 flex justify-between p-2 m-2 border-t left-1 right-1 text-white/70 border-black/10">
      <div>
        <p>
          <span>3</span>Items
        </p>
      </div>
      <div className="flex gap-3">
        <button>Todos</button>
        <button>Activos</button>
        <button>Completos</button>
      </div>
      <button>Limpiar Completos</button>
    </div>
  );
}

export default Footer;
