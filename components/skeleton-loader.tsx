export function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-28 rounded-3xl bg-slate-200/80" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-20 rounded-2xl bg-slate-200/80" />
        <div className="h-20 rounded-2xl bg-slate-200/80" />
      </div>
      <div className="space-y-3 rounded-3xl border border-slate-100 bg-white p-4">
        <div className="h-4 w-2/5 rounded bg-slate-200" />
        <div className="h-3 w-4/5 rounded bg-slate-200" />
        <div className="h-3 w-3/5 rounded bg-slate-200" />
        <div className="h-3 w-4/5 rounded bg-slate-200" />
      </div>
    </div>
  );
}
