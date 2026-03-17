'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

declare global {
  interface Window {
    Stripe?: (key: string) => any;
  }
}

export default function StripeSimulationPage() {
  const [publishableKey, setPublishableKey] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeElements, setStripeElements] = useState<any>(null);
  const [stripeInstance, setStripeInstance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const STORAGE_KEY = 'homiqio_auth_token';
  const [authToken, setAuthToken] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cardElementRef = useRef<any>(null);
  const [stripeScriptLoaded, setStripeScriptLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (saved?.trim()) {
        setAuthToken(saved.trim());
        setIsLoggedIn(true);
      }
    } catch (_) {}
  }, []);

  // 1. Récupérer la clé publique Stripe
  useEffect(() => {
    async function fetchStripeConfig() {
      try {
        const res = await fetch('https://api.homiqio.com/api/payments/config');
        if (!res.ok) {
          throw new Error(`Erreur API: ${res.statusText}`);
        }
        const data = await res.json();
        setPublishableKey(data.publishable_key);
        setLoading(false);
      } catch (err: any) {
        setError(`Impossible de récupérer la config Stripe: ${err.message}`);
        setLoading(false);
      }
    }
    fetchStripeConfig();
  }, []);

  // 2. Initialiser Stripe.js une fois la clé publique et le script chargés
  useEffect(() => {
    if (!publishableKey || !stripeScriptLoaded || typeof window === 'undefined' || !(window as any).Stripe || stripeInstance) return;
    try {
      const stripe = (window as any).Stripe(publishableKey);
      setStripeInstance(stripe);
      setStripeElements(stripe.elements());
    } catch (err: any) {
      setError(`Erreur d'initialisation Stripe: ${err.message}`);
    }
  }, [publishableKey, stripeScriptLoaded, stripeInstance]);

  // 3. Monter l'élément carte Stripe quand client_secret et elements sont prêts
  useEffect(() => {
    if (!clientSecret || !stripeElements) return;
    const cardElement = stripeElements.create('card', {
      style: { base: { fontSize: '16px', color: '#222' } },
    });
    cardElementRef.current = cardElement;
    cardElement.mount('#card-element');
    return () => {
      cardElement.unmount();
      cardElementRef.current = null;
    };
  }, [clientSecret, stripeElements]);

  // Fonction pour simuler la réservation et obtenir le client_secret
  const handleLogout = () => {
    try {
      if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
    setAuthToken('');
    setIsLoggedIn(false);
    setError(null);
  };

  // Fonction pour simuler la réservation et obtenir le client_secret
  const handleSimulateBooking = async () => {
    setError(null);
    if (!authToken) {
      setError("Veuillez vous connecter.");
      return;
    }
    setLoading(true);

    const dummyBookingData = {
      amount_cents: 25000, // 250.00 EUR
      property_id: 'simu-123',
      property_title: 'Appartement de Simulation',
      check_in: '2026-03-01',
      check_out: '2026-03-05',
      guests: 2,
    };

    try {
      const res = await fetch('https://api.homiqio.com/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(dummyBookingData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(`Erreur API: ${res.status} - ${errData.message || res.statusText}`);
      }

      const data = await res.json();
      setClientSecret(data.client_secret);
      try {
        if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, authToken);
        setIsLoggedIn(true);
      } catch (_) {}
    } catch (err: any) {
      setError(`Erreur lors de la création du Payment Intent: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour simuler la confirmation du paiement
  const handleConfirmPayment = async () => {
    setError(null);
    if (!stripeInstance || !clientSecret || !stripeElements) {
      setError("Stripe n'est pas complètement initialisé.");
      return;
    }
    setLoading(true);

    try {
      const cardEl = cardElementRef.current;
      if (!cardEl) {
        setError("Élément carte Stripe introuvable.");
        return;
      }
      const { error: confirmError } = await stripeInstance.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardEl,
          billing_details: {
            name: 'Client de Simulation',
            email: 'simulation@homiqio.com',
          },
        },
      });

      if (confirmError) {
        setError(`Erreur de confirmation de paiement: ${confirmError.message}`);
      } else {
        // Paiement réussi (le webhook met à jour la réservation côté API)
        alert("Paiement simulé réussi ! Le webhook devrait confirmer la réservation.");
        // Redirection simulée vers une page de confirmation de réservation
        router.push('/client-space/reservations');
      }
    } catch (err: any) {
      setError(`Erreur inattendue lors de la confirmation: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chargement de la simulation...</p>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://js.stripe.com/v3/"
        strategy="afterInteractive"
        onLoad={() => setStripeScriptLoaded(true)}
      />
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Simulation de Paiement Stripe</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Erreur:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {!clientSecret ? (
          <div className="space-y-4">
            {authToken ? (
              <>
                <div className="mb-4 p-3 border border-green-200 rounded-lg bg-green-50">
                  <p className="text-sm text-green-700 mb-2">Connecté. Votre session est reconnue.</p>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
                  >
                    Se déconnecter
                  </button>
                </div>
                <button
                  onClick={handleSimulateBooking}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Chargement...' : 'Simuler la réservation (obtenir client_secret)'}
                </button>
              </>
            ) : (
              <p className="text-gray-700 mb-4">
                Connectez-vous sur le site (bouton « Connexion ») pour pouvoir simuler la réservation.{' '}
                <a href="/login" className="text-blue-600 hover:underline">Aller à la connexion</a>
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-green-700 mb-4">Client Secret obtenu ! Vous pouvez maintenant entrer une carte de test pour la simulation de paiement.</p>
            <div id="card-element" className="p-3 border border-gray-300 rounded-md bg-white"></div>
            <button
              onClick={handleConfirmPayment}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Confirmation...' : 'Confirmer le paiement avec Stripe'}
            </button>
          </div>
        )}

        <p className="text-sm text-gray-500 mt-6 text-center">
          Utilisez les cartes de test Stripe pour la simulation.
          <a href="https://stripe.com/docs/testing#cards" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
            Voir les cartes de test
          </a>
        </p>

        <p className="text-xs text-gray-400 mt-2 text-center">
          N'oubliez pas d'exécuter `npm install` et `npm run dev` dans `homiqio-src`.
        </p>
        <p className="text-xs text-gray-400 text-center">
          Nécessite que `api.homiqio.com` soit configuré pour Stripe (clés `.env`).
        </p>
        <p className="text-xs text-center mt-2">
          <a href="/booking" className="text-blue-500 hover:underline">
            ← Simuler depuis une page réservation
          </a>
        </p>
      </div>
    </div>
    </>
  );
}
