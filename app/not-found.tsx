import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-accent">404</p>
      <h1 className="mb-4 font-display text-4xl font-semibold leading-[0.95] tracking-tight text-foreground md:text-6xl">
        This scene didn&apos;t
        <br />
        <span className="text-ember">make the final cut.</span>
      </h1>
      <p className="mb-12 max-w-sm text-muted-foreground">
        The page you&apos;re looking for was cut in post. Happens to the best of them.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#0B0A09] transition-all hover:scale-[1.03] hover:bg-accent-hover active:scale-[0.98]"
      >
        Back to home
      </Link>
    </div>
  );
}
