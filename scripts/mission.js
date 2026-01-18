import { writeFile } from "fs/promises";
import { JSDOM } from "jsdom";
import TurndownService from "turndown";

function convertToMarkdown(inputString) {
    try {
        const turndownService = new TurndownService();
        turndownService.keep(['ruby', 'rb', 'rt']); // Keep ruby-related tags
        turndownService.remove("script");
        turndownService.remove("img")
        turndownService.addRule('ignoreLinks', {
            filter: 'a',
            replacement: function (content) {
                return content; // Just return the text content, ignore the link
            }
        });
        turndownService.addRule('keepStyledSpans', {
            filter: function (node) {
                return node.nodeName === 'SPAN' && (node.hasAttribute('style') || node.classList.contains("heimu"));
            },
            replacement: function (content, node) {
                if (node.hasAttribute('style'))
                    return '<span style="' + node.getAttribute('style') + '">' + content + '</span>';
                else if (node.classList.contains("heimu"))

                    return '<span class="heimu">' + content + '</span>';
                else
                    return content;
            }
        });
        return turndownService.turndown(inputString);
    } catch (error) {
        return "";
    }
}

function cleanUpMd(md) {
    const lines = md.split('\n');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Rule 1: Add newline before ### headings
        if (trimmed.startsWith('###')) {
            if (result.length > 0 && result[result.length - 1].trim() !== '') {
                result.push('');
            }
            result.push(line);
            continue;
        }

        // Rule 2: Add newline before <span style if previous line starts with *
        if (trimmed.startsWith('<span style')) {
            if (result.length > 0 && result[result.length - 1].trim().startsWith('*')) {
                result.push('');
            }
            result.push(line);
            continue;
        }

        result.push(line);
    }

    // Rule 3: Clean up redundant line breaks (max 2 consecutive empty lines)
    const cleaned = [];
    let emptyCount = 0;

    for (const line of result) {
        if (line.trim() === '') {
            emptyCount++;
            if (emptyCount < 2) {
                cleaned.push(line);
            }
        } else {
            emptyCount = 0;
            cleaned.push(line);
        }
    }

    return cleaned.join('\n');
}

function processHsrMsgElement(el) {
    try {


        // Array.from(el.querySelectorAll(".NM-Container")).map(msg=>
        //     `* ${msg.children[0].textContent}`
        // )
        return `${el.querySelector(".NM-Container").children[0].textContent}：${el.querySelector(".NM-Container").children[1].textContent
            }`;
    } catch (error) {
        return `*${el.textContent}*`;
    }
}

