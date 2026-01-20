import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExpandableMapContainer } from '../components/ExpandableMapContainer';
import './page_scripts.css';
import { scripts } from '../assets/scripts';
import { Script } from '../types/models';
import clsx from 'clsx';
import PageEnd from '../components/PageEnd';
import { actors_map } from '../assets/actors';
import { useNavigation } from '../stores/useNavigation';


const Scripts: React.FC = () => {
  const [expandedScript, setExpandedScript] = useState<string | null>(null);
  const { skipCover, setSkipCover, page, setPage, pageId, setPageId } = useNavigation();

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
              <p className="scripts-description">{script.desc}</p>
              <div className='button-view-script-container'>
                <div className='button-view-script' onClick={() => setPageId(script.id)}>查看剧本</div>
              </div>
              <div className='script-detail-title'>演员</div>
              <div>{(script.actors ?? []).map((actor) => <span key={actor} className='avatar'>
                <img src={`/characters/${actor}-character_icon.webp`}></img>
                <span>{actors_map[actor]?.name}</span>
              </span>)}</div>
              {/* <div className='script-detail-title'>动画短片</div>
              <div></div> */}
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

      <PageEnd />
    </ExpandableMapContainer>
  );
};

export default Scripts;
