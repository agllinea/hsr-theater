import "./wave_text.css";

type WaveTextProps = {
    text: string;
    amplitude?: number;
    speed?: number;
};

export default function WaveText({ text, amplitude = 3, speed = 1.5 }: WaveTextProps) {
    return (
        <span
            className="wave-text"
            style={
                {
                    ["--amplitude" as any]: `${amplitude}px`,
                    ["--speed" as any]: `${speed}s`,
                } as React.CSSProperties
            }
        >
            {text.split("").map((char, index) => (
                <span key={index} className="wave-char" style={{ animationDelay: `${index * 0.1}s` }}>
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
}
