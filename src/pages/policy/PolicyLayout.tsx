import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

type Breadcrumb = { label: string; to?: string };

type Props = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  boxed?: boolean; 
  hero?: {
    image: string;
    centerTitle?: string;
    breadcrumbs?: Breadcrumb[];
  };
};

export default function PolicyLayout({ title, subtitle, children, hero, boxed = true }: Props) {
  return (
    <div className="w-full">
      {hero && (
        <section className="relative w-full">
          <div
            className="h-48 md:h-64 lg:h-80 w-full bg-center bg-cover"
            style={{ backgroundImage: `url(${hero.image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white font-extrabold tracking-wide text-3xl md:text-5xl">
              {(hero.centerTitle || title).toUpperCase()}
            </h1>

            {hero.breadcrumbs && hero.breadcrumbs.length > 0 && (
              <div className="mt-3 flex items-center gap-2 text-white/90 text-sm md:text-base">
                <Home size={16} className="inline-block opacity-90" />
                {}
                {hero.breadcrumbs.map((b, i) => (
                  <span key={b.label} className="flex items-center gap-2">
                    {b.to ? (
                      <Link to={b.to} className="hover:underline">
                        {b.label}
                      </Link>
                    ) : (
                      <span className="font-semibold">{b.label}</span>
                    )}
                    {i < hero.breadcrumbs!.length - 1 && <span className="opacity-75">›</span>}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-10">
        {!hero && (
          <>
            <h1 className="text-3xl font-bold text-green-primary">{title}</h1>
            {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          </>
        )}

        {boxed ? (
  <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 space-y-4 policy-content">
    {children}
  </div>
) : (
  <div className="mt-6 policy-content">{children}</div>
)}
      </div>
    </div>
  );
}
