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

  return d.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });
}
