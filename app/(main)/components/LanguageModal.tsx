'use client';

import { useState, useEffect } from 'react';

const KEY_LANG = 'homiqio_lang';
const KEY_AUTO_TRANSLATE = 'homiqio_autoTranslate';
const KEY_CURRENCY = 'homiqio_currency';

const LANG_OPTIONS: { code: string; name: string; region: string }[] = [
  { code: 'fr-FR', name: 'Français', region: 'France' },
  { code: 'en-US', name: 'English', region: 'United States' },
  { code: 'en-GB', name: 'English', region: 'United Kingdom' },
  { code: 'en-AU', name: 'English', region: 'Australia' },
  { code: 'en-CA', name: 'English', region: 'Canada' },
  { code: 'de-DE', name: 'Deutsch', region: 'Deutschland' },
  { code: 'es-ES', name: 'Español', region: 'España' },
  { code: 'it-IT', name: 'Italiano', region: 'Italia' },
  { code: 'pt-PT', name: 'Português', region: 'Portugal' },
  { code: 'nl-NL', name: 'Nederlands', region: 'Nederland' },
];

const SUGGESTED_LANGS = ['en-US', 'en-GB', 'fr-FR'];

const CURRENCY_OPTIONS: { code: string; label: string }[] = [
  { code: 'EUR', label: 'Euro (EUR)' },
  { code: 'USD', label: 'US Dollar (USD)' },
  { code: 'GBP', label: 'British Pound (GBP)' },
];

function getStoredLang(): string {
  if (typeof window === 'undefined') return 'fr-FR';
  try {
    return localStorage.getItem(KEY_LANG) || 'fr-FR';
  } catch {
    return 'fr-FR';
  }
}

function getStoredAutoTranslate(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(KEY_AUTO_TRANSLATE) === 'true';
  } catch {
    return false;
  }
}

function getStoredCurrency(): string {
  if (typeof window === 'undefined') return 'EUR';
  try {
    return localStorage.getItem(KEY_CURRENCY) || 'EUR';
  } catch {
    return 'EUR';
  }
}

export default function LanguageModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'lang' | 'currency'>('lang');
  const [lang, setLang] = useState('fr-FR');
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [currency, setCurrency] = useState('EUR');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLang(getStoredLang());
    setAutoTranslate(getStoredAutoTranslate());
    setCurrency(getStoredCurrency());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(KEY_LANG, lang);
      document.documentElement.lang = lang.split('-')[0];
    } catch {}
  }, [lang, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(KEY_AUTO_TRANSLATE, autoTranslate ? 'true' : 'false');
    } catch {}
  }, [autoTranslate, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(KEY_CURRENCY, currency);
    } catch {}
  }, [currency, mounted]);

  const langName = LANG_OPTIONS.find((l) => l.code === lang)?.name ?? 'Français';
  const currencyLabel = CURRENCY_OPTIONS.find((c) => c.code === currency)?.label ?? 'Euro (EUR)';

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white rounded-t-2xl">
          <h2 id="modal-title" className="text-xl font-semibold text-[#222222]">
            Langue et région
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -m-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fermer"
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
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-8 mb-6 border-b border-gray-300">
            <button
              type="button"
              onClick={() => setActiveTab('lang')}
              className={`pb-3 text-sm ${
                activeTab === 'lang'
                  ? 'border-b-2 border-gray-900 font-semibold text-[#222222]'
                  : 'text-gray-600 hover:text-gray-900 font-medium'
              }`}
            >
              Langue et région
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('currency')}
              className={`pb-3 text-sm ${
                activeTab === 'currency'
                  ? 'border-b-2 border-gray-900 font-semibold text-[#222222]'
                  : 'text-gray-600 hover:text-gray-900 font-medium'
              }`}
            >
              Devise
            </button>
          </div>

          {activeTab === 'lang' && (
            <div>
              <div className="mb-6">
                <h3 className="text-base font-semibold text-[#222222] mb-2">
                  Traduction ⇌
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Traduire automatiquement les descriptions et les commentaires en{' '}
                  <span>{langName}</span>.
                </p>
                <button
                  type="button"
                  role="switch"
                  aria-checked={autoTranslate}
                  onClick={() => setAutoTranslate((v) => !v)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                    autoTranslate ? 'bg-[#E91E63]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform"
                    style={{
                      transform: autoTranslate ? 'translateX(1.25rem)' : 'translateX(0)',
                    }}
                  />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-base font-semibold text-[#222222] mb-3">
                  Langues et régions suggérées
                </h3>
                <div className="flex flex-wrap gap-3">
                  {LANG_OPTIONS.filter((l) => SUGGESTED_LANGS.includes(l.code)).map(
                    (option) => (
                      <button
                        key={option.code}
                        type="button"
                        onClick={() => setLang(option.code)}
                        className={`px-4 py-3 border rounded-xl text-left hover:border-gray-400 ${
                          lang === option.code
                            ? 'border-[#E91E63] ring-2 ring-[#E91E63]'
                            : 'border-gray-300'
                        }`}
                      >
                        <span className="block font-semibold text-[#222222]">
                          {option.name}
                        </span>
                        <span className="block text-sm text-gray-600">
                          {option.region}
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#222222] mb-3">
                  Choisissez une langue et une région
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                  {LANG_OPTIONS.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => setLang(option.code)}
                      className={`text-left px-3 py-2 rounded-lg hover:bg-gray-100 ${
                        lang === option.code ? 'ring-2 ring-[#E91E63]' : ''
                      }`}
                    >
                      <span className="font-semibold text-[#222222]">
                        {option.name}
                      </span>
                      <span className="block text-sm text-gray-600">
                        {option.region}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'currency' && (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Devise préférée : <strong>{currencyLabel}</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {CURRENCY_OPTIONS.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => setCurrency(option.code)}
                    className={`px-4 py-2 border rounded-lg hover:border-gray-400 font-medium ${
                      currency === option.code
                        ? 'border-[#E91E63] ring-2 ring-[#E91E63]'
                        : 'border-gray-300'
                    }`}
                  >
                    {option.code}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
