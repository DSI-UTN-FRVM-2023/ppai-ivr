import ValidacionInput from '../validadores/Validacion.Input';

const MainSidebar = ({ info }) => {
  return (
    <div className="w-full col-span-2 bg-slate-800 py-6 px-4">
      <h1 className="text-xl font-bold text-slate-200">
        Responder llamada de {info.nombreCliente}
      </h1>
      <p className="text-sm text-slate-200">
        <b>Categoría:</b> {info.nombreCategoriaLlamada}
      </p>
      <p className="text-sm text-slate-200">
        <b>Opción Seleccionada:</b> {info.opcionSeleccionada}
      </p>
      {info?.listaValidacionesOpcion?.length ? (
        <div className="p-2 w-full">
          {info?.listaValidacionesOpcion?.map((validacion) => {
            return <ValidacionInput nombreValidacion={validacion} />;
          })}
        </div>
      ) : (
        <></>
      )}
      <p className="text-sm text-slate-200">
        <b>Sub-Opción Seleccionada:</b> {info?.subOpcionSeleccionada}
      </p>
      {info?.listaValidacionesSubOpcion?.length ? (
        <div className="p-2 w-full">
          {info?.listaValidacionesSubOpcion?.map((validacion) => {
            return <ValidacionInput nombreValidacion={validacion} />;
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainSidebar;
