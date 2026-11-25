
type DemoNoticeProps = {
  className?: string;
};

export function DemoNotice({ className = "" }: DemoNoticeProps) {
  return (
    <div
      role="status"
      className={`w-full border-b border-gray-200 bg-gray-100 px-4 py-3 ${className}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-center text-sm text-gray-600">
        <svg
          className="h-4 w-4 shrink-0 text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>

        <p>
          <span className="font-semibold text-gray-700">
            Demonstration mode.
          </span>{" "}
          All data is synthetic. Feel free to explore and make changes. All changes are local to this
          demo and will not affect the actual database.
        </p>
      </div>
    </div>
  );
}
