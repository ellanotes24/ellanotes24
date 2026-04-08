import Link from 'next/link';

const metrics = [
  { label: 'Registered users', value: '152,430' },
  { label: 'Tasks completed', value: '24.2M' },
  { label: 'Advertiser campaigns', value: '37,541' },
  { label: 'Payouts processed', value: '$1.9M' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-8 text-slate-100">
      <section className="mx-auto max-w-6xl rounded-3xl border border-slate-800 p-10">
        <h1 className="text-4xl font-bold">PES Pro X — Traffic, Tasks, Rewards, Growth</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          Premium SaaS-grade traffic exchange and paid engagement platform with anti-fraud intelligence,
          wallet-ledger economy, modular task engines, and enterprise admin controls.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/register" className="rounded-xl bg-brand px-6 py-3 font-semibold">Start Free</Link>
          <Link href="/features" className="rounded-xl border border-slate-700 px-6 py-3">Explore Features</Link>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
        {metrics.map((m) => (
          <article key={m.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-2xl font-bold">{m.value}</p>
            <p className="text-sm text-slate-400">{m.label}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
