import PlaceholderPage from '../../components/PlaceholderPage';

export default async function HostOnboardingStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  return (
    <PlaceholderPage
      title={`Devenir hôte - Étape (${step})`}
      description="Étape du parcours devenir hôte. À personnaliser."
    />
  );
}
