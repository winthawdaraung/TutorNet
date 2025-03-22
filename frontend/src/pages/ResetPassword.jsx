import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock } from 'react-icons/fa';
import { resetPassword } from '../handle/common';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        const result = await resetPassword(token, password);

        if (result.success) {
            setMessage(result.message);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } else {
            setError(result.error);
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-gray-200 text-center"
            >
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                    <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
                    <p className="text-gray-500 mt-2">Enter a new password for your account</p>
                </motion.div>

                <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-4 text-gray-400" />
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-3 top-4 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-[#00BFA5] bg-gray-100"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="text-green-500 text-sm">
                            {message}
                        </div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-[#00BFA5] text-white text-lg font-semibold rounded-full hover:bg-teal-600 transition duration-300 shadow-md disabled:opacity-50"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 mr-2 border-b-2 border-t-2 border-white"></div>
                                <span>Resetting...</span>
                            </div>
                        ) : (
                            "Reset Password"
                        )}
                    </motion.button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-500 text-sm">
                        Remember your password?{' '}
                        <button
                            className="text-[#00BFA5] font-semibold hover:underline"
                            onClick={() => navigate('/login')}
                        >
                            Back to Login
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
