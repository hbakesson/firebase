/**
 * Safely formats a date for use in the UI, handling both Date objects
 * (from Cloud SQL/Prisma) and ISO strings (from Mock Data / Serialization).
 * 
 * Returns "N/A" if the date is invalid or missing.
 */
export function formatDate(date: Date | string | number | null | undefined): string {
  if (!date) return "N/A";

  const d = new Date(date);
  
  // Check if the date is "Invalid Date"
  if (isNaN(d.getTime())) {
    return "N/A";
  }

  // Stable, non-locale dependent format to prevent hydration errors: MM/DD/YYYY
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();

  return `${month}/${day}/${year}`;
}
