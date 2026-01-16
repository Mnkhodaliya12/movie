function ErrorCard({ message, onRetry, title = 'Something went wrong' }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <span className="text-2xl text-red-600">⚠</span>
      </div>
      <h3 className="mb-2 text-sm font-semibold text-red-900">{title}</h3>
      <p className="mb-4 text-sm text-red-700">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          <span>↻</span>
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}

export default ErrorCard;
