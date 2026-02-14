"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview", href: "/dashboards", icon: "overview", color: "text-violet-400 dark:text-violet-300" },
  { label: "API Playground", href: "/playground", icon: "play", color: "text-sky-400 dark:text-sky-300" },
  { label: "Use Cases", href: "#", icon: "cases", color: "text-amber-400 dark:text-amber-300" },
  { label: "Billing", href: "#", icon: "billing", color: "text-emerald-400 dark:text-emerald-300" },
  { label: "Settings", href: "#", icon: "settings", color: "text-slate-400 dark:text-slate-300" },
  { label: "Certification", href: "#", icon: "cert", color: "text-teal-400 dark:text-teal-300" },
  { label: "Documentation", href: "#", icon: "docs", color: "text-indigo-400 dark:text-indigo-300" },
];

function NavIcon({ icon, color }: { icon: string; color: string }) {
  const svgClass = `h-5 w-5 shrink-0 ${color}`;
  switch (icon) {
    case "overview":
      return (
        <svg className={svgClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
        </svg>
      );
    case "play":
      return (
        <svg className={svgClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "cases":
      return (
        <svg className={svgClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case "billing":
      return (
        <svg className={svgClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case "settings":
      return (
        <svg className={svgClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "cert":
      return (
        <svg className={svgClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      );
    case "docs":
      return (
        <svg className={svgClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    default:
      return null;
  }
}

type SidebarProps = {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
};

export default function Sidebar({ collapsed = false, onCollapsedChange }: SidebarProps) {
  const isCollapsed = collapsed ?? false;
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col overflow-hidden border-r border-zinc-200 bg-white transition-[width] duration-300 ease-in-out dark:border-zinc-800 dark:bg-zinc-900 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className={`flex h-16 items-center border-b border-zinc-200 transition-all duration-300 ease-in-out dark:border-zinc-800 ${isCollapsed ? "justify-center px-0" : "px-6"}`}>
        <Link href="/" className={`flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100 ${isCollapsed ? "justify-center" : ""}`}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white">
            H
          </span>
          <span className={`overflow-hidden whitespace-nowrap text-xl transition-all duration-300 ease-in-out ${isCollapsed ? "max-w-0 opacity-0" : "max-w-[120px] opacity-100"}`}>
            HM AI
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <div className={`mb-4 transition-all duration-300 ease-in-out ${isCollapsed ? "px-2" : "px-4"}`}>
          <button
            title={isCollapsed ? "Hiral Mehta" : undefined}
            className={`flex w-full items-center rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 ${
              isCollapsed ? "justify-center" : "justify-between gap-2"
            }`}
          >
            <span className="relative flex h-[45px] w-[45px] shrink-0 overflow-hidden rounded-full">
              <Image
                src="/profile.png"
                alt="Hiral Mehta"
                fill
                className="object-cover"
                sizes="45px"
              />
            </span>
            <span className={`flex flex-1 items-center justify-between overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isCollapsed ? "max-w-0 opacity-0" : "max-w-[180px] opacity-100"}`}>
              <span>Hiral Mehta</span>
              <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>
        <nav className={`space-y-0.5 transition-all duration-300 ease-in-out ${isCollapsed ? "px-2" : "px-3"}`}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
            <Link
              key={item.label}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={`relative flex items-center rounded-lg py-2 text-sm font-medium transition-all duration-300 ease-in-out ${
                isCollapsed ? "justify-center px-0" : "gap-3 px-3"
              } ${isActive ? (isCollapsed ? "pl-2" : "pl-4") : ""} ${
                isActive
                  ? "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              }`}
            >
              {isActive && !isCollapsed && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-violet-500 to-fuchsia-500" />
              )}
              {isActive && isCollapsed && (
                <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-violet-500 to-fuchsia-500" />
              )}
              <NavIcon icon={item.icon} color={item.color ?? "text-zinc-600 dark:text-zinc-400"} />
              <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isCollapsed ? "max-w-0 opacity-0" : "max-w-[140px] opacity-100"}`}>
                {item.label}
              </span>
            </Link>
          );
          })}
        </nav>
      </div>
      <div className="border-t border-zinc-200 p-2 dark:border-zinc-800">
        <button
          onClick={() => onCollapsedChange?.(!isCollapsed)}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all duration-200 ease-out hover:bg-zinc-100 active:scale-95 dark:hover:bg-zinc-800"
        >
          <svg
            className={`h-5 w-5 shrink-0 text-violet-500 transition-transform duration-300 ease-in-out hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300 ${isCollapsed ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
