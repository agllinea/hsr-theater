import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

import { AutoScroll } from "../archived/auto_scroll";


import "./main.css";
import Actors from "../pages/page_actors";
import AnimatedShorts from "../pages/page_clips";
import Scripts from "../pages/page_scripts";




// Cover Component
export const Cover: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.1 });

  useEffect(() => {
    console.log("Cover", isInView);
    if (isInView && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isInView]);

  return (
    <AutoScroll className="cover">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="cover-title"
      >
        SR Theater
      </motion.h1>
    </AutoScroll>
  );
};

// Main Component
const Main: React.FC = () => {
  // const ref = useRef<HTMLDivElement>(null);
  // const isInView = useInView(ref, { amount: 0.1 });

  // useEffect(() => {
  //   console.log("Main", isInView)
  //   if (isInView && ref.current) {
  //     ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // }, [isInView]);

  return (
    <section className="main">
      <Actors />
      <AnimatedShorts  />
      <Scripts />
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        &copy; 2026 SR Theater. All rights reserved. | Design by Creative
        Studios
      </p>
    </footer>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <body className="app">
      <Cover />
      <Main />
      <Footer />
    </body>
  );
};

export default App;
