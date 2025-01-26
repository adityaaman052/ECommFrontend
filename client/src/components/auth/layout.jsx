import { Outlet } from "react-router-dom";
import { FaRegSmile } from "react-icons/fa"; // For a welcome icon, you can use react-icons or any other icon library

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-r from-[#006663] via-[#111111] to-[#006663]">
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-white">
          <h1 className="text-5xl font-extrabold tracking-wide text-shadow-lg animate__animated animate__fadeIn">
            Welcome to Fragrencia
          </h1>
          <p className="text-lg text-gray-100 mt-2">
            Experience the beauty of personalized fragrances!
          </p>
          <FaRegSmile className="mx-auto mt-4 text-6xl animate__animated animate__bounce" />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
