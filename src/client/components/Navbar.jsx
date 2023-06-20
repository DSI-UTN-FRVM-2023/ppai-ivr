import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="bg-slate-950 text-slate-300 w-full h-20 grid grid-cols-2 gap-80 p-2 align-middle select-none">
      <div className="grid grid-cols-3 gap-4 text-left">
        <Link className="m-auto" href="#">
          <h1 className="text-slate-500 text-2xl font-bold">IVR PPAI</h1>
        </Link>
        <Link className="m-auto" href="#">
          <h1 className="text-xl">Panel</h1>
        </Link>
        <Link className="m-auto" href="#">
          <h1 className="text-xl">Mis Llamadas</h1>
        </Link>
      </div>
      <div className="justify-self-end my-auto">
        <div className="flex gap-2">
          <Image
            className="rounded-full"
            src="/default-user.jpg"
            width="54"
            height="54"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
