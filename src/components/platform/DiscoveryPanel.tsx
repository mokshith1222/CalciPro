import { CategoryHub } from "@/components/platform/CategoryHub";
import { SearchSystem } from "@/components/platform/SearchSystem";

export function DiscoveryPanel() {
  return (
    <section className="mt-12 space-y-8" aria-labelledby="calculator-discovery-title">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Discovery</p>
        <h2 id="calculator-discovery-title" className="mt-2 text-3xl font-black tracking-tight">
          Explore CalciPro
        </h2>
      </div>
      <SearchSystem />
      <CategoryHub />
    </section>
  );
}
