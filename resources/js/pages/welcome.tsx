import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                                📚 TeachTrack Pro
                            </h1>
                            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                                Streamline your teaching workflow with intelligent daily data management and automated weekly insights
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link href={route('register')}>
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg">
                                        🚀 Start Teaching Today
                                    </Button>
                                </Link>
                                <Link href={route('login')}>
                                    <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold">
                                        📝 Login to Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            🎯 Everything You Need to Excel
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Purpose-built for educators who value organization, insights, and work-life balance
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Daily Data Input */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                <span className="text-2xl">⏰</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Smart Daily Logging
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Quick entry for date, subject, class, materials, and time tracking with intelligent validation
                            </p>
                        </div>

                        {/* 10-Hour Daily Limit */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                                <span className="text-2xl">🛡️</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Work-Life Balance Protection
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Automatic 10-hour daily limit enforcement prevents burnout and ensures sustainable teaching
                            </p>
                        </div>

                        {/* Weekly Insights */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Weekly Analytics
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Comprehensive breakdowns by subject, class, and daily patterns with actionable insights
                            </p>
                        </div>

                        {/* Secure & Private */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                <span className="text-2xl">🔒</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Private & Secure
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Your teaching data stays yours. Multi-teacher support with complete data isolation
                            </p>
                        </div>

                        {/* Mobile Responsive */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                                <span className="text-2xl">📱</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Mobile-First Design
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Seamless experience across desktop, tablet, and mobile devices for on-the-go logging
                            </p>
                        </div>

                        {/* Real-time Validation */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                <span className="text-2xl">✅</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Smart Validation
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Real-time checks for time conflicts, data consistency, and logical entry validation
                            </p>
                        </div>
                    </div>
                </div>

                {/* Demo Section */}
                <div className="bg-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                🖼️ See It In Action
                            </h2>
                            <p className="text-lg text-gray-600">
                                Clean, intuitive interface designed by teachers, for teachers
                            </p>
                        </div>
                        
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            {/* Left Side - Features */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm">📝</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Quick Entry Forms</h4>
                                        <p className="text-gray-600 text-sm">Log teaching sessions in under 30 seconds</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm">📈</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Visual Progress Tracking</h4>
                                        <p className="text-gray-600 text-sm">Daily progress bars and weekly trend charts</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm">🔍</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Detailed Analytics</h4>
                                        <p className="text-gray-600 text-sm">Subject-wise and class-wise breakdowns</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right Side - Visual Mockup */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <span className="text-lg">📚</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Today's Teaching</h3>
                                            <p className="text-sm text-gray-500">March 15, 2024</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-gray-900">Mathematics</span>
                                                <span className="text-sm text-gray-500">2h 30m</span>
                                            </div>
                                            <div className="text-sm text-gray-600">Grade 5A • Algebra Basics</div>
                                        </div>
                                        
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-gray-900">English</span>
                                                <span className="text-sm text-gray-500">1h 45m</span>
                                            </div>
                                            <div className="text-sm text-gray-600">Grade 4B • Reading Comp.</div>
                                        </div>
                                        
                                        <div className="pt-3 border-t border-gray-100">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-gray-900">Total Today</span>
                                                <span className="font-semibold text-blue-600">4h 15m</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42.5%' }}></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">5h 45m remaining today</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-blue-600 py-16">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            Ready to Transform Your Teaching Workflow? 🚀
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Join thousands of educators who've streamlined their daily documentation and gained valuable insights into their teaching patterns
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={route('register')}>
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold shadow-lg">
                                    🎯 Create Free Account
                                </Button>
                            </Link>
                            <Link href={route('login')}>
                                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                                    📊 View Demo Dashboard
                                </Button>
                            </Link>
                        </div>
                        <p className="text-blue-200 text-sm mt-6">
                            ✨ Free forever • No credit card required • Secure & private
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-900 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="text-gray-400">
                                Built with ❤️ for educators worldwide • Secure PostgreSQL storage • Mobile-optimized
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}