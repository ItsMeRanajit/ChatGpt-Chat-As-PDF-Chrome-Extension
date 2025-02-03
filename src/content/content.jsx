import React from "react";
import { BsStars } from "react-icons/bs";
import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js";

const ContentPage = () => {
  const [text, setText] = useState("");

  const extractHtml = () => {
    const messages = document.querySelectorAll('div[class*="whitespace-pre-wrap"], div[class*="markdown"], h6.sr-only, h5.sr-only');
    const heading = document.querySelector("title").innerText;
    if (messages) {
      let chatHistory = "";

      messages.forEach((msg, index) => {
        const clonedMsg = msg.cloneNode(true);
        clonedMsg.querySelectorAll("button").forEach((button) => button.remove());

        const cleanHtml = clonedMsg.outerHTML;

        if (msg.innerText.trim() === "You said:" || msg.innerText.trim() === "ChatGPT said:") {
          msg.innerText.trim() === "You said:"
            ? (chatHistory += `<div style="color: green; font-size:x-large; margin-top:30px; margin-bottom:10px" >${cleanHtml}</div>\n\n`)
            : (chatHistory += `<div style="color: #0470bd; font-size:x-large; margin-top:30px; margin-bottom:10px" >${cleanHtml}</div>\n\n`);
        } else {
          chatHistory += `${cleanHtml}\n\n`;
        }
      });
      const finalHtml = cleanHtmlCode(chatHistory);
      // console.log(finalHtml);

      let htmlCode = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${heading}</title>
          <style>
            pre {
              padding: 20px 50px;
              border-radius: 20px;
              border: 2px solid #9a9999;
              background-color: #000000d7;
              color: white;
              word-wrap: break-word;
              white-space: pre-wrap;
              overflow-wrap: break-word;
              font-size: small;
            }
      
            body {
              text-align: left;
              line-height:1.5;
              color:black;
            }

            .heading-post-footballgame {
              font-size: 30px;
              font-weight: bold;
              text-align: center;
              color: #0653e0;
            }
          </style>
        </head>
        <body>
          <div class="heading-post-footballgame">${heading}</div>
          ${finalHtml}
        </body>
      </html>`;

      console.log(htmlCode);
      setText(chatHistory);
      setTimeout(() => {
        downloadPDF(htmlCode, heading);
      }, 2000);
    } else {
      setText(null);
    }
  };

  const cleanHtmlCode = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    doc.querySelectorAll("[class], [id]").forEach((el) => {
      el.removeAttribute("class");
      el.removeAttribute("id");
    });

    return doc.documentElement.outerHTML;
  };

  const downloadPDF = (htmlCode, heading) => {
    const createElement = document.createElement("html");
    if (!createElement) console.log("none");
    createElement.innerHTML = htmlCode;

    const options = {
      margin: 15,
      filename: "chat.pdf",
      image: {
        type: "jpeg",
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };
    html2pdf().from(createElement).set(options).save(`${heading}.pdf`);
  };

  return (
    <button
      className="rounded-full text-gray-100 bg-gray-800 border-2 border-gray-100 text-[.875rem] leading-[1.25rem] py-2 px-1 flex gap-1 justify-center items-center w-30 cursor-pointer font-normal"
      onClick={() => {
        extractHtml();
      }}
    >
      <div>Add Note</div>
      <BsStars color="white" size={20} />
    </button>
  );
};

export default ContentPage;