function processHTMLElement(el) {
    if (el.classList.contains("tabber")) {
        return "\n#### *开拓者性别决定开始*\n" + Array.from(el.querySelectorAll(".tabbertab"))
            .map(tab => {
                return `##### ${tab.getAttribute('title')}` + "\n" + Array.from(tab.children)
                    .map(child => processHTMLElement(child))
                    .join("\n\n")
            })
            .join("\n\n") + "\n#### *开拓者性别决定结束*\n"
    }
    if (el.classList.contains("sr-collapse-frame")) {
        const titleEl = el.querySelector(".sr-collapse-title");
        const titleText = titleEl ? titleEl.textContent : null;

        // Get the content's innerHTML
        const contentEl = el.querySelector(".sr-collapse-content");
        const contentHTML = contentEl ? contentEl.innerHTML : null;
        return (`\n\n> > ${titleText}\n> ` + "\n> " + convertToMarkdown(contentHTML).split("\n").join("\n> ")) + "\n\n";

    }
    if (el.classList.contains("plotFrame")) {
        const plotOptions = [...el.querySelectorAll(".plotOptions")];
        const plotContent = [...el.querySelectorAll(".content:has(*)")];
        var md = "";
        for (let i = 0; i < plotOptions.length; i++) {
            md += `\n> ${plotOptions[i].textContent}\n`;
            if (plotContent.length > 0) {
                if (plotOptions[i].querySelector(".plotIcon>img").getAttribute("alt").includes("退出"))
                    md += `\n\n---\n\n`;
                else
                    md += plotContent[i] ? `\n${[...plotContent[i].children].map((pc) => {
                        return processHTMLElement(pc);
                    })}\n` : "\n\n";
            }
        }
        return "\n\n---\n\n" + md + "\n\n---\n\n";
    }

    if (el.classList.contains("foldFrame")) {
        return `\n\n> [!summary]+ ${el.querySelector(".foldTitle")?.textContent ?? ""}\n> ${convertToMarkdown(
            el.querySelector(".foldContent")
        )
            .split("\n")
            .join("\n> ")}\n`;
    }

    if (el.classList.contains("CodeContainer")) {
        var md = "";
        var msgtitle = " ";
        const titleEl = el.querySelector(".MessageName");
        const titleText = titleEl ? titleEl.textContent : null;
        for (const msel of el.children) {
            if (msel.classList.contains("MessageHeader")) {
                msgtitle = msel.textContent;
            } else if (msel.classList.contains("mailFrame")) {
                md += `\n> ---`;
                const plotOptions = [...msel.querySelectorAll(".mailOptions")];
                const plotContent = [...msel.querySelectorAll(".messageContent:has(*)")];

                for (let i = 0; i < plotOptions.length; i++) {
                    md += `\n> > ${plotOptions[i].textContent}`;
                    if (plotContent.length > 0) {
                        md += `\n> *\t${processHsrMsgElement(plotContent[i])}`;
                    }
                    md += `\n> `;
                }
                md += `\n> ---`;
            } else {
                md += `\n> - ${processHsrMsgElement(msel)}`;
            }
        }
        md = `\n> <span class="talk">${titleEl.innerHTML}</span>${md}`;
        return `\n\n${md}\n`;
    }

    if (el.classList.contains("resourceLoader") || el.querySelector("script")) {
        return "\n";
    }

    if (el.tagName === "CENTER") {
        var img = el.querySelector(".showOnBox>.showOn");
        if (img) {
            return `\n\n${img.innerHTML}\n`;
        } else {
            return `\n\n<CENTER>${el.innerHTML}</CENTER>\n`;
        }
    }

    if (el.tagName === "DL") {


        return "\n" + convertToMarkdown(el)
            .split("\n")
            .map(a => a.trim() === "" ? "" : a.trim())
            .join("\n") + "\n";

    }

    if (el.tagName === "BLOCKQUOTE") {
        el.querySelectorAll('img').forEach(img => img.remove());
        return "\n> " + convertToMarkdown(el)
            .split("\n")
            .join("\n> ") + "\n";
    }

    if (el.tagName === 'LI') {
        return `*\t` + convertToMarkdown(el) + "\n"
    }

    if (el.tagName === 'H3') {
        return `\n### ` + convertToMarkdown(el) + "\n"
    }
    return "\n\n" + convertToMarkdown(el);
}

async function fetchAndExtract(url) {

    const response = await fetch(url);
    const data = await response.text();
    const dom = new JSDOM(data.replace("•", "·"));
    const doc = dom.window.document;

    doc.querySelectorAll('a').forEach(link => {
        const textNode = doc.createTextNode(link.textContent);
        link.replaceWith(textNode);
    });
    const h1 = doc.querySelector("h1")?.textContent;
    var el = doc.querySelector("h2:has(#剧情内容)").nextElementSibling;
    var output = url + "\n\n## " + h1 + "\n\n"

    while (true) {

        output += processHTMLElement(el);
        el = el.nextElementSibling;

        if (el === null) break;
    }


    saveFile(`public/scripts/TODO/${h1.replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
        .replace(/[. ]+$/, "")
        .replace(/^(con|prn|aux|nul|com\d|lpt\d)$/i, "_$1")}.md`, cleanUpMd(output))

}

async function saveFile(filename, content) {
    await writeFile(filename, content, { encoding: "utf-8" });
}


