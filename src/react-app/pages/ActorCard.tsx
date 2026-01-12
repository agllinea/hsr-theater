import React from 'react';
import { motion } from 'framer-motion';

interface Actor {
    id: string;
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
            style={{
                backgroundImage: `url("/character_icon/${actor.id}-character_icon.webp")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* <h3 className="actors-name">{actor.name}</h3> */}
            <motion.div
                className='actors-hover-card'
                initial={{ opacity: 0, height: '100%', pointerEvents: 'none' }}
                animate={
                    isHovered
                        ? { opacity: 1, height: '150%', pointerEvents: 'auto' }
                        : { opacity: 0, height: '100%', pointerEvents: 'none' }
                }
                transition={{ duration: 0.2 }}
                style={{
                    backgroundImage: `url("/character_icon/${actor.id}-character_icon.webp")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <span className='actors-hover-info'>
                    <div className="actors-name">{actor.name}</div>

                    <div>{actor.va}</div>
                    <div className="actors-tags">
                        {actor.tags.map(tag => (
                            <span key={tag} className="actors-mini-tag">{tag}</span>
                        ))}
                    </div>
                </span>

            </motion.div>
        </motion.div>
    );
};

export default ActorCard;
