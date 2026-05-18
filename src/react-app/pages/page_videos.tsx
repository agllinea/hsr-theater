import { useEffect, useState } from "react";
import { PaletteIcon } from "lucide-react";
import videos from "../assets/videos";
import { VideoEntry } from "../types/video";
import "./page_videos.css";
import { fetchClip } from "../types/clip";
import { Clip } from "../types/clip";
import { Toolbar } from "../components/Toolbar";

const sortedVideos = [...videos].sort((a, b) => {
    const pa = a.priority === 0 ? Infinity : (a.priority ?? 1);
    const pb = b.priority === 0 ? Infinity : (b.priority ?? 1);
    return pb - pa;
});

function VideoCard({ video }: { video: Clip }) {
    const cover = video.img?.cover ?? "";

    const handleClick = () => {
        if (video.url) window.open(video.url);
    };

    return (
        <article className="video-card" onClick={handleClick}>
            <div className="video-card-image video-card-image--bw" style={{ backgroundImage: `url("${cover}")` }} />
            <div className="video-card-image video-card-image--color" style={{ backgroundImage: `url("${cover}")` }} />
            <div className="video-card-hover-bg" />
            <div className="video-card-flash video-card-flash--default">
                <span className="video-card-label video-card-label--title">{video.id}</span>
            </div>
            <div className="video-card-flash video-card-flash--hover">
                <span className="video-card-label video-card-label--title">{video.title}</span>
                {video.description && (
                    <span className="video-card-label video-card-label--desc">{video.description}</span>
                )}
            </div>
        </article>
    );
}

export default function Videos() {
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
        <section className="videos-section">
            <Toolbar items={toolbarItems} />
            <section className={`videos-grid${colorActive ? " videos-grid--palette" : ""}`}>
                {clips.map((clip) => (
                    <VideoCard key={clip.id} video={clip} />
                ))}
            </section>
        </section>
    );
}
