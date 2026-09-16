import { useEffect } from "react";

import { Heart, Info, Trash2, X } from "lucide-react";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isAdd = toast.type === "add";
  const isRemove = toast.type === "remove";
  const isClear = toast.type === "clear";

  return (
    <div className="fixed top-24 right-6 z-50 max-w-sm w-full px-2 animate-toast-slow pointer-events-auto">
      <div
        className={`relative glass-panel rounded-2xl border shadow-2xl overflow-hidden ${
          isAdd
            ? "border-pink-500/40 bg-slate-950/95 text-pink-200 shadow-pink-600/30"
            : isClear
              ? "border-amber-500/40 bg-slate-950/95 text-amber-200 shadow-amber-600/30"
              : "border-purple-500/40 bg-slate-950/95 text-purple-200 shadow-purple-600/30"
        }`}
      >
        {/* Main Single-Line Content Container */}
        <div className="p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {/* Icon Badge */}
            <div
              className={`p-1.5 rounded-lg shrink-0 ${
                isAdd
                  ? "bg-pink-500/20 text-pink-400"
                  : isClear
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-purple-500/20 text-purple-400"
              }`}
            >
              {isAdd && (
                <Heart className="w-4 h-4 fill-pink-500 text-pink-400" />
              )}
              {isRemove && <Info className="w-4 h-4 text-purple-400" />}
              {isClear && <Trash2 className="w-4 h-4 text-amber-400" />}
            </div>

            {/* Single Line Text */}
            <div className="text-xs sm:text-sm font-semibold text-white truncate min-w-0">
              {toast.title}:{" "}
              <span className="font-normal text-slate-300">
                {toast.message}
              </span>
            </div>
          </div>

          {/* Close (X) Button */}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full h-1 bg-slate-800/80 overflow-hidden">
          <div
            className={`h-full animate-progress-shrink ${
              isAdd
                ? "bg-linear-to-r from-pink-500 to-rose-400"
                : isClear
                  ? "bg-linear-to-r from-amber-500 to-yellow-400"
                  : "bg-linear-to-r from-purple-500 to-indigo-400"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
