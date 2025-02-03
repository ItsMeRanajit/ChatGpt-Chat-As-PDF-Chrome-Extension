import "./index.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import ContentPage from "./content/content";

// Delay function to allow time for the target button to load
setTimeout(() => {
  const root = document.createElement("div");
  const parentElement = document.querySelector('[data-testid="share-chat-button"]');

  if (parentElement) {
    root.id = "gpt-summarizer-container";
    parentElement.parentNode.insertBefore(root, parentElement);
    createRoot(root).render(
      <StrictMode>
        <ContentPage />
      </StrictMode>
    );
  } else {
    console.error("Target element not found!");
  }
}, 5000); // Wait for 2 seconds before executing
