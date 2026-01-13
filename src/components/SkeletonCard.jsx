import React from 'react';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
      <div className="skeleton">
        <div className="skeleton-img" />
      </div>
      <div className="p-3 space-y-2">
        <div className="skeleton-line w-3/4" style={{height: '1rem'}} />
        <div className="skeleton-line w-1/2" style={{height: '0.8rem'}} />
        <div className="skeleton-line w-full" style={{height: '0.6rem'}} />
      </div>
    </div>
  );
}

export default SkeletonCard;
