'use client';

import Link from 'next/link';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold text-black mb-6">4. Vérifiez votre demande</h2>

        <p className="text-gray-700 mb-4">
          L&apos;hôte a 24 heures pour confirmer votre réservation. Nous vous débiterons une fois
          la demande acceptée.
        </p>

        <p className="text-gray-700 mb-6">
          En sélectionnant le bouton, j&apos;accepte les{' '}
          <Link href="/terms" className="text-blue-600 underline">
            conditions de réservation
          </Link>
          .
        </p>

        <Link
          href="/stripe-simulation"
          className="block w-full bg-black text-white font-bold text-center py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Confirmer et payer
        </Link>

        <p className="text-xs text-gray-400 mt-6 text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            Retour à l&apos;accueil
          </Link>
        </p>
      </div>
    </div>
  );
}
