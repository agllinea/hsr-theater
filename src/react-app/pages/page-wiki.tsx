import { motion } from "framer-motion";
import ElementsIcon from "../components/ElementsIcon";
import WaveText from "../components/wave_text";
import { useTheme } from "../stores/useTheme";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { useEffect, useState } from "react";
import "../markdown.css"
import { useNavigation } from "../stores/useNavigation";
import "./page-wiki.css"

export default function Wiki() {
    const { page, pageId, setPageId } = useNavigation();

    const { theme } = useTheme();
    const [markdown, setMarkdown] = useState('')
    useEffect(() => {
        fetch(`/scripts/${pageId}.md`)
            .then(res => res.text())
            .then(text => setMarkdown(text))
    }, [])
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="page-wiki"
        >
            <div className="section-container">
                <div className="header" ><div onClick={() => setPageId("")}>back</div>
                </div>
                {page.toLowerCase() === "scripts" && (
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks,]}
                        rehypePlugins={[rehypeRaw]}
                    >{markdown}</ReactMarkdown>

                )}
            </div>
        </motion.div>
    );
}
