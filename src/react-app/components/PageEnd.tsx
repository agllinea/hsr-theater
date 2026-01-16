import React from "react";
import "./PageEnd.css";
import { motion } from "framer-motion";

const PageEnd: React.FC = () => {
    return (
        <motion.div
            className="page-end"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true,amount:.8}}
            transition={{
                duration: 0.4,
                ease: "easeOut",
            }}
        >
            <img src="/jahoda1.png" />
            <span>什么？竟然到底了！！</span>
        </motion.div>
    );
};

export default PageEnd;
