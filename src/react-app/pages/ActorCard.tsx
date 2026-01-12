import React from 'react';
import { motion } from 'framer-motion';

interface Actor {
    va: string;
    name: string;
    tags: string[];
}

interface ActorCardProps {
    actor: Actor;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const ActorCard: React.FC<ActorCardProps> = ({ actor, isHovered, onMouseEnter, onMouseLeave }) => {
    return (
        <motion.div
            key={actor.name}
            layout
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: 'easeOut' },
                },
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="actors-cube"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <h3 className="actors-name">{actor.name}</h3>
            <motion.div
                className='actors-hover-card'
                initial={{ opacity: 0, scale: 1, pointerEvents: 'none' }}
                animate={
                    isHovered
                        ? { opacity: 1, scale: 1.05, pointerEvents: 'auto' }
                        : { opacity: 0, scale: 1, pointerEvents: 'none' }
                }
                transition={{ duration: 0.2 }}
            >
                <h3 className="actors-name">{actor.name}</h3>
                
                <div className="actors-tags">
                    {actor.tags.map(tag => (
                        <span key={tag} className="actors-mini-tag">{tag}</span>
                    ))}
                </div>
                <div >{actor.va}</div>
            </motion.div>
        </motion.div>
    );
};

export default ActorCard;
