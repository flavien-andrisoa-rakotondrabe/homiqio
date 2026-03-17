export default function HomePage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-20 py-12">
      <h1 className="text-2xl md:text-3xl font-semibold text-[#222222] mb-4">
        Test : Globe → Langues et devise
      </h1>
      <p className="text-gray-600 mb-6">
        Cliquez sur l’icône globe dans l’en-tête pour ouvrir la modale « Langue et région » / « Devise ».
      </p>
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-sm text-gray-700">
          La modale permet de choisir la langue, activer la traduction automatique et sélectionner la devise.
        </p>
      </div>
    </div>
  );
}
