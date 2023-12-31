import SidebarTask from './Sidebar.Task';

const Sidebar = ({ info, finalizada }) => {
  return (
    <div className="bg-slate-900 w-full h-[85vh] relative select-none">
      <div className="bg-slate-700 px-4 py-2">
        <h2 className="text-l text-slate-400 font-bold">Mis Llamadas</h2>
      </div>
      <div className="flex-col items-center justify-center">
        {finalizada ? (<h3 className="my-6 text-white font-bold text-center">No hay llamadas iniciadas.</h3>) : (<SidebarTask info={info} />)}
      </div>
    </div>
  );
};

export default Sidebar;
