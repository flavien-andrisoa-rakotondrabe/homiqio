/**
 * Page squelette pour les routes recréées depuis le build.
 * À remplacer par le vrai contenu quand vous modifiez la page.
 */
export default function PlaceholderPage({
  title,
  description = 'Contenu à personnaliser. Cette page correspond à une route du site en production.',
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#222222]">
          {title}
        </h1>
        <p className="text-gray-600 mt-3">{description}</p>
      </div>
    </div>
  );
}
