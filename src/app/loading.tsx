/**
 * Renders the loading state used while route segments stream or suspend.
 *
 * @returns A centered loading indicator for pending route content.
 */
export default function Loading() {
  return (
    <div className="container flex min-h-[50vh] items-center justify-center py-24">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Loading
        </p>
      </div>
    </div>
  );
}
