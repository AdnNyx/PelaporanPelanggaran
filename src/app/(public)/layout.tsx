import SmoothScroll from "@/components/SmoothScroll";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <main className="flex-1">{children}</main>
      </div>
    </SmoothScroll>
  );
}
