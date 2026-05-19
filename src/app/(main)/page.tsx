import { HeroSection } from "../../components/home/HeroSection";
import { FeaturedEstatesSection } from "../../components/home/FeaturedEstatesSection";
import { RecentListingsSection } from "../../components/home/RecentListingsSection";
import { getFeaturedProperties, getRecentProperties } from "../../lib/queries";


export default async function HomePage() {
  const [featured, recent] = await Promise.all([
    getFeaturedProperties(3),
    getRecentProperties(4),
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-12 py-8">
      
        <HeroSection />

        <FeaturedEstatesSection properties={featured} />

        <RecentListingsSection properties={recent} />
      </div>
    </div>
  );
}
