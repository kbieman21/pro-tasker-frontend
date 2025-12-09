import type { ActionButtonProps } from "../types";


function CommonButton({ onClick, label, color = "blue" }: ActionButtonProps) {
  const colors = {
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    gray: "bg-gray-600 hover:bg-gray-700",
  };

  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-white rounded ${colors[color]}`}
    >
      {label}
    </button>
  );
}

export default CommonButton;
