export const Badge = ({ children, variant, className }) => {
  const baseStyle = variant === "outline"
    ? "border border-gray-300 text-gray-800"
    : "bg-gray-100 text-gray-800";
  
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-sm font-medium ${baseStyle} ${className}`}>{children}</span>;
};
