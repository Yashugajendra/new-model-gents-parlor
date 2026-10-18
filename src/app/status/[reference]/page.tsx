import React, { Suspense } from "react";
import StatusClientView from "./StatusClientView";

async function StatusContent({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  return <StatusClientView reference={reference} />;
}

export default function StatusDetailPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-[#94a3b8] text-sm">
          Loading appointment details...
        </div>
      }
    >
      <StatusContent params={params} />
    </Suspense>
  );
}
