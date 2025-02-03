import React from "react";
import { BsStars } from "react-icons/bs";
import { useState } from "react";

const ContentPage = () => {
  const [text, setText] = useState("");
  const [prompt, setPrompt] = useState(false);

  const extractHtml = () => {
    const messages = document.querySelectorAll('div[class*="text-base"], div[class*="markdown"],h6.sr-only,h5.sr-only');
    if (messages) {
      let chatHistory = "";

      messages.forEach((msg, index) => {
        chatHistory += `${msg.innerText}\n\n`;
      });

      console.log("Extracted ChatGPT Conversation:\n", chatHistory);
      setText(chatHistory);
    } else {
      setText("Chat content not found.");
    }
  };

  const givePrompt = () => {
    const promptTextarea = document.getElementById("prompt-textarea");
    if (promptTextarea) {
      const pTag = promptTextarea.querySelector("p");
      if (pTag) {
        pTag.innerText =
          "Generate a detailed, study-friendly note with the title based on the content of the chat summarizing the entire chat conversation in HTML format with no explanation, only the code. Organize main questions and follow-up questions by topic or theme, using `<H2>` for main headings, `<H3>` for subheadings, and `<P>` for paragraphs. Include clear and simple explanations in plain English, with additional elaboration on topics with the most follow-ups. Use `<UL>` or `<OL>` for lists, `<CODE>` for inline code snippets, `<PRE><CODE>` for multi-line code blocks, and `<TABLE>`, `<THEAD>`, `<TBODY>`, `<TR>`, `<TH>`, and `<TD>` for organizing data or comparisons. Apply inline CSS for padding (e.g., `style='padding: 80px 120px;'`) to ensure readability, using a large font with `#4CAF50` for the main heading and `#2196F3` for other headings. Highlight key points, examples, or analogies for better understanding, and ensure the summary is well-structured and easy to study.";
        setPrompt(true);
        setTimeout(() => {
          giveSummary();
        }, 100);
      }
    }
  };

  const giveSummary = () => {
    const sendButton = document.querySelector('[data-testid="send-button"]');
    if (sendButton) {
      sendButton.click();
      startChecking();
    }
  };

  const startChecking = () => {
    const intervalId = setInterval(() => {
      const buttonElement = document.querySelector('[data-testid="stop-button"]'); // Selector for the button

      if (buttonElement) {
        console.log("on");
      } else {
        console.log("Button is gone, response finished.");
        setPrompt(false);
        getHtmlCode();
        clearInterval(intervalId);
      }
    }, 500);
  };
  const getHtmlCode = () => {
    const lastHtmlResponse = document.querySelector(".language-html:last-of-type");
    console.log(lastHtmlResponse);
    htmlCode = "";
    lastHtmlResponse.forEach((msg, index) => {
      htmlCode += `${msg.innerText}\n\n`;
    });
    console.log(htmlCode);
    // generatePdf(lastHtmlResponse);
  };

  // const generatePdf = (code) => {
  //   const { jsPDF } = window.jspdf;
  //   const doc = new jsPDF();

  //   // Get the content from the DOM

  //   // Render the HTML content into the PDF
  //   doc.html(code, {
  //     callback: function (doc) {
  //       // Save the generated PDF
  //       doc.save("html-rendered-pdf.pdf");
  //     },
  //     margin: [10, 10, 10, 10], // Optional margins for the PDF
  //     x: 10, // Starting x-coordinate
  //     y: 10, // Starting y-coordinate
  //   });
  // };

  return (
    <button
      className="rounded-full text-gray-100 bg-gray-800 border-2 border-gray-100 text-[.875rem] leading-[1.25rem] py-2 px-1 flex gap-1 justify-center items-center w-30 cursor-pointer font-normal"
      onClick={() => {
        givePrompt();
      }}
    >
      {!prompt ? <div>Add Note</div> : <div>Loading</div>}
      <BsStars color="white" size={20} />
    </button>
  );
};

export default ContentPage;