`
https://wiki.biligame.com/sr/%E6%97%85%E8%BF%9B%E9%9D%92%E9%9C%84%EF%BC%8C%E4%B8%8D%E9%80%9F%E4%B9%8B%E9%82%80
https://wiki.biligame.com/sr/%E8%A1%8C%E9%81%8F%E6%B5%81%E4%BA%91%EF%BC%8C%E8%BA%AB%E5%85%A5%E9%AD%94%E9%98%B4
https://wiki.biligame.com/sr/%E7%B4%AB%E5%BA%9C%E9%80%9A%E8%B0%92%EF%BC%8C%E5%B0%86%E5%86%9B%E5%AE%9A%E7%AD%96
https://wiki.biligame.com/sr/%E6%97%A7%E5%BD%B1%E5%A9%86%E5%A8%91%EF%BC%8C%E8%BF%BD%E6%80%9D%E9%94%99%E8%90%BD
https://wiki.biligame.com/sr/%E7%8A%AC%E8%BF%B9%E8%BF%BD%E4%BB%8E%EF%BC%8C%E8%B0%9B%E5%90%AC%E7%8B%90%E8%B8%AA
https://wiki.biligame.com/sr/%E8%BF%B4%E6%98%9F%E5%91%A8%E6%97%8B%EF%BC%8C%E6%9C%AA%E5%8D%9C%E7%9F%A5%E5%85%88
https://wiki.biligame.com/sr/%E9%95%BF%E4%B9%90%E6%96%B0%E6%9C%8B%EF%BC%8C%E9%9D%92%E9%B8%9F%E5%80%99%E9%A3%8E
https://wiki.biligame.com/sr/%E6%9E%81%E6%95%B0%E9%97%AE%E7%8E%84%EF%BC%8C%E5%8E%86%E4%BA%8B%E7%A9%B7%E8%A7%82
https://wiki.biligame.com/sr/%E7%A5%9E%E6%9C%A8%E9%87%8D%E8%90%8C%EF%BC%8C%E6%8E%A3%E8%BD%AC%E5%A4%A9%E8%A1%A1
https://wiki.biligame.com/sr/%E8%AF%B8%E5%A4%A9%E6%97%A0%E5%AE%89%EF%BC%8C%E8%BF%B7%E9%80%94%E9%9A%BE%E8%BF%94
https://wiki.biligame.com/sr/%E8%8C%B8%E5%AE%A2%E9%B8%A3%E5%91%A6%EF%BC%8C%E7%8E%89%E8%A7%92%E7%9B%98%E8%99%AC
https://wiki.biligame.com/sr/%E9%87%91%E9%BC%8E%E7%81%B5%E6%A0%91%EF%BC%8C%E7%A9%B7%E9%80%94%E6%A2%BC%E6%9D%8C
https://wiki.biligame.com/sr/%E8%9E%A3%E8%9B%87%E6%97%A0%E7%A9%B4%EF%BC%8C%E6%97%A7%E6%A2%A6%E4%BA%A1%E9%98%99
https://wiki.biligame.com/sr/%E8%9E%A3%E8%9B%87%E6%97%A0%E7%A9%B4%EF%BC%8C%E6%97%A7%E6%A2%A6%E4%BA%A1%E9%98%99
https://wiki.biligame.com/sr/%E5%BE%97%E5%85%B6%E9%9B%A8%E9%9C%B2%EF%BC%8C%E5%AE%89%E5%85%B6%E5%A3%A4%E5%9C%9F
https://wiki.biligame.com/sr/%E5%BE%97%E5%85%B6%E9%9B%A8%E9%9C%B2%EF%BC%8C%E5%AE%89%E5%85%B6%E5%A3%A4%E5%9C%9F
https://wiki.biligame.com/sr/%E6%9C%89%E9%BE%99%E7%9F%AB%E7%9F%AB%EF%BC%8C%E5%85%B6%E6%B8%8A%E6%B8%BA%E6%B8%BA
https://wiki.biligame.com/sr/%E4%BB%99%E9%AA%B8%E6%88%90%E7%A9%BA%EF%BC%8C%E5%A4%A7%E5%8A%AB%E6%9C%89%E7%BB%88
https://wiki.biligame.com/sr/%E5%AE%89%E7%81%B5%E5%B8%83%E5%A5%A0%EF%BC%8C%E5%A4%A9%E6%B8%85%E8%B7%AF%E8%BF%9C

`.split("\n").map(a => a.trim()).filter(a => a !== "").forEach(url => {
    try {
        fetchAndExtract(url).catch((error) => {
            console.error("Failed: " + url)
            console.error(error)
        })
    } catch (error) {
        console.error(error)
    }
})






