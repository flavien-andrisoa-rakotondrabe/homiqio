'use client';

import Link from 'next/link';

function maskEmail(email: string | null | undefined): string {
  if (!email || email.indexOf('@') < 1) return '';
  const i = email.indexOf('@');
  return email.charAt(0) + '***' + email.charAt(i - 1) + email.substring(i);
}

export default function ProfilePage() {
  const user = typeof window !== 'undefined' ? (window as unknown as { __user?: { name?: string; first_name?: string; last_name?: string; email?: string } }).__user : null;
  const displayName = user?.name ?? (user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : '');
  const firstName = user?.first_name ?? '';
  const email = user?.email ?? '';

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-6 md:py-8 w-full">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/client-space"
            className="md:hidden p-1 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
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
              className="w-6 h-6 text-[#222222]"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </Link>
          <h2 className="text-lg md:text-2xl font-semibold text-[#222222]">
            Informations personnelles
          </h2>
        </div>

        <div className="space-y-0">
          <div className="border-b border-gray-200 py-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-sm md:text-base mb-1 font-semibold text-[#222222]">
                  Nom officiel
                </h4>
                <p className="text-sm text-gray-600">
                  {displayName || '—'}
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 py-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-sm md:text-base mb-1 font-semibold text-[#222222]">
                  Prénom d&apos;usage
                </h4>
                <p className={`text-sm ${firstName ? 'text-gray-600' : 'text-blue-600'}`}>
                  {firstName || 'Information non fournie'}
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 py-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-sm md:text-base mb-1 font-semibold text-[#222222]">
                  Adresse e-mail
                </h4>
                <p className="text-sm text-gray-600">
                  {email ? maskEmail(email) : '—'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
