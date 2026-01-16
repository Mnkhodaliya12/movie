import { useEffect, useState } from 'react';

function Toast({ message, type = 'info', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300); // Wait for fade out
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-emerald-500 text-white border-emerald-600',
    error: 'bg-red-500 text-white border-red-600',
    warning: 'bg-amber-500 text-white border-amber-600',
    info: 'bg-indigo-500 text-white border-indigo-600',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all duration-300
        ${typeStyles[type]}
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
      `}
      role="alert"
      aria-live="polite"
    >
      <span className="text-lg font-bold">{icons[type]}</span>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose?.(), 300);
        }}
        className="ml-2 rounded-full p-1 hover:bg-white/20 transition-colors"
        aria-label="Close notification"
      >
        <span className="text-sm">×</span>
      </button>
    </div>
  );
}

export default Toast;
