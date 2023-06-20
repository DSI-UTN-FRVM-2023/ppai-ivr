import Sidebar from '../components/operador/Sidebar';
import MainSidebar from '../components/operador/Main.Sidebar';

const Home = () => {
  return (
    <main>
      <container className="grid grid-cols-3 w-full h-full">
        <Sidebar />
        <MainSidebar />
      </container>

      <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{' '}
          <a
            href="https://github.com/DSI-UTN-FRVM-2023"
            target="_blank"
            class="hover:underline"
          >
            Grupo 2 DSI UTN FRVM
          </a>
        </span>
      </footer>
    </main>
  );
};

export default Home;
