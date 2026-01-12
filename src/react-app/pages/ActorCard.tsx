import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

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
                    transition: { duration: 0.4, ease: "easeOut" },
                },
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={clsx("actors-cube", isHovered && "hovered")}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <span
                className="actors-hover-cover"
                style={{
                    backgroundImage: `url("/character_icon/${actor.id}-character_icon.webp")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    aspectRatio: "1/1",
                    width: "100%",
                }}

            ></span>
            <span className="actors-hover-info">
                <div className="actors-name">{actor.name}</div>

                {/* <div className="actors-va">CV: {actor.va}</div> */}
                {/* <div className="actors-tags">
                        {actor.tags.map((tag) => (
                            <span key={tag} className="actors-mini-tag">
                                {tag}
                            </span>
                        ))}
                    </div> */}
            </span>
            {/* <h3 className="actors-name">{actor.name}</h3> */}
            {/* <motion.div
                className="actors-hover-card"
                // initial={{ opacity: 0, pointerEvents: "none" }}
                // animate={
                //     true
                //         ? { opacity: 1, zIndex: -1, pointerEvents: "auto" }
                //         : { opacity: 0, zIndex: -1, pointerEvents: "none" }
                // }
                // transition={{ duration: 0.2 }}
            ></motion.div> */}
        </motion.div>
    );
};

export default ActorCard;
