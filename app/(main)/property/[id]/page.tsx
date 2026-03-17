import PlaceholderPage from '../../../components/PlaceholderPage';

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PlaceholderPage
      title={`Logement (id: ${id})`}
      description="Fiche détaillée d'un logement. À personnaliser (galerie, description, réservation, etc.)."
    />
  );
}
