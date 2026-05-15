import chars from "../assets/char";
import { Character } from "../types/character";

import "./page_characters.css";

const sortedChars = [...chars].sort((a, b) => {
    const pa = a.priority === 0 ? Infinity : (a.priority ?? 1);
    const pb = b.priority === 0 ? Infinity : (b.priority ?? 1);
    return pb - pa;
});

function CharacterCard({ char }: { char: Character }) {
    const card = char.img?.card ?? "";
    return (
        <span className="char-card" data-rarity={char.rarity}>
            <div className="char-card-image char-card-image--color" style={{ backgroundImage: `url("${card}")` }} />
            <div className="char-card-image char-card-image--bw" style={{ backgroundImage: `url("${card}")` }} />
            <div className="char-card-hover-bg" />
            <div className="char-card-flash char-card-flash--id">
                <span className="char-card-label">{char.id}</span>
            </div>
            <div className="char-card-flash char-card-flash--name">
                <span className="char-card-label">
                    {typeof char.name === "string" ? char.name : char.name.zh}
                </span>
            </div>
        </span>
    );
}

export default function Characters() {
    return (
        <section className="chars-grid">
            {sortedChars.map((char) => (
                <CharacterCard key={char.id} char={char} />
            ))}
            <p className="chars-disclaimer">
                角色的收录、展示、排序和稀有度皆基于作者的个人喜好，不代表米哈游官方立场。
            </p>
        </section>
    );
}
