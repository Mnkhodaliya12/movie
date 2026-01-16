import React from 'react';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm animate-pulse">
      <div className="skeleton">
        <div className="skeleton-img bg-gradient-to-br from-slate-200 to-slate-300" />
      </div>
      <div className="p-3 space-y-2">
        <div className="skeleton-line w-3/4 h-4 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded" />
        <div className="skeleton-line w-1/2 h-3 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded" />
        <div className="space-y-1.5">
          <div className="skeleton-line w-full h-2 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded" />
          <div className="skeleton-line w-5/6 h-2 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
