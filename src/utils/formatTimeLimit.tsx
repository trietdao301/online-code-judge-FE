export function formatTimeLimit(milliseconds: Number | undefined): string {
  if (milliseconds === undefined) return "N/A";

  const ms = milliseconds.valueOf();

  if (ms < 1000) {
    return `${ms} ms`;
  } else if (ms < 60000) {
    const seconds = ms / 1000;
    return `${seconds.toFixed(1)} s`;
  } else {
    const minutes = Math.floor(ms / 60000);
    const seconds = (ms % 60000) / 1000;
    if (seconds === 0) {
      return `${minutes} min`;
    } else {
      return `${minutes} min ${seconds.toFixed(0)}s`;
    }
  }
}
