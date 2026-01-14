import { useEffect, useState } from "react";
import clsx from "clsx";
import { DramaIcon, FilmIcon, ScrollTextIcon, MusicIcon } from "lucide-react";
import { AutoScroll } from "./auto_scroll";
import { Button, ButtonGroup } from "./zzz-button";
import {
  actors_by_fraction,
  favorite_actors,
  rarity_order,
} from "../assets/actors_new";
import { fractions } from "../assets/fractions";

import "../actor_card.css";
import { Actor } from "../types/models";

const Legends = () => {
  const legends = [
    {
      label: "寰宇级",
      code: "Ω",
      description:
        "该级别个体被视为能够参与改写寰宇命运的抉择者。<br/>其存在或抉择，足以改变寰宇的现在，未来，甚至重塑过去。",
    },
    {
      label: "王座级",
      code: "EX",
      description:
        "代行星神意志的令使，或是拥有相同位格的存在。<br/>他们在星神面前或许仍显渺小，但已拥有足以撬动寰宇格局的实际能力。",
    },
    {
      label: "鎏金级",
      code: "S",
      description:
        "重大历史事件的关键构成者。<br/>他们就像一段故事里的主角，其抉择往往能影响一个文明乃至无数人的命运。",
    },
    {
      label: "紫晶级",
      code: "A",
      description:
        "在特定事件或阶段中扮演重要角色。<br/>他们的选择能够显著影响局部进程，却难以独立改变历史大势。",
    },
    {
      label: "路人级",
      code: "NPC",
      description:
        "未被判定为变量，仅作为时代背景与社会样本被记录。<br/>他们的行为在宏观层面不构成影响，无关紧要。",
    },
  ];
  const [currentLegend, setCurrentLegend] = useState<string | null>(null);
  const handleLegendClick = (code: string) => {
    if (currentLegend === code) {
      setCurrentLegend(null);
    } else {
      setCurrentLegend(code);
    }
  };
  return (
    <div>
      <div className="legend-lables">
        {legends.map((legend, index) => (
          <div
            key={index}
            className="legend-item"
            onClick={() => handleLegendClick(legend.code)}
          >
            <span className={clsx("legend-block", legend.code)}></span>
            <span className="legend-code">{legend.code}</span>
            <span className="legend-label">{legend.label}</span>
          </div>
        ))}
      </div>
      <div className="legend-detail-container">
        <div
          className="legend-detail"
          dangerouslySetInnerHTML={{
            __html:
              (currentLegend &&
                legends.find((l) => l.code === currentLegend)?.description) ??
              "",
          }}
        ></div>
      </div>
    </div>
  );
};

export default function Actors() {
  const ActorCard = ({ actor }: { actor: Actor }) => (
    <span key={actor.id} className={clsx("actor-card", actor.rarity ?? "S")}>
      <div
        className="actor-card-image"
        style={{ backgroundImage: `url("/character_card/${actor.id}.webp")` }}
      ></div>
      <div className="actor-card-flash">
        <span>{actor.name}</span>
      </div>
    </span>
  );

  const [fullView, setFullView] = useState<boolean>(false);
  return (
    <section className="section-container">
      <Legends />
      {fullView ? (
        Object.entries(actors_by_fraction).map(([fraction, list]) => (
          <div key={fraction}>
            <h2>{fractions[fraction]?.name}</h2>
            <div className="actors-grid">
              {list.map(
                (actor) =>
                  <ActorCard key={actor.id} actor={actor} />
              )}
            </div>
          </div>
        ))
      ) : (
        <>
          <div className="actors-grid">
            {favorite_actors.sort(rarity_order).map((actor) => (
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </div>
          <button onClick={()=>setFullView(true)}>More</button>
        </>
      )}
    </section>
  );
}
