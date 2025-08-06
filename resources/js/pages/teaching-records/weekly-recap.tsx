import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';

interface WeeklySummary {
    [key: string]: {
        total_minutes: number;
        total_hours: string;
        sessions: number;
    };
}

interface DailyBreakdown {
    [key: string]: {
        date: string;
        total_minutes: number;
        total_hours: string;
        sessions: number;
    };
}

interface Props {
    weekStart: string;
    weekEnd: string;
    selectedDate: string;
    totalHours: string;
    totalSessions: number;
    bySubject: WeeklySummary;
    byClass: WeeklySummary;
    dailyBreakdown: DailyBreakdown;
    [key: string]: unknown;
}

export default function WeeklyRecap({
    weekStart,
    weekEnd,
    selectedDate,
    totalHours,
    totalSessions,
    bySubject,
    byClass,
    dailyBreakdown,
}: Props) {
    const [dateInput, setDateInput] = useState(selectedDate);
    const [viewMode, setViewMode] = useState<'subject' | 'class' | 'daily'>('subject');

    const handleDateChange = (newDate: string) => {
        router.get(route('teaching-records.weekly-recap'), { date: newDate }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getProgressWidth = (minutes: number, maxMinutes: number) => {
        return maxMinutes > 0 ? Math.min(100, (minutes / maxMinutes) * 100) : 0;
    };

    const maxMinutesBySubject = Math.max(...Object.values(bySubject).map(item => item.total_minutes), 1);
    const maxMinutesByClass = Math.max(...Object.values(byClass).map(item => item.total_minutes), 1);
    const maxMinutesDaily = Math.max(...Object.values(dailyBreakdown).map(item => item.total_minutes), 1);

    return (
        <AppShell>
            <div className="p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                📊 Weekly Teaching Recap
                            </h1>
                            <p className="text-lg text-gray-600">
                                {weekStart} - {weekEnd}
                            </p>
                        </div>
                        <div className="flex gap-3 mt-4 sm:mt-0">
                            <Link href={route('teaching-records.index', { date: selectedDate })}>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <span>📅</span>
                                    Daily Records
                                </Button>
                            </Link>
                            <Link href={route('dashboard')}>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <span>🏠</span>
                                    Dashboard
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Date Selector */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <label htmlFor="date" className="text-sm font-medium text-gray-700">
                                    Select Week (any date within the week):
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    value={dateInput}
                                    onChange={(e) => {
                                        setDateInput(e.target.value);
                                        handleDateChange(e.target.value);
                                    }}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    max={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Weekly Summary Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">⏰</span>
                                <div>
                                    <div className="text-3xl font-bold">{totalHours}</div>
                                    <div className="text-blue-100">Total Hours</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">📚</span>
                                <div>
                                    <div className="text-3xl font-bold">{totalSessions}</div>
                                    <div className="text-green-100">Total Sessions</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">📊</span>
                                <div>
                                    <div className="text-3xl font-bold">
                                        {totalSessions > 0 ? Math.round((Object.values(bySubject).reduce((sum, s) => sum + s.total_minutes, 0) / totalSessions) / 60 * 10) / 10 : 0}h
                                    </div>
                                    <div className="text-purple-100">Avg per Session</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* View Mode Tabs */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-6">
                        <div className="border-b border-gray-200">
                            <div className="flex">
                                <button
                                    onClick={() => setViewMode('subject')}
                                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                        viewMode === 'subject'
                                            ? 'border-blue-500 text-blue-600 bg-blue-50'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    📖 By Subject
                                </button>
                                <button
                                    onClick={() => setViewMode('class')}
                                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                        viewMode === 'class'
                                            ? 'border-blue-500 text-blue-600 bg-blue-50'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    🏫 By Class
                                </button>
                                <button
                                    onClick={() => setViewMode('daily')}
                                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                        viewMode === 'daily'
                                            ? 'border-blue-500 text-blue-600 bg-blue-50'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    📅 Daily Breakdown
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* By Subject View */}
                            {viewMode === 'subject' && (
                                <div>
                                    {Object.keys(bySubject).length === 0 ? (
                                        <div className="text-center py-12">
                                            <div className="text-6xl mb-4">📖</div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                No subjects taught this week
                                            </h3>
                                            <p className="text-gray-600">
                                                Start logging your teaching sessions to see subject breakdowns here.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Teaching Hours by Subject
                                            </h3>
                                            {Object.entries(bySubject)
                                                .sort(([,a], [,b]) => b.total_minutes - a.total_minutes)
                                                .map(([subject, data]) => (
                                                <div key={subject} className="bg-gray-50 rounded-lg p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-medium text-gray-900">{subject}</span>
                                                        <div className="text-right">
                                                            <span className="font-semibold text-blue-600">{data.total_hours}</span>
                                                            <span className="text-gray-500 text-sm ml-2">
                                                                ({data.sessions} session{data.sessions !== 1 ? 's' : ''})
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className="bg-blue-500 h-2 rounded-full transition-all"
                                                            style={{ width: `${getProgressWidth(data.total_minutes, maxMinutesBySubject)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* By Class View */}
                            {viewMode === 'class' && (
                                <div>
                                    {Object.keys(byClass).length === 0 ? (
                                        <div className="text-center py-12">
                                            <div className="text-6xl mb-4">🏫</div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                No classes taught this week
                                            </h3>
                                            <p className="text-gray-600">
                                                Start logging your teaching sessions to see class breakdowns here.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Teaching Hours by Class
                                            </h3>
                                            {Object.entries(byClass)
                                                .sort(([,a], [,b]) => b.total_minutes - a.total_minutes)
                                                .map(([className, data]) => (
                                                <div key={className} className="bg-gray-50 rounded-lg p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-medium text-gray-900">{className}</span>
                                                        <div className="text-right">
                                                            <span className="font-semibold text-green-600">{data.total_hours}</span>
                                                            <span className="text-gray-500 text-sm ml-2">
                                                                ({data.sessions} session{data.sessions !== 1 ? 's' : ''})
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className="bg-green-500 h-2 rounded-full transition-all"
                                                            style={{ width: `${getProgressWidth(data.total_minutes, maxMinutesByClass)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Daily Breakdown View */}
                            {viewMode === 'daily' && (
                                <div>
                                    {Object.keys(dailyBreakdown).length === 0 ? (
                                        <div className="text-center py-12">
                                            <div className="text-6xl mb-4">📅</div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                No teaching sessions this week
                                            </h3>
                                            <p className="text-gray-600">
                                                Start logging your daily teaching sessions to see the daily breakdown here.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Daily Teaching Hours
                                            </h3>
                                            {Object.entries(dailyBreakdown)
                                                .sort(([a], [b]) => a.localeCompare(b))
                                                .map(([dateKey, data]) => (
                                                <div key={dateKey} className="bg-gray-50 rounded-lg p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-medium text-gray-900">{data.date}</span>
                                                        <div className="text-right">
                                                            <span className="font-semibold text-purple-600">{data.total_hours}</span>
                                                            <span className="text-gray-500 text-sm ml-2">
                                                                ({data.sessions} session{data.sessions !== 1 ? 's' : ''})
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                                                        <div 
                                                            className="bg-purple-500 h-2 rounded-full transition-all"
                                                            style={{ width: `${getProgressWidth(data.total_minutes, maxMinutesDaily)}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="flex justify-between text-xs text-gray-500">
                                                        <span>Daily Progress</span>
                                                        <span>{Math.round(data.total_minutes / 600 * 100)}% of 10h limit</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Quick Actions</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Link href={route('teaching-records.create')}>
                                <div className="bg-green-50 hover:bg-green-100 rounded-lg p-4 transition-colors cursor-pointer">
                                    <div className="text-center">
                                        <div className="text-2xl mb-2">➕</div>
                                        <div className="font-semibold text-gray-900">Add Session</div>
                                        <div className="text-sm text-gray-600">Log new teaching</div>
                                    </div>
                                </div>
                            </Link>
                            
                            <Link href={route('teaching-records.index', { date: new Date().toISOString().split('T')[0] })}>
                                <div className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 transition-colors cursor-pointer">
                                    <div className="text-center">
                                        <div className="text-2xl mb-2">📅</div>
                                        <div className="font-semibold text-gray-900">Today's Records</div>
                                        <div className="text-sm text-gray-600">View daily sessions</div>
                                    </div>
                                </div>
                            </Link>
                            
                            <div className="bg-purple-50 rounded-lg p-4">
                                <div className="text-center">
                                    <div className="text-2xl mb-2">📊</div>
                                    <div className="font-semibold text-gray-900">This Week</div>
                                    <div className="text-sm text-gray-600">{totalHours} logged</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}