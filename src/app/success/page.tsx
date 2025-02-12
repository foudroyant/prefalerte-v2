'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const [status, setStatus] = useState('loading');
  const [customerEmail, setCustomerEmail] = useState('');
  const [name, setName] = useState('');
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      fetchSessionStatus();
    }
  }, [sessionId]);

  async function fetchSessionStatus() {
    const response = await fetch('/api/check-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    });

    const { session, full_name, error, isSubscribed } = await response.json();
    console.log(isSubscribed)

    if (error) {
      setStatus('failed');
      console.error(error);
      return;
    }

    // Vérifie si l'abonnement est déjà actif avant de le créer
    if (isSubscribed) {
      setStatus('subscribed');
    } else {
      setStatus(session.status);
    }
    setCustomerEmail(session['customer_email'] || '');
    setName(full_name);
  }

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
        {status === 'loading' ? (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Chargement en cours...</p>
          </div>
        ) : status === 'failed' ? (
          <div className="text-red-600">
            <h2 className="text-xl font-bold">⛔ Erreur</h2>
            <p className="text-gray-700 mt-2">Une erreur est survenue lors du traitement de votre abonnement.</p>
            <Link href="/pricing">
              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                Réessayer
              </button>
            </Link>
          </div>
        ) : status === 'subscribed' ? (
          <div>
            <h2 className="text-2xl font-bold text-green-600">🎉 Abonnement déjà actif !</h2>
            <p className="text-gray-700 mt-2">Vous êtes déjà abonné. Merci pour votre soutien !</p>
            <Link href="/subscribe">
              <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                Accéder à mon compte
              </button>
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-green-600">🎉 Merci {name || 'cher client'} !</h2>
            <p className="text-gray-700 mt-2">
              Votre abonnement est maintenant actif. 🎊 Nous sommes ravis de vous compter parmi nos membres.
            </p>
            <p className="text-gray-500 mt-4">
              Si vous avez des questions, notre équipe est là pour vous aider. Contactez-nous à tout moment ! ❤️
            </p>
            <Link href="/subscribe">
              <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                Accéder à mon compte
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
    </>
  );
}
