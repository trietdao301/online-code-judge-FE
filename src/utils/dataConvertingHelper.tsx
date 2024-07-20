export const getMemoryLimitInBytes = (value: number, unit: string): number => {
  const BYTES_PER_MB = 1024 * 1024;
  const BYTES_PER_GB = 1024 * 1024 * 1024;

  switch (unit) {
    case "Gigabyte":
      return value * BYTES_PER_GB;
    case "Megabyte":
      return value * BYTES_PER_MB;
    default:
      // Assuming the default case is already in bytes
      return value;
  }
};

export const getTimeLimitInMilliseconds = (
  value: number,
  unit: string,
): number => {
  const MILLISECONDS_PER_SECOND = 1000;
  const SECONDS_PER_MINUTE = 60;
  const MINUTES_PER_HOUR = 60;

  switch (unit) {
    case "Second":
      return value * MILLISECONDS_PER_SECOND;
    case "Minute":
      return value * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
    case "Hour":
      return (
        value * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND
      );
    default:
      // Assuming the default case is already in milliseconds
      return value;
  }
};
