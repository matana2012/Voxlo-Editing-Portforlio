import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6 font-medium">404</p>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
        This scene didn&apos;t
        <br />
        make the final cut.
      </h1>
      <p className="text-muted-foreground mb-12 max-w-sm">
        The page you&apos;re looking for was cut in post. Happens to the best of them.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors active:scale-[0.98]"
      >
        Back to home
      </Link>
    </div>
  );
}
