import { notifications } from "@mantine/notifications";

export const handleOpenEmail = (email: string) => {
  if (email) {
    const emailDomain = email.split("@")[1];

    // Redirect to popular email providers based on the domain
    if (emailDomain.includes("gmail.com")) {
      window.open("https://mail.google.com/");
    } else if (emailDomain.includes("yahoo.com")) {
      window.open("https://mail.yahoo.com/", "_blank");
    } else if (
      emailDomain.includes("outlook.com") ||
      emailDomain.includes("hotmail.com")
    ) {
      window.open("https://outlook.live.com/", "_blank");
    } else if (emailDomain.includes("yopmail.com")) {
      const yopmailUser = email.split("@")[0];
      window.open(`https://yopmail.com/?${yopmailUser}`);
    } else {
      // Fallback to a generic email client link
      window.location.href = `mailto:${email}`;
    }
  } else {
    notifications.show({
      title: "Error",
      message: "Unable to determine email provider.",
      color: "red",
    });
  }
};
