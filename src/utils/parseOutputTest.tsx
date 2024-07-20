// Add this new function to format the output
export function formatGradingResult(result: string | undefined): string {
  if (!result) return "";

  const lines = result.split("\n");
  const formattedLines = lines.map((line) => {
    if (line.startsWith("FAIL:") || line.startsWith("ERROR:")) {
      return `<span class="fail">${line}</span>`;
    } else if (line.startsWith("OK")) {
      return `<span class="pass">${line}</span>`;
    } else if (line.startsWith("    ")) {
      return `<span class="indent">${line}</span>`;
    } else {
      return line;
    }
  });

  return formattedLines.join("<br>");
}
