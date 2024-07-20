export function formatMemory(bytesObj: Number | undefined): string {
  if (bytesObj === undefined) return "N/A";

  const bytes = bytesObj.valueOf();
  const GB = 1024 * 1024 * 1024;
  const MB = 1024 * 1024;

  if (bytes >= GB) {
    const gbs = bytes / GB;
    return `${Math.round(gbs)} GB`;
  } else {
    const mbs = bytes / MB;
    if (mbs >= 100) {
      return `${Math.round(mbs)} MB`;
    } else {
      return `${mbs.toFixed(1)} MB`;
    }
  }
}
