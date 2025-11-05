import { useState } from "react";
import { FaCaretRight ,FaCaretDown} from "react-icons/fa6";
export default function DayCollapse({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-4 py-3 bg-gray-100 dark:bg-gray-800 font-medium text-green-900 dark:text-gray-100 flex items-center justify-between
"
      >
        <span>{title}</span>
        {open ? <FaCaretDown/> : <FaCaretRight />}
      </button>
      {open && (
        <div className="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}
