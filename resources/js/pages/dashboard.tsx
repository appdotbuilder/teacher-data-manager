import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    const today = new Date().toISOString().split('T')[0];

    return (
        <AppShell>
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            📚 Welcome to TeachTrack Pro
                        </h1>
                        <p className="text-lg text-gray-600">
                            Manage your daily teaching records and view weekly analytics
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Today's Records */}
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">⏰</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Today's Sessions
                            </h3>
                            <p className="text-gray-600 mb-4">
                                View and manage today's teaching records
                            </p>
                            <Link href={route('teaching-records.index', { date: today })}>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    View Today's Records
                                </Button>
                            </Link>
                        </div>

                        {/* Add New Record */}
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">➕</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Log New Session
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Add a new teaching session to today's records
                            </p>
                            <Link href={route('teaching-records.create', { date: today })}>
                                <Button className="w-full bg-green-600 hover:bg-green-700">
                                    Add Teaching Session
                                </Button>
                            </Link>
                        </div>

                        {/* Weekly Recap */}
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Weekly Analytics
                            </h3>
                            <p className="text-gray-600 mb-4">
                                View comprehensive weekly teaching insights
                            </p>
                            <Link href={route('teaching-records.weekly-recap', { date: today })}>
                                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                    View Weekly Recap
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Stats Cards */}
                    <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Quick Actions</h2>
                        
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link href={route('teaching-records.index')}>
                                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                                    <div className="text-center">
                                        <div className="text-2xl mb-2">📅</div>
                                        <div className="font-semibold text-gray-900">All Records</div>
                                        <div className="text-sm text-gray-600">Browse by date</div>
                                    </div>
                                </div>
                            </Link>
                            
                            <Link href={route('teaching-records.create')}>
                                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                                    <div className="text-center">
                                        <div className="text-2xl mb-2">✏️</div>
                                        <div className="font-semibold text-gray-900">Quick Add</div>
                                        <div className="text-sm text-gray-600">New session</div>
                                    </div>
                                </div>
                            </Link>
                            
                            <Link href={route('teaching-records.weekly-recap')}>
                                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                                    <div className="text-center">
                                        <div className="text-2xl mb-2">📈</div>
                                        <div className="font-semibold text-gray-900">Analytics</div>
                                        <div className="text-sm text-gray-600">Weekly insights</div>
                                    </div>
                                </div>
                            </Link>
                            
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-center">
                                    <div className="text-2xl mb-2">🛡️</div>
                                    <div className="font-semibold text-gray-900">10-Hour Limit</div>
                                    <div className="text-sm text-gray-600">Daily protection</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Overview */}
                    <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                        <h2 className="text-2xl font-bold mb-4">🚀 What You Can Do</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-2">📝 Daily Management</h3>
                                <ul className="space-y-1 text-blue-100">
                                    <li>• Log subject, class, and materials</li>
                                    <li>• Track start/end times automatically</li>
                                    <li>• Add notes and observations</li>
                                    <li>• Enforce 10-hour daily limits</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">📊 Weekly Insights</h3>
                                <ul className="space-y-1 text-purple-100">
                                    <li>• Total hours per subject</li>
                                    <li>• Class-wise breakdowns</li>
                                    <li>• Daily pattern analysis</li>
                                    <li>• Export-ready summaries</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}