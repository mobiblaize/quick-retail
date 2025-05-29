// utils/dateFormatter.ts
export function formatDate(dateString: string): string {
    if (!dateString) return "N/A";
  
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }
  
  export function shortenTransactionId(id: string, length = 8): string {
    if (!id) return "";
    // Remove dashes to get a clean substring, optional
    const cleanId = id.replace(/-/g, "");
    return cleanId.length > length ? cleanId.slice(0, length) : cleanId;
  }
  export function toSentenceCase(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  export const formatCurrency = (amount: number) => {
    if (isNaN(amount)) return "₦ 0";
    return `₦ ${amount.toLocaleString()}`;
  };
  export function truncateText(text: string, length = 10) {
    return text.length > length ? text.slice(0, length) + "..." : text;
  }
  
  