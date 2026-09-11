import { pad } from "@/lib/pages";

export function Runner({ section, n }: { section: string; n: number }) {
  return (
    <div className="runner flex items-center justify-between border-t border-line pt-3">
      <span>[ {section} ]</span>
      <span>{pad(n)}</span>
    </div>
  );
}
