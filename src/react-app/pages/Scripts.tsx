import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Scripts.css';
import { AutoScroll } from './auto_scroll';

interface Script {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface ScriptsProps {
  scripts: Script[];
}

const Scripts: React.FC<ScriptsProps> = ({ scripts }) => {
  const [expandedScript, setExpandedScript] = useState<number | null>(null);

  return (
    <AutoScroll as='div' className="scripts-page">
      <div className="scripts-title-bar">
        <h2 className="scripts-page-title">Scripts</h2>
      </div>
      <div className="scripts-page-content">
        <div className="scripts-list">
          {scripts.map((script, index) => (
            <motion.div
              key={script.id}
              className="scripts-accordion"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <motion.div
                className="scripts-header"
                onClick={() => setExpandedScript(expandedScript === script.id ? null : script.id)}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              >
                <div>
                  <h3 className="scripts-title">{script.title}</h3>
                  <p className="scripts-author">by {script.author}</p>
                </div>
                <motion.div
                  className="scripts-expand-icon"
                  animate={{ rotate: expandedScript === script.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.div>
              </motion.div>
              <AnimatePresence>
                {expandedScript === script.id && (
                  <motion.div
                    className="scripts-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="scripts-description">{script.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </AutoScroll>
  );
};

export default Scripts;
