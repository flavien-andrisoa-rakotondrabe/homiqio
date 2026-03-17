import PlaceholderPage from '../../../components/PlaceholderPage';

export default async function ReservationDetailPage({
  params,
}: {
  params: Promise<{ reservationId: string }>;
}) {
  const { reservationId } = await params;
  return (
    <PlaceholderPage
      title={`Réservation (${reservationId})`}
      description="Détail d'une réservation. À personnaliser."
    />
  );
}
