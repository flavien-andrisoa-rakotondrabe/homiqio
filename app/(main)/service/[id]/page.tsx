import PlaceholderPage from '../../../components/PlaceholderPage';

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PlaceholderPage
      title={`Service (id: ${id})`}
      description="Détail d'un service. À personnaliser."
    />
  );
}
