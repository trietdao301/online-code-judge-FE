import { format, parseISO } from "date-fns";

export function formatDateTime(dateTimeString: string | undefined): string {
  if (!dateTimeString) return "N/A";

  try {
    const date = parseISO(dateTimeString);
    return format(date, "MMM d, yyyy h:mm a");
  } catch (error) {
    console.error("Error parsing date:", error);
    return "Invalid Date";
  }
}
