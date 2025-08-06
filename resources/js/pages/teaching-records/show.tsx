import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

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
    created_at: string;
    updated_at: string;
}

interface Props {
    record: TeachingRecord;
    [key: string]: unknown;
}

export default function ShowTeachingRecord({ record }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatDateTime = (dateTimeString: string) => {
        return new Date(dateTimeString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppShell>
            <div className="p-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Link href={route('teaching-records.index', { date: record.teaching_date })}>
                                <Button variant="outline" size="sm">
                                    ← Back to Records
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            📚 Teaching Session Details
                        </h1>
                        <p className="text-lg text-gray-600">
                            {formatDate(record.teaching_date)}
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                        {/* Subject and Class Header */}
                        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">📖</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{record.subject}</h2>
                                <p className="text-lg text-gray-600">{record.class}</p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            {/* Time Information */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                    ⏰ Time Details
                                </h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Start Time</label>
                                        <div className="text-lg font-semibold text-gray-900">{record.start_time}</div>
                                    </div>
                                    
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">End Time</label>
                                        <div className="text-lg font-semibold text-gray-900">{record.end_time}</div>
                                    </div>
                                    
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Duration</label>
                                        <div className="text-xl font-bold text-blue-600">{record.duration_hours}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Session Information */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                    📝 Session Info
                                </h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Date</label>
                                        <div className="text-lg font-semibold text-gray-900">
                                            {formatDate(record.teaching_date)}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Subject</label>
                                        <div className="text-lg font-semibold text-gray-900">{record.subject}</div>
                                    </div>
                                    
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Class</label>
                                        <div className="text-lg font-semibold text-gray-900">{record.class}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Material/Topic Section */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                                📚 Material/Topic Taught
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-800 leading-relaxed">{record.material_topic}</p>
                            </div>
                        </div>

                        {/* Notes Section */}
                        {record.notes && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                                    💭 Notes/Observations
                                </h3>
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
                                    <p className="text-gray-800 leading-relaxed">{record.notes}</p>
                                </div>
                            </div>
                        )}

                        {/* Metadata */}
                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">📄 Record Information</h3>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <span className="font-medium">Created:</span>
                                    <span className="ml-2">{formatDateTime(record.created_at)}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Last Updated:</span>
                                    <span className="ml-2">{formatDateTime(record.updated_at)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                            <Link href={route('teaching-records.edit', record.id)}>
                                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                                    <span>✏️</span>
                                    Edit Session
                                </Button>
                            </Link>
                            <Link href={route('teaching-records.index', { date: record.teaching_date })}>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <span>📅</span>
                                    View All Records
                                </Button>
                            </Link>
                            <Link href={route('teaching-records.weekly-recap', { date: record.teaching_date })}>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <span>📊</span>
                                    Weekly Recap
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}