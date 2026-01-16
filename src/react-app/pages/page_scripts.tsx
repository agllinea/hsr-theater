import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExpandableMapContainer } from '../components/ExpandableMapContainer';
import './page_scripts.css';
import { scripts } from '../assets/scripts';
import { Script } from '../types/models';
import clsx from 'clsx';
import PageEnd from '../components/PageEnd';


const Scripts: React.FC = () => {
  const [expandedScript, setExpandedScript] = useState<string | null>(null);

  const renderScript = (script: Script) => (
    <div className={clsx("scripts-accordion", expandedScript === script.id ? "expanded" : "")} key={script.id}>
      <div
        className="scripts-header"
        onClick={() => setExpandedScript(expandedScript === script.id ? null : script.id)}
      >
        <div>
          <div className="scripts-no"><span className='scripts-tag'>{script.status}</span><span>{script.id}</span></div>
          <div className="scripts-title">{script.title}</div>
          <div className="scripts-chapter">{script.chapter}</div>
          <p className="scripts-description">{script.desc}</p>
        </div>
        <motion.div
          className="scripts-expand-icon"
          animate={{ rotate: expandedScript === script.id ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.div>
      </div>
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
              <div>{(script.actors ?? []).map((actor) => <span key={actor} className='avatar'><img src={`/characters/${actor}-character_icon.webp`}></img></span>)}</div>
              <div>动画短片</div>
              <div></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <ExpandableMapContainer
      items={scripts}
      renderItem={renderScript}
    >
        
            <PageEnd/>
    </ExpandableMapContainer>
  );
};

export default Scripts;
