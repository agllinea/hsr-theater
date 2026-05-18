import { useEffect, useState } from "react";
import { PaletteIcon } from "lucide-react";
import "./Clips.css";
import { fetchClip } from "../types/clip";
import { Clip } from "../types/clip";
import { Toolbar } from "../components/Toolbar";


function ClipCard({ clip }: { clip: Clip }) {
    const cover = clip.img?.cover ?? "";

    const handleClick = () => {
        if (clip.url) window.open(clip.url);
    };

    return (
        <article className="clip-card" onClick={handleClick}>
            <div className="clip-card-image clip-card-image--bw" style={{ backgroundImage: `url("${cover}")` }} />
            <div className="clip-card-image clip-card-image--color" style={{ backgroundImage: `url("${cover}")` }} />
            <div className="clip-card-hover-bg" />
            <div className="clip-card-flash clip-card-flash--default">
                <span className="clip-card-label clip-card-label--title">{clip.id}</span>
            </div>
            <div className="clip-card-flash clip-card-flash--hover">
                <span className="clip-card-label clip-card-label--title">{clip.title}</span>
                {clip.description && (
                    <span className="clip-card-label clip-card-label--desc">{clip.description}</span>
                )}
            </div>
        </article>
    );
}

export default function Clips() {
    const [clips, setClips] = useState<Clip[]>([]);
    const [colorActive, setColorActive] = useState(false);

    useEffect(() => {
        fetchClip().then(setClips);
    }, []);

    const toolbarItems = [
        {
            icon: <PaletteIcon size={16} />,
            isActive: colorActive,
            onClick: () => setColorActive((v) => !v),
        },
    ];

    return (
        <section className="clips-section">
            <Toolbar items={toolbarItems} />
            <section className={`clips-grid${colorActive ? " clips-grid--palette" : ""}`}>
                {clips.map((clip) => (
                    <ClipCard key={clip.id} clip={clip} />
                ))}
            </section>
        </section>
    );
}
