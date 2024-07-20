import React from "react";

interface ParseHTMLProps {
  htmlString?: string;
  className?: string;
}

export const ParseHTML: React.FC<ParseHTMLProps> = ({
  htmlString = "",
  className = "",
}) => {
  const parseHTML = (html: string): string => {
    // Remove <p> and </p> tags
    let text = html.replace(/<\/?p>/g, "");

    // Replace <br> with newline
    text = text.replace(/<br\s*\/?>/g, "\n");

    // Replace <strong> with bold styling
    text = text.replace(/<strong>(.*?)<\/strong>/g, "<b>$1</b>");

    // Replace <em> with italic styling
    text = text.replace(/<em>(.*?)<\/em>/g, "<i>$1</i>");

    // Remove any extra whitespace
    text = text.replace(/\s+/g, " ").trim();

    return text;
  };

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: parseHTML(htmlString) }}
    />
  );
};
