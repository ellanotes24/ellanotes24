import Link from 'next/link';
import { ReactNode } from 'react';

const nav = [
  ['Dashboard', '/dashboard'],
  ['Tasks', '/tasks'],
  ['Campaigns', '/campaigns'],
  ['Wallet', '/wallet'],
  ['Referrals', '/referrals'],
  ['Support', '/support'],
  ['Settings', '/settings'],
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr]">
      <aside className="border-r border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-6 text-xl font-bold">PES Pro X</h2>
        <nav className="space-y-2">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800">
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  );
}
