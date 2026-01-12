import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedShorts.css';
import { AutoScroll } from './auto_scroll';

interface Video {
  title: string;
  genre: string;
  url: string;
  needed: boolean;
}
interface AnimatedShortsProps {
  videos: Video[];
}

const AnimatedShorts: React.FC<AnimatedShortsProps> = ({ videos }) => {

  // Extract BV ID from Bilibili URL
  const extractBVID = (url: string): string | null => {
    const match = url.match(/BV[a-zA-Z0-9]+/);
    return match ? match[0] : null;
  };

  return (
    <AutoScroll as='div' className="animated-shorts-page">
      <div className="animated-shorts-title-bar">
        <h2 className="animated-shorts-page-title">Animated Shorts</h2>
      </div>
      <div className="animated-shorts-page-content">
        <div className="animated-shorts-grid">
          {videos.filter(video => video.needed).map((video, index) => {
            const bvid = extractBVID(video.url);

            return (
              <motion.div
                key={index}
                className="animated-shorts-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
                
              >
                <div className="animated-shorts-placeholder" style={{
                  backgroundImage: `url("/animated_short_cover/${bvid}.jpg")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
                  <div className="animated-shorts-play-icon">▶</div>
                </div>
                <div className="animated-shorts-info">
                  <h3 className="animated-shorts-title">{video.title}</h3>
                  <p className="animated-shorts-duration">{video.genre}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AutoScroll>
  );
};

export default AnimatedShorts;
