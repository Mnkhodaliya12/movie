function EmptyState({ 
  icon = '🎬', 
  title = 'No items found', 
  message = 'Try adjusting your filters or search terms.',
  action,
  actionLabel 
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
      <div className="mb-4 text-6xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-slate-600">{message}</p>
      {action && actionLabel && (
        <button
          onClick={action}
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
