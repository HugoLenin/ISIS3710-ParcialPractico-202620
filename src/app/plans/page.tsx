import { getPlans } from "@/services/plans";
import PlansList from "@/components/PlansList";

export default async function PlansPage() {
  const plans = await getPlans();

  return <PlansList plans={plans} />;
}
