import React from "react";
import bgImage from "../../assets/images/Bg.jpeg";
import { Header } from "../common/header.jsx";
import { Footer } from "../common/footer.jsx";
import { Outlet } from "react-router-dom";

const HEADER_HEIGHT = 66; // px
const FOOTER_HEIGHT = 66; // px

export const MainLayout = ({ children }) => {
  return (
    <div className="">
      {/* Fullscreen fixed background image */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Content overlays above background */}
      <div className="flex flex-col w-full h-full relative z-10">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 w-full" style={{ height: HEADER_HEIGHT, zIndex: 20 }}>
          <Header />
        </div>

        {/* Main content area */}
        <main className="flex-1 flex justify-center items-center" style={{ overflow: "hidden" }}>
          <Outlet />
        </main>

        {/* Fixed Footer */}
        <div className="fixed bottom-0 left-0 w-full" style={{ height: FOOTER_HEIGHT, zIndex: 20 }}>
          <Footer />
        </div>
      </div>
    </div>
  );
};
