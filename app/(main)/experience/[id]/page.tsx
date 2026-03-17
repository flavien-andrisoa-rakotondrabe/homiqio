import PlaceholderPage from '../../../components/PlaceholderPage';

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PlaceholderPage
      title={`Expérience (id: ${id})`}
      description="Détail d'une expérience. À personnaliser."
    />
  );
}
