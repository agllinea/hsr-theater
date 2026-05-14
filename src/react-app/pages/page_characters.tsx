import { actors } from "../assets/actors";
import { Actor } from "../types/models";

import "./page_characters.css";

function CharacterCard({ actor }: { actor: Actor }) {
    return (
        <span className="char-card">
            <div
                className="char-card-image char-card-image--color"
                style={{ backgroundImage: `url("/character_card/${actor.id}.webp")` }}
            />
            <div
                className="char-card-image char-card-image--bw"
                style={{ backgroundImage: `url("/character_card/${actor.id}.webp")` }}
            />
            <div className="char-card-flash">
                <span>{actor.name}</span>
            </div>
        </span>
    );
}

export default function Characters() {
    return (
        <section className="chars-grid">
            {actors.map((actor) => (
                <CharacterCard key={actor.id} actor={actor} />
            ))}
        </section>
    );
}
