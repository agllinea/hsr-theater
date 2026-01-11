import ElementsIcon from "../animated_components/ElementsIcon";
import WaveText from "../animated_components/wave_text";
import { useTheme } from "../stores/useTheme";

export default function Loading({ progress = 0.5 }: { progress: number }) {
    const { theme } = useTheme();

    return (
        <div className="page loading-container text-default">
            <span className="progress">
                <ElementsIcon progress={progress} />
            </span>

            <span className="hints">
                <img src={`/meow_${theme}.gif`} />

                {/* https://www.bilibili.com/opus/1096499902237638760 */}
                <WaveText text="LOADING..."></WaveText>
                <div className="content">你知道吗？如果遐蝶愿意嫁给我的话，就算让我同时娶流萤我也愿意口牙！</div>
            </span>
        </div>
    );
}
