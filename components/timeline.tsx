type TimelineStatus = "done" | "active" | "upcoming";

export type TimelineItem = {
  id: string;
  title: string;
  location: string;
  datetime: string;
  status: TimelineStatus;
};

type TimelineProps = {
  items: TimelineItem[];
};

const statusDotClass: Record<TimelineStatus, string> = {
  done: "bg-emerald-500 ring-emerald-100",
  active: "bg-sky-500 ring-sky-100 shadow-[0_0_0_8px_rgba(14,165,233,0.15)]",
  upcoming: "bg-slate-300 ring-slate-100"
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative space-y-5 pl-6">
      <div className="absolute bottom-1 left-[11px] top-1 w-0.5 bg-slate-200" />
      {items.map((item) => (
        <div key={item.id} className="relative">
          <span
            className={`absolute -left-6 top-1.5 h-5 w-5 rounded-full ring-4 ${statusDotClass[item.status]} ${
              item.status === "active" ? "animate-pulse" : ""
            }`}
          />
          <p className="text-sm font-semibold text-slate-800">{item.title}</p>
          <p className="text-xs text-slate-500">{item.location}</p>
          <p className="text-xs text-slate-400">{item.datetime}</p>
        </div>
      ))}
    </div>
  );
}
