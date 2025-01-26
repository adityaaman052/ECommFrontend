import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

function UnauthPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-900 to-black text-white">
      <div className="text-center space-y-6">
        {/* Animated 404 */}
        <motion.div
          className="flex items-center justify-center text-9xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.div>

        {/* Icon and message */}
        <motion.div
          className="flex items-center justify-center space-x-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <AlertCircle size={36} className="text-red-500" />
          <h2 className="text-2xl font-semibold">You don't have access to view this page</h2>
        </motion.div>

        {/* Button to navigate back */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <a
            href="/"
            className="px-6 py-3 text-lg font-medium text-black bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all"
          >
            Go Back to Homepage
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default UnauthPage;
