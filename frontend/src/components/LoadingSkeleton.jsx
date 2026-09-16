import React from 'react';

export function CardSkeleton() {
  return (
    <div className="bg-studio-charcoal/50 border border-studio-borderSubtle animate-pulse p-4 space-y-4">
      <div className="w-full h-64 sm:h-72 bg-studio-dark/60" />
      <div className="space-y-2">
        <div className="h-4 bg-studio-dark/80 w-1/3" />
        <div className="h-6 bg-studio-dark/80 w-3/4" />
        <div className="h-4 bg-studio-dark/50 w-full" />
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="min-h-screen pt-32 pb-24 max-w-7xl mx-auto px-6 sm:px-8 space-y-12 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-studio-dark/70 w-32" />
        <div className="h-12 bg-studio-dark/80 w-2/3" />
        <div className="h-5 bg-studio-dark/50 w-1/2" />
      </div>
      <div className="w-full h-[60vh] bg-studio-dark/60" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="h-6 bg-studio-dark/80 w-48" />
          <div className="h-4 bg-studio-dark/50 w-full" />
          <div className="h-4 bg-studio-dark/50 w-5/6" />
        </div>
        <div className="space-y-3">
          <div className="h-6 bg-studio-dark/80 w-36" />
          <div className="h-4 bg-studio-dark/50 w-full" />
          <div className="h-4 bg-studio-dark/50 w-4/5" />
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="border-b border-studio-borderSubtle/60 animate-pulse">
      <td className="p-4"><div className="h-4 bg-studio-dark/70 w-28" /></td>
      <td className="p-4"><div className="h-4 bg-studio-dark/70 w-24" /></td>
      <td className="p-4"><div className="h-4 bg-studio-dark/70 w-32" /></td>
      <td className="p-4"><div className="h-4 bg-studio-dark/70 w-16" /></td>
      <td className="p-4"><div className="h-4 bg-studio-dark/70 w-20" /></td>
    </tr>
  );
}
