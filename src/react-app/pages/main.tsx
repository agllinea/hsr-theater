import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Actors from "./Actors";
import AnimatedShorts from "./AnimatedShorts";
import Scripts from "./Scripts";
import "./main.css";
import animated_shorts from "../assets/animated_shorts";

interface Script {
  id: number;
  title: string;
  author: string;
  description: string;
}

const scripts: Script[] = [
  {
    id: 1,
    title: "Eternal Sunset",
    author: "Jane Doe",
    description:
      "A poignant drama about finding hope in the darkest moments of life.",
  },
  {
    id: 2,
    title: "Digital Dreams",
    author: "John Smith",
    description:
      "A sci-fi thriller exploring the intersection of technology and consciousness.",
  },
  {
    id: 3,
    title: "Forgotten Melodies",
    author: "Sarah Johnson",
    description: "A musical journey through memory, loss, and rediscovery.",
  },
  {
    id: 4,
    title: "The Silent Observer",
    author: "Michael Chen",
    description:
      "A psychological mystery that blurs the line between reality and perception.",
  },
  {
    id: 5,
    title: "Crimson Horizon",
    author: "Emily Rose",
    description:
      "An epic adventure set in a world on the brink of transformation.",
  },
];


// Cover Component
const Cover: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.1 });

  useEffect(() => {
    console.log("Cover", isInView);
    if (isInView && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isInView]);

  return (
    <section ref={ref} className="cover">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="cover-title"
      >
        SR Theater
      </motion.h1>
    </section>
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
      <AnimatedShorts videos={animated_shorts} />
      <Scripts scripts={scripts} />
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
