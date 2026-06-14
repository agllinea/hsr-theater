import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparkleIcon, FunnelIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { FeaturedBanner } from "./FeaturedBanner";
import { ToolbarV2 } from "./ToolbarV2";
import { RolesTab } from "./RolesTab";
import { ScriptsTab } from "./ScriptsTab";
import { ShortsTab } from "./ShortsTab";
import { fractions } from "../assets/fractions";
import type { Tab } from "./HeaderNav";
import "./ContentPanel.css";

const TAB_LABELS: Record<Tab, string> = {
    roles: "角色",
    scripts: "剧本",
    shorts: "短片",
};


interface TabToolbarState {
    palette: boolean;
    filter: boolean;
    selectedTag: string | null;
}

const DEFAULT_TOOLBAR: TabToolbarState = { palette: false, filter: false, selectedTag: null };

type AllTabsState = Record<Tab, TabToolbarState>;

const initialState: AllTabsState = {
    roles:   { ...DEFAULT_TOOLBAR },
    scripts: { ...DEFAULT_TOOLBAR },
    shorts:  { ...DEFAULT_TOOLBAR },
};

function TagFilter({ options, selected, onSelect, getLabel }: {
    options: string[];
    selected: string | null;
    onSelect: (tag: string | null) => void;
    getLabel?: (tag: string) => string;
}) {
    return (
        <div className="tag-v2-filter">
            <button
                className={clsx("tag-v2", selected === null && "tag-v2--active")}
                onClick={() => onSelect(null)}
            >
                全部
            </button>
            {options.map((tag) => (
                <button
                    key={tag}
                    className={clsx("tag-v2", selected === tag && "tag-v2--active")}
                    onClick={() => onSelect(tag)}
                >
                    {getLabel ? getLabel(tag) : tag}
                </button>
            ))}
        </div>
    );
}

export function ContentPanel({ activeTab }: { activeTab: Tab }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [tabState, setTabState] = useState<AllTabsState>(initialState);
    const [dynamicTagOptions, setDynamicTagOptions] = useState<Partial<Record<Tab, string[]>>>({});

    const { palette, filter, selectedTag } = tabState[activeTab];

    const toggle = (key: "palette" | "filter") =>
        setTabState((prev) => ({
            ...prev,
            [activeTab]: { ...prev[activeTab], [key]: !prev[activeTab][key] },
        }));

    const setSelectedTag = (tag: string | null) =>
        setTabState((prev) => ({
            ...prev,
            [activeTab]: { ...prev[activeTab], selectedTag: tag },
        }));

    const onRoleTagsLoaded = useCallback((tags: string[]) =>
        setDynamicTagOptions((prev) => ({ ...prev, roles: tags })), []);

    const onScriptTagsLoaded = useCallback((tags: string[]) =>
        setDynamicTagOptions((prev) => ({ ...prev, scripts: tags })), []);

    const onShortsTagsLoaded = useCallback((tags: string[]) =>
        setDynamicTagOptions((prev) => ({ ...prev, shorts: tags })), []);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
    }, [activeTab]);

    const filterOptions = dynamicTagOptions[activeTab] ?? [];
    const filterGetLabel = activeTab === "roles"
        ? (tag: string) => fractions[tag]?.name ?? tag
        : undefined;

    const filterPanel = (
        <TagFilter
            options={filterOptions}
            selected={selectedTag}
            onSelect={setSelectedTag}
            getLabel={filterGetLabel}
        />
    );

    const toolbarItems = [
        {
            icon: <SparkleIcon size={16} weight="duotone" />,
            isActive: palette,
            onClick: () => toggle("palette"),
        },
        {
            icon: <FunnelIcon size={16} weight="duotone" />,
            isActive: filter,
            onClick: () => toggle("filter"),
            dropdownPanel: filterPanel,
        },
    ];

    return (
        <motion.div
            className="content-panel"
            ref={scrollRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="content-panel__body">
                <FeaturedBanner />
                <ToolbarV2 items={toolbarItems} />
                <AnimatePresence mode="wait">
                    {activeTab === "roles" ? (
                        <motion.div
                            key="roles"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <RolesTab
                                palette={palette}
                                selectedTag={selectedTag}
                                onFactionTagsLoaded={onRoleTagsLoaded}
                            />
                        </motion.div>
                    ) : activeTab === "scripts" ? (
                        <motion.div
                            key="scripts"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <ScriptsTab
                                palette={palette}
                                selectedTag={selectedTag}
                                onTagsLoaded={onScriptTagsLoaded}
                            />
                        </motion.div>
                    ) : activeTab === "shorts" ? (
                        <motion.div
                            key="shorts"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <ShortsTab
                                palette={palette}
                                selectedTag={selectedTag}
                                onTagsLoaded={onShortsTagsLoaded}
                            />
                        </motion.div>
                    ) : (
                        <motion.p
                            key={activeTab}
                            className="content-panel__placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            {TAB_LABELS[activeTab]}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
