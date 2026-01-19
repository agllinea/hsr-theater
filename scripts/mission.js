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
https://wiki.biligame.com/sr/%E7%BA%B7%E4%BA%89%E5%95%8A%EF%BC%8C%E4%BC%90%E6%B8%85%E6%B9%AE%E9%80%94%E7%9A%84%E6%82%BC%E6%83%A7
https://wiki.biligame.com/sr/%E8%8D%A3%E8%80%80%E5%95%8A%EF%BC%8C%E4%B8%8D%E5%BF%8D%E5%8D%92%E9%A5%AE%E7%9A%84%E9%B8%A9%E9%85%92
https://wiki.biligame.com/sr/%E8%B0%A7%E6%9E%97%E5%95%8A%EF%BC%8C%E5%AF%A4%E6%80%9D%E8%80%85%E7%BC%98%E4%BD%95%E5%A4%B1%E8%AF%AD
https://wiki.biligame.com/sr/%E6%82%B2%E9%9F%B3%E5%95%8A%EF%BC%8C%E8%8E%AB%E8%AE%A9%E7%94%9F%E8%80%85%E7%A9%BA%E5%9E%82%E6%B6%95
https://wiki.biligame.com/sr/%E6%97%A7%E5%BF%86%E5%95%8A%EF%BC%8C%E7%83%AD%E9%9B%BE%E4%B8%AD%E6%98%BE%E9%9A%90%E6%89%91%E6%9C%94
https://wiki.biligame.com/sr/%E9%97%A8%E6%89%89%E5%95%8A%EF%BC%8C%E5%8F%A9%E5%A3%B0%E4%BB%8D%E6%BF%80%E8%8D%A1%E6%A2%A6%E4%B8%AD
https://wiki.biligame.com/sr/%E4%BB%87%E5%AF%87%E5%95%8A%EF%BC%8C%E4%B8%94%E9%A2%86%E5%8F%97%E9%87%91%E8%A1%80%E7%83%A7%E7%81%BC
https://wiki.biligame.com/sr/%E7%8E%8B%E5%BA%A7%E5%95%8A%EF%BC%8C%E7%BB%88%E4%BA%86%E9%82%A3%E6%95%B0%E8%BD%BD%E7%B4%A2%E5%AF%9E
https://wiki.biligame.com/sr/%E6%9D%A5%E8%B7%AF%E5%95%8A%EF%BC%8C%E8%AF%B7%E5%86%8D%E5%BA%A6%E6%98%BE%E6%98%A0%E5%BE%80%E5%B1%A5


    `,
    true,
    "门扉之启，王座之终"
);
