const SidebarTask = ({ info }) => {
  return (
    <div className="w-full bg-slate-800 grid grid-cols-6 py-6 px-4 cursor-pointer">
      <div className="m-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(100 116 139)"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>
      </div>
      <div className="col-span-5">
        <h2 className="text-slate-200 text-l font-bold">Entrante: {info.nombreCliente}</h2>
      </div>
    </div>
  );
};

export default SidebarTask;
