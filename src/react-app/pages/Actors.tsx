import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Actors.css';
import { AutoScroll } from './auto_scroll';
import ActorCard from './ActorCard';
import data from '../assets/actors.json'

const actors: Actor[] = data;
const allTags = Array.from(new Set(actors.flatMap((actor) => actor.tags)));

interface Actor {
    id: string;
    va: string;
    name: string;
    tags: string[];
}

const Actors: React.FC = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hoveredActorId, setHoveredActorId] = useState<string | null>(null);

    const toggleTag = (tag: string) => {
        const elementTop = ref.current.getBoundingClientRect().top;
        const offset = 100; // px below the top
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        window.scrollTo({
            top: scrollTop + elementTop - offset,
            behavior: "instant", // or "instant"
        });
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );

    };
    const ref = useRef<any>(undefined);
    const filteredActors = selectedTags.length === 0
        ? actors
        : actors.filter(actor => actor.tags.some(tag => selectedTags.includes(tag)));

    return (
        <AutoScroll as='div' className="actors-page">
            <div className="actors-title-bar" >
                <h2 className="actors-page-title">Actors</h2>
                <div className='selected-actors-tags'>
                    <button
                        className="actors-tag-toggle"

                        aria-expanded={isOpen}
                        aria-label={isOpen ? 'Collapse tags' : 'Expand tags'}
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        {isOpen ? '▲' : '▼'}
                    </button>
                    {(() =>
                        selectedTags.map(tag => (
                            <motion.button
                                key={tag}
                                className={`actors-tag ${selectedTags.includes(tag) ? 'actors-tag-active' : ''}`}
                                onClick={() => toggleTag(tag)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                role="listitem"
                            >
                                {tag}
                            </motion.button>
                        ))
                    )()}
                </div>

                <div style={{ position: 'relative' }}>

                    <motion.div className={`actors-tag-filter`} initial={{ opacity: 0, scaleY: 0, y: -8 }}
                        animate={
                            isOpen
                                ? { opacity: 1, scaleY: 1, y: 0 }
                                : { opacity: 0, scaleY: 0, y: -8 }
                        }
                        transition={{
                            duration: 0.25,
                            ease: [0.16, 1, 0.3, 1], // smooth dropdown easing
                        }}
                        style={{ originY: 0 }}>
                        {(() =>
                            allTags.filter(t => !selectedTags.includes(t)).map(tag => (
                                <motion.button
                                    key={tag}
                                    className={`actors-tag ${selectedTags.includes(tag) ? 'actors-tag-active' : ''}`}
                                    onClick={() => toggleTag(tag)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    role="listitem"
                                >
                                    {tag}
                                </motion.button>
                            )))()}
                    </motion.div>
                </div>

            </div>

            <div className="actors-page-content" ref={ref}>
                {/* Tag filter: collapsed one-line view, expands to fixed-height panel */}


                <motion.div
                    layout
                    key={`grid-${selectedTags.join('-')}`}
                    className="actors-grid"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.08,
                                delayChildren: 0,
                            },
                        },
                    }}
                >
                    <AnimatePresence>
                        {filteredActors.map((actor) => (
                            <ActorCard
                                key={actor.name}
                                actor={actor}
                                isHovered={hoveredActorId === actor.name}
                                onMouseEnter={() => setHoveredActorId(actor.name)}
                                onMouseLeave={() => setHoveredActorId(null)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </AutoScroll>
    );
};

export default Actors;
