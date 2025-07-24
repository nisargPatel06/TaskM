import React, { useState, useEffect } from "react";
import {
  Clock,
  Users,
  BarChart3,
  CheckCircle,
  Play,
  Timer,
  UserCheck,
  MessageSquare,
  TrendingUp,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

const LandingPage = () => {
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStartDemo = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Smart Time Tracking",
      description:
        "Real-time timer with automatic break detection and daily hour tracking",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Task Management",
      description:
        "Assign, track, and manage tasks with role-based access control",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description:
        "Comprehensive reports on productivity, attendance, and task completion",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Query System",
      description: "Seamless communication between employees and supervisors",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    {
      label: "Active Users",
      value: "10,000+",
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: "Tasks Completed",
      value: "1M+",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      label: "Hours Tracked",
      value: "5M+",
      icon: <Clock className="w-6 h-6" />,
    },
    { label: "Companies", value: "500+", icon: <Globe className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-white">P</span>
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              PropVIVO
            </span>
            <p className="text-sm text-gray-400">Task Management</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="hover:text-blue-400 transition-colors">
            Features
          </a>
          <a href="#demo" className="hover:text-blue-400 transition-colors">
            Demo
          </a>
          <a href="#pricing" className="hover:text-blue-400 transition-colors">
            Pricing
          </a>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all transform hover:scale-105">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Track Time,
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent block">
                  Manage Tasks
                </span>
                Boost Productivity
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Streamline your workplace with intelligent task management,
                real-time tracking, and powerful analytics. Built for modern
                teams.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStartDemo}
                className="bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-500 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Start Free Trial</span>
              </button>
              <button className="border-2 border-gray-600 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 transition-all flex items-center justify-center space-x-2">
                <Timer className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="flex justify-center text-blue-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden transform hover:scale-105 transition-transform duration-500">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Welcome back, John! 👋
                    </h3>
                    <p className="text-blue-100">
                      Here's what's happening with your tasks today.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {currentTime}
                    </div>
                    <div className="text-blue-100 text-sm">Live Time</div>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">3</div>
                    <div className="text-sm text-gray-400">Total Tasks</div>
                    <div className="text-xs text-green-400">
                      +2 from last week
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400">1</div>
                    <div className="text-sm text-gray-400">In Progress</div>
                    <div className="text-xs text-gray-500">Active tasks</div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">1</div>
                    <div className="text-sm text-gray-400">Completed</div>
                    <div className="text-xs text-green-400">+1 today</div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      0h 0m
                    </div>
                    <div className="text-sm text-gray-400">Today's Time</div>
                    <div className="text-xs text-gray-500">Tracked time</div>
                  </div>
                </div>

                {/* Time Tracker */}
                <div className="bg-slate-700 rounded-lg p-6 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Clock className="w-6 h-6 text-blue-400" />
                    <h4 className="text-lg font-semibold">Time Tracker</h4>
                  </div>
                  <div
                    className={`text-4xl font-mono font-bold mb-4 ${
                      isAnimating ? "text-green-400" : "text-white"
                    } transition-colors duration-500`}
                  >
                    00:00:00
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleStartDemo}
                      className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                        isAnimating
                          ? "bg-green-500"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {isAnimating ? "Running..." : "Start"}
                    </button>
                    <button className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-colors">
                      Stop
                    </button>
                  </div>
                </div>

                {/* Recent Task */}
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">Recent Tasks</h4>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-yellow-500 text-yellow-900 rounded text-xs">
                        1 pending
                      </span>
                      <span className="px-2 py-1 bg-blue-500 text-blue-100 rounded text-xs">
                        1 active
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-600 rounded-lg">
                      <div>
                        <h5 className="font-medium">
                          Implement User Authentication
                        </h5>
                        <p className="text-sm text-gray-400">
                          Set up login functionality with JWT tokens
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <UserCheck className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-400">
                            John Doe
                          </span>
                          <span className="px-2 py-1 bg-red-500 text-red-100 rounded text-xs">
                            high priority
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 bg-blue-500 text-blue-100 rounded-full text-sm">
                          in progress
                        </span>
                        <p className="text-xs text-gray-400 mt-1">
                          8h estimated
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent block">
              manage your team
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From time tracking to task management, PropVIVO provides all the
            tools your team needs to stay productive and organized.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 border border-slate-700 hover:border-slate-600"
            >
              <div
                className={`w-16 h-16 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to boost your productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using PropVIVO to streamline their
            workflow and increase efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-700 bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">P</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  PropVIVO
                </span>
              </div>
              <p className="text-gray-400">
                Empowering teams with intelligent task management and time
                tracking solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Demo
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="text-gray-400 space-y-2">
                <p>G14-G16, Homeland City, Nr. SNS Business Park</p>
                <p>Vesu, Surat, Gujarat 395007, IN</p>
                <p>+1 (888) 392-3515</p>
                <p>www.propvivo.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PropVIVO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
