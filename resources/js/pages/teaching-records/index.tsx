import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';

interface TeachingRecord {
    id: number;
    teaching_date: string;
    subject: string;
    class: string;
    material_topic: string;
    start_time: string;
    end_time: string;
    notes?: string;
    duration_hours: string;
    duration_minutes: number;
}

interface Props {
    records: TeachingRecord[];
    selectedDate: string;
    totalHours: string;
    remainingHours: string;
    dailyLimitReached: boolean;
    [key: string]: unknown;
}

export default function TeachingRecordsIndex({ 
    records, 
    selectedDate, 
    totalHours, 
    remainingHours, 
    dailyLimitReached 
}: Props) {
    const [dateInput, setDateInput] = useState(selectedDate);

    const handleDateChange = (newDate: string) => {
        router.get(route('teaching-records.index'), { date: newDate }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this teaching record?')) {
            router.delete(route('teaching-records.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AppShell>
            <div className="p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                📚 Teaching Records
                            </h1>
                            <p className="text-lg text-gray-600">
                                {formatDate(selectedDate)}
                            </p>
                        </div>
                        <div className="flex gap-3 mt-4 sm:mt-0">
                            <Link href={route('teaching-records.weekly-recap', { date: selectedDate })}>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <span>📊</span>
                                    Weekly Recap
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

                    {/* Date Selector and Stats */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <label htmlFor="date" className="text-sm font-medium text-gray-700">
                                    Select Date:
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
                            
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{totalHours}</div>
                                    <div className="text-sm text-gray-500">Total Today</div>
                                </div>
                                <div className="text-center">
                                    <div className={`text-2xl font-bold ${dailyLimitReached ? 'text-red-600' : 'text-green-600'}`}>
                                        {remainingHours}
                                    </div>
                                    <div className="text-sm text-gray-500">Remaining</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">{records.length}</div>
                                    <div className="text-sm text-gray-500">Sessions</div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Daily Progress</span>
                                <span>{totalHours} / 10h</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                    className={`h-3 rounded-full transition-all ${
                                        dailyLimitReached ? 'bg-red-500' : 'bg-blue-500'
                                    }`}
                                    style={{ 
                                        width: `${Math.min(100, (records.reduce((sum, r) => sum + r.duration_minutes, 0) / 600) * 100)}%` 
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Add New Record Button */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Today's Sessions
                        </h2>
                        <Link href={route('teaching-records.create', { date: selectedDate })}>
                            <Button 
                                className={`flex items-center gap-2 ${
                                    dailyLimitReached 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-green-600 hover:bg-green-700'
                                }`}
                                disabled={dailyLimitReached}
                            >
                                <span>➕</span>
                                Add New Session
                            </Button>
                        </Link>
                    </div>

                    {/* Records List */}
                    {records.length === 0 ? (
                        <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No teaching sessions recorded
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Start by adding your first teaching session for {formatDate(selectedDate)}
                            </p>
                            <Link href={route('teaching-records.create', { date: selectedDate })}>
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    Add Your First Session
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {records.map((record) => (
                                <div key={record.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-lg">📚</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {record.subject}
                                                    </h3>
                                                    <p className="text-gray-600">{record.class}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Time:</span>
                                                    <span className="ml-2 font-medium">
                                                        {record.start_time} - {record.end_time}
                                                    </span>
                                                    <span className="ml-2 text-blue-600 font-semibold">
                                                        ({record.duration_hours})
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Material:</span>
                                                    <span className="ml-2 font-medium">
                                                        {record.material_topic}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {record.notes && (
                                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                                    <span className="text-gray-500 text-sm">Notes:</span>
                                                    <p className="text-gray-700 text-sm mt-1">{record.notes}</p>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <Link href={route('teaching-records.show', record.id)}>
                                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                                    <span>👁️</span>
                                                    View
                                                </Button>
                                            </Link>
                                            <Link href={route('teaching-records.edit', record.id)}>
                                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                                    <span>✏️</span>
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => handleDelete(record.id)}
                                                className="text-red-600 hover:bg-red-50 flex items-center gap-1"
                                            >
                                                <span>🗑️</span>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Daily Limit Warning */}
                    {dailyLimitReached && (
                        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">🛡️</div>
                                <div>
                                    <h3 className="text-lg font-semibold text-red-800">
                                        Daily Teaching Limit Reached
                                    </h3>
                                    <p className="text-red-600">
                                        You've reached the 10-hour daily teaching limit. Take a well-deserved break! 
                                        New sessions can be added tomorrow.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}