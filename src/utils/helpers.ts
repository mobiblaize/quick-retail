// utils/dateFormatter.ts
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const datePart = date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart} ${timePart}`; // 👈 no "at", no seconds
};


  
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
  
  export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  
  export function formatMoney(amount: number | string, decimals: number = 2): string {
    const num = typeof amount === 'number' ? amount : parseFloat(amount);
    if (isNaN(num)) return "0.00";
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
export const getPercent = (val: number, total: number) =>
total > 0 ? `${((val / total) * 100).toFixed(1)}%` : "0%";
