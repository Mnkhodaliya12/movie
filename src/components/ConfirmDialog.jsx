function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger' }) {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      button: 'bg-red-600 hover:bg-red-700 text-white',
      icon: '⚠',
    },
    warning: {
      button: 'bg-amber-600 hover:bg-amber-700 text-white',
      icon: '⚠',
    },
    info: {
      button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      icon: 'ℹ',
    },
  };

  const styles = typeStyles[type] || typeStyles.danger;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-2xl">
            {styles.icon}
          </div>
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600">{message}</p>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${styles.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
