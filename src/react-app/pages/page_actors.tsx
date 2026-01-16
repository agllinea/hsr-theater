import { useState } from "react";
import clsx from "clsx";
import { Legends } from "../components/Legends";
import { actors_by_fraction, favorite_actors, rarity_order } from "../assets/actors";
import { fractions } from "../assets/fractions";

import "./page_actors.css";
import { Actor } from "../types/models";
import { motion } from "framer-motion";

function ActorCard({ actor, index }: { actor: Actor; index: number }) {
    return (
        <motion.span
            key={actor.id}
            className={clsx("actor-card", actor.rarity ?? "S")}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px", amount: 0.3 }}
            transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.05,
            }}
        >
            <div
                className="actor-card-image"
                style={{ backgroundImage: `url("/character_card/${actor.id}.webp")` }}
            ></div>
            <div className="actor-card-flash">
                <span>{actor.name}</span>
            </div>
        </motion.span>
    );
}

export default function Actors() {
    const [fullView, setFullView] = useState<boolean>(false);
    return (
        <section className="section-container">
            <Legends />
            {fullView ? (
                Object.entries(actors_by_fraction).map(([fraction, list]) => (
                    <div key={fraction}>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px", amount: 0.3 }}
                            transition={{
                                duration: 0.4,
                                ease: "easeOut",
                            }}
                        >
                            {fractions[fraction]?.name}
                        </motion.h2>
                        <div className="actors-grid">
                            {list.map((actor) => (
                                <ActorCard key={actor.id} actor={actor} index={0} />
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <>
                    <div className="actors-grid">
                        {favorite_actors.sort(rarity_order).map((actor, index) => (
                            <ActorCard key={actor.id} actor={actor} index={index} />
                        ))}
                        
                    </div>
                    <motion.div initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true}}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",delay:.6
                            }} className="button-more" onClick={() => setFullView(true)}>
                        更多角色
                    </motion.div>
                </>
            )}
        </section>
    );
}
