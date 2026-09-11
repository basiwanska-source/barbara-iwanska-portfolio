import { Reveal } from "./Reveal";
import { Counter } from "./Counter";
import { phases, profile, stats } from "@/lib/site";

export function About() {
  return (
    <section id="o-mnie" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="kicker mb-6">O mnie · Design Management</p>
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl">Między światem inżynierów, finansów i designu.</h2>
        </Reveal>
        <Reveal each className="flex flex-col gap-5 text-lg leading-relaxed sm:text-xl">
          {profile.body?.map((t) => <p key={t}>{t}</p>)}
        </Reveal>
      </div>

      <Reveal each className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-paper p-7">
            <Counter value={s.value} suffix={s.suffix} className="display block text-6xl text-accent" />
            <p className="mt-3 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </Reveal>

      <div className="mt-24 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="kicker mb-4">Mój udział w fazach</p>
          <p className="text-muted">Zakres odpowiedzialności zmienia się z fazą projektu. Od strategii i narracji w koncepcji, przez akceptacje i budżet w projekcie, po koordynację, optymalizację i odbiory w realizacji.</p>
        </Reveal>
        <Reveal each as="div" className="divide-y divide-line border-y border-line">
          {phases.map((f, i) => (
            <div key={f.name} className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr_1.4fr] sm:items-baseline">
              <span className="runner text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-lg font-medium">{f.name}</span>
              <span className="text-muted">{f.role}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
