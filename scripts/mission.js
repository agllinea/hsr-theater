import { writeFile } from "fs/promises";
import { JSDOM } from "jsdom";
import TurndownService from "turndown";

function convertToMarkdown(inputString) {
  try {
    const turndownService = new TurndownService();
    turndownService.keep(["ruby", "rb", "rt"]); // Keep ruby-related tags
    turndownService.remove("script");
    turndownService.remove("img");
    turndownService.addRule("ignoreLinks", {
      filter: "a",
      replacement: function (content) {
        return content; // Just return the text content, ignore the link
      },
    });
    turndownService.addRule("keepStyledSpans", {
      filter: function (node) {
        return (
          node.nodeName === "SPAN" &&
          (node.hasAttribute("style") || node.classList.contains("heimu"))
        );
      },
      replacement: function (content, node) {
        if (node.hasAttribute("style"))
          return (
            '<span style="' +
            node.getAttribute("style") +
            '">' +
            content +
            "</span>"
          );
        else if (node.classList.contains("heimu"))
          return '<span class="heimu">' + content + "</span>";
        else return content;
      },
    });
    return turndownService.turndown(inputString);
  } catch (error) {
    return "";
  }
}

function cleanUpMd(md) {
  const lines = md.split("\n");
  const result = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Rule 1: Add newline before ### headings
    if (trimmed.startsWith("###")) {
      if (result.length > 0 && result[result.length - 1].trim() !== "") {
        result.push("");
      }
      result.push(line);
      continue;
    }

    // Rule 2: Add newline before <span style if previous line starts with *
    if (trimmed.startsWith("<span style")) {
      if (
        result.length > 0 &&
        result[result.length - 1].trim().startsWith("*")
      ) {
        result.push("");
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
    if (line.trim() === "") {
      emptyCount++;
      if (emptyCount < 2) {
        cleaned.push(line);
      }
    } else {
      emptyCount = 0;
      cleaned.push(line);
    }
  }

  return cleaned.join("\n");
}

function processHsrMsgElement(el) {
  try {
    // Array.from(el.querySelectorAll(".NM-Container")).map(msg=>
    //     `* ${msg.children[0].textContent}`
    // )
    return `${el.querySelector(".NM-Container").children[0].textContent}：${
      el.querySelector(".NM-Container").children[1].textContent
    }`;
  } catch (error) {
    return `*${el.textContent}*`;
  }
}

function processHTMLElement(el) {
  if (el.classList.contains("tabber")) {
    return (
      "\n#### *开拓者性别决定开始*\n" +
      Array.from(el.querySelectorAll(".tabbertab"))
        .map((tab) => {
          return (
            `##### ${tab.getAttribute("title")}` +
            "\n" +
            Array.from(tab.children)
              .map((child) => processHTMLElement(child))
              .join("\n\n")
          );
        })
        .join("\n\n") +
      "\n#### *开拓者性别决定结束*\n"
    );
  }
  if (el.classList.contains("sr-collapse-frame")) {
    const titleEl = el.querySelector(".sr-collapse-title");
    const titleText = titleEl ? titleEl.textContent : null;

    // Get the content's innerHTML
    const contentEl = el.querySelector(".sr-collapse-content");
    const contentHTML = contentEl ? contentEl.innerHTML : null;
    return (
      `\n\n> > ${titleText}\n> ` +
      "\n> " +
      convertToMarkdown(contentHTML).split("\n").join("\n> ") +
      "\n\n"
    );
  }
  if (el.classList.contains("plotFrame")) {
    const plotOptions = [...el.querySelectorAll(".plotOptions")];
    const plotContent = [...el.querySelectorAll(".content:has(*)")];
    var md = "";
    for (let i = 0; i < plotOptions.length; i++) {
      md += `\n> ${plotOptions[i].textContent}\n`;
      if (plotContent.length > 0) {
        if (
          plotOptions[i]
            .querySelector(".plotIcon>img")
            .getAttribute("alt")
            .includes("退出")
        )
          md += `\n\n---\n\n`;
        else
          md += plotContent[i]
            ? `\n${[...plotContent[i].children].map((pc) => {
                return processHTMLElement(pc);
              })}\n`
            : "\n\n";
      }
    }
    return "\n\n---\n\n" + md + "\n\n---\n\n";
  }

  if (el.classList.contains("foldFrame")) {
    return `\n\n> [!summary]+ ${el.querySelector(".foldTitle")?.textContent ?? ""}\n> ${convertToMarkdown(
      el.querySelector(".foldContent"),
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
        const plotContent = [
          ...msel.querySelectorAll(".messageContent:has(*)"),
        ];

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
    return (
      "\n" +
      convertToMarkdown(el)
        .split("\n")
        .map((a) => (a.trim() === "" ? "" : a.trim()))
        .join("\n") +
      "\n"
    );
  }

  if (el.tagName === "BLOCKQUOTE") {
    el.querySelectorAll("img").forEach((img) => img.remove());
    return "\n> " + convertToMarkdown(el).split("\n").join("\n> ") + "\n";
  }

  if (el.tagName === "LI") {
    return `*\t` + convertToMarkdown(el) + "\n";
  }

  if (el.tagName === "H3") {
    return `\n### ` + convertToMarkdown(el) + "\n";
  }
  return "\n\n" + convertToMarkdown(el);
}

async function fetchAndExtract(url) {
  const response = await fetch(url);
  const data = await response.text();
  const dom = new JSDOM(data.replace("•", "·"));
  const doc = dom.window.document;

  doc.querySelectorAll("a").forEach((link) => {
    const textNode = doc.createTextNode(link.textContent);
    link.replaceWith(textNode);
  });
  const h1 = doc.querySelector("h1")?.textContent;
  var el = doc.querySelector("h2:has(#剧情内容)").nextElementSibling;
  var output = url + "\n\n## " + h1 + "\n\n";

  while (true) {
    output += processHTMLElement(el);
    el = el.nextElementSibling;

    if (el === null) break;
  }

  return { filename: h1, content: output };
}

async function saveFile(filename, content) {
  await writeFile(
    `public/scripts/TODO/${filename
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
      .replace(/[. ]+$/, "")
      .replace(/^(con|prn|aux|nul|com\d|lpt\d)$/i, "_$1")}.md`,
    cleanUpMd(content),
    { encoding: "utf-8" },
  );
}

async function main(urls = ``, asOne = false, filename = "Combined_Mission_Scripts") {
  const todolist = urls
    .split("\n")
    .map((a) => a.trim())
    .filter((a) => a !== "");
  if (asOne) {
    const combinedContents = [];
    for (const url of todolist) {
      try {
        const { content } = await fetchAndExtract(url);
        combinedContents.push(content);
      } catch (error) {
        console.error(error);
      }
    }
    const finalContent = combinedContents.join("\n\n---\n\n");
    await saveFile(filename, finalContent);
  } else {
    todolist.forEach(async (url) => {
      try {
        const { filename, content } = await fetchAndExtract(url);
        await saveFile(filename, content);
      } catch (error) {
        console.error(error);
      }
    });
  }
}

main(`
https://wiki.biligame.com/sr/%E8%AF%B8%E5%A4%A9%E6%97%A0%E5%AE%89%EF%BC%8C%E8%BF%B7%E9%80%94%E9%9A%BE%E8%BF%94


    `,
    // true,
    // "成为昨日的明天"
);

// node scripts/mission.js