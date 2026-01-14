import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Scripts.css';
import { AutoScroll } from './auto_scroll';

interface Script {
  id: string;
  chapter: string;
  title: string;
  status: string;
  desc?: string;
  actors?:string[];
  clips?:string[];
}

const scripts: Script[] = [
  {
    id: "0-01",
    chapter: "序幕・空间站「黑塔」",
    title: "今天是昨天的明天",
    status: "In Progress",
    desc: "系统时间23时44分59秒，一个陌生的女人来到空间站「黑塔」……",
    actors:["kafka","silver-wolf"],
    clips:[]
  }
];
const Scripts: React.FC = () => {
  const [expandedScript, setExpandedScript] = useState<string | null>(null);

  return (
    <section className="section-container">
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
              <div className="scripts-author"><span className='scripts-tag'>{script.status}</span><span>{script.id}</span></div>
              <div className="scripts-title">{script.title}</div>
              <div className="scripts-author">{script.chapter}</div>
              <p className="scripts-description">{script.desc}</p>
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
                <div className='scripts-detail'>
                  
                  <div>演员</div>
                    <div>{(script.actors??[]).map(actor=><span key={actor} className='avatar'><img src={`/characters/${actor}-character_icon.webp`}></img></span>)}</div>
                    <div>动画短片</div>
                    <div></div>
                
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </section>
  );
};

export default Scripts;
