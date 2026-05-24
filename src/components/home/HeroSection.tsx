import { PropertyFilters } from "../property/PropertyFilters";

export function HeroSection() {
  return (
    <section className="relative min-h-[680px] overflow-hidden rounded-3xl">
     
      <div className="absolute inset-0">
        <img
          src="https://plus.unsplash.com/premium_photo-1679856789424-f4dc3c855845?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMzfHxob3VzaW5nfGVufDB8fDB8fHww"
          alt="Luxury property in Ethiopia"
          className="h-full w-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/60 to-slate-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      </div>

    
<div className="relative flex min-h-[680px] flex-col justify-center px-3 py-10 sm:px-12 lg:px-16">
  
  {/* TEXT CONTENT */}
  <div className="mx-auto w-full max-w-7xl">
    <div className="max-w-3xl space-y-3">
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
          Ethiopia's Premier Property Marketplace
        </p>

        <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find Your Sanctuary
          <br />
          <span className="text-amber-400">
            in Ethiopia
          </span>
        </h1>

        <p className="max-w-lg text-base leading-7 text-slate-300">
          Discover exclusive listings in Addis Ababa's most prestigious
          neighbourhoods, from Bole to Old Airport.
        </p>
      </div>
    </div>
  </div>

  {/* CENTERED FILTER */}
  <div className="relative z-20 mt-6 flex justify-center">
    <div className="w-full max-w-5xl">
      <PropertyFilters />
    </div>
  </div>
</div>
    </section>
  );
}
