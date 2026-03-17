'use client';

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

export default function Header({ onGlobeClick }: { onGlobeClick: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-[#FCFCFC]">
      <div className="px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-1 flex-shrink-0">
            <span className="text-xl font-semibold text-[#222222]">HOMIQIO</span>
          </a>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={onGlobeClick}
              className="p-3 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
              aria-label="Langue et région"
            >
              <GlobeIcon className="w-4 h-4 text-[#222222]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
