import RoleCard from "./userRole";


const roleData = [
  {
    initials: "AR",
    title: "Admin Role",
    userCount: 4,
    description:
      "Full access to system functionalities, including editing but needs approval from super.",
    status: true,
    date: "April 11, 2024",
  },
  {
    initials: "VR",
    title: "Viewer Role",
    userCount: 10,
    description:
      "Views system data without permission to edit or make changes.",
    status: true,
    date: "April 11, 2024",
  },
  {
    initials: "SAR",
    title: "Super Admin Role",
    userCount: 2,
    description:
      "Full access to system functionalities, including editing and administrative controls.",
    status: true,
    date: "April 11, 2024",
  },
  {
    initials: "FR",
    title: "Finance Role",
    userCount: 6,
    description:
      "Manages and oversees the subscription, refunds and cancellation processes.",
    status: false,
    date: "April 11, 2024",
  },
  {
    initials: "DR",
    title: "Default Role",
    userCount: 3,
    description:
      "Automatically assigned when no specific role is designated. Limited access rights apply.",
    status: true,
    date: "April 11, 2024",
  },
  {
    initials: "SR",
    title: "Support Role",
    userCount: 10,
    description:
      "Manages and oversees the support. Ensures reported issues are reported and resolved.",
    status: true,
    date: "April 11, 2024",
  },
];

export default function RoleGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
      {roleData.map((role, index) => (
        <RoleCard key={index} {...role} />
      ))}
    </div>
  );
}
