import { motion } from 'framer-motion';

interface DomainNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DomainNoticeModal({ isOpen, onClose }: DomainNoticeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-amber-500/40"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 animate-shimmer bg-[length:200%_100%]"></div>
          <div className="flex items-start gap-4 p-6 relative z-10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center flex-shrink-0 border border-amber-500/50">
              <i className="fa-solid fa-triangle-exclamation text-amber-400 text-xl"></i>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-amber-300 mb-1">
                重要通知
              </h2>
              <p className="text-sm text-amber-200/70">
                域名迁移公告
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-amber-500/20 transition-colors text-amber-300 hover:text-amber-200"
              aria-label="关闭"
            >
              <i className="fa-solid fa-times text-lg"></i>
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-4">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-amber-500/20">
            <p className="text-gray-200 leading-relaxed mb-3">
              LYJY 的其他网站即将下线并更换新域名。
            </p>
            <p className="text-gray-200 leading-relaxed mb-3">
              本网站将留作通知新域名使用，请各位
              <span className="text-amber-400 font-semibold">收藏保存</span>
              本页面，静候佳音。
            </p>
            <p className="text-amber-300/80 text-sm flex items-center gap-2">
              <i className="fa-solid fa-bookmark"></i>
              建议将本站加入书签，方便随时查看最新动态
            </p>
          </div>

          <div className="flex gap-3">
            <motion.button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-medium shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="fa-solid fa-check mr-2"></i>
              我知道了
            </motion.button>
          </div>

          <p className="text-center text-xs text-gray-500">
            LYJY导航系统 感谢您的一路相伴
          </p>
        </div>
      </motion.div>
    </div>
  );
}
