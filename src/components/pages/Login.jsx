import React, { useContext, useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect logged-in user away from login page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to home or dashboard
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate(result.redirectUrl || "/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-purple-300/30 rounded-full blur-3xl"></div>
      </div>

      {/* Login content */}
      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center">
        <div className="flex w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Left side - Branding */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">PropVIVO</h1>
                  <p className="text-blue-100 text-sm">
                    Task & Attendance Management
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold leading-tight">
                  Streamline Your Team's
                  <br />
                  <span className="text-blue-200">Attendance Tracking</span>
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Efficient task management and attendance monitoring for modern
                  teams. Track progress, manage schedules, and boost
                  productivity.
                </p>
              </div>
            </div>
            <div className="relative z-10 space-y-4 mt-8">
              <div className="flex items-center gap-3 text-blue-100">
                <Clock className="w-5 h-5" />
                <span>Real-time attendance tracking</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <CheckCircle className="w-5 h-5" />
                <span>Task progress monitoring</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <Users className="w-5 h-5" />
                <span>Team collaboration tools</span>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              {/* Mobile branding */}
              <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                <div className="p-3 bg-blue-600 rounded-2xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">PropVIVO</h1>
                  <p className="text-gray-600 text-sm">
                    Task & Attendance Management
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Welcome back
                </h2>
                <p className="text-gray-600">
                  Please sign in to your account to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail
                        className={`w-5 h-5 transition-colors ${
                          error && !email ? "text-red-400" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                        error && !email
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock
                        className={`w-5 h-5 transition-colors ${
                          error && !password ? "text-red-400" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-12 pr-12 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                        error && !password
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-in slide-in-from-top-1 duration-200">
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  © 2025 PropVIVO. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
