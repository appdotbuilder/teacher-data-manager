import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link, useForm } from '@inertiajs/react';

interface TeachingRecord {
    id: number;
    teaching_date: string;
    subject: string;
    class: string;
    material_topic: string;
    start_time: string;
    end_time: string;
    notes?: string;
}

interface Props {
    record: TeachingRecord;
    [key: string]: unknown;
}

export default function EditTeachingRecord({ record }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        teaching_date: record.teaching_date,
        subject: record.subject,
        class: record.class,
        material_topic: record.material_topic,
        start_time: record.start_time,
        end_time: record.end_time,
        notes: record.notes || '',
    });

    const subjects = [
        'Mathematics', 'English Literature', 'English Language', 'History', 'Geography',
        'Science', 'Physics', 'Chemistry', 'Biology', 'Art', 'Music', 'Physical Education',
        'Computer Science', 'Foreign Language', 'Social Studies', 'Philosophy', 'Economics'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('teaching-records.update', record.id));
    };

    const calculateDuration = () => {
        if (data.start_time && data.end_time) {
            const start = new Date(`2000-01-01T${data.start_time}`);
            const end = new Date(`2000-01-01T${data.end_time}`);
            if (end > start) {
                const diffMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
                const hours = Math.floor(diffMinutes / 60);
                const minutes = diffMinutes % 60;
                return hours > 0 ? `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`.trim() : `${minutes}m`;
            }
        }
        return '';
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
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Link href={route('teaching-records.show', record.id)}>
                                <Button variant="outline" size="sm">
                                    ← Back to Details
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            ✏️ Edit Teaching Session
                        </h1>
                        <p className="text-lg text-gray-600">
                            Modify session details for {formatDate(data.teaching_date)}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Date */}
                            <div>
                                <label htmlFor="teaching_date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Teaching Date *
                                </label>
                                <input
                                    type="date"
                                    id="teaching_date"
                                    value={data.teaching_date}
                                    onChange={(e) => setData('teaching_date', e.target.value)}
                                    max={new Date().toISOString().split('T')[0]}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                {errors.teaching_date && (
                                    <p className="text-red-600 text-sm mt-1">{errors.teaching_date}</p>
                                )}
                            </div>

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject *
                                </label>
                                <select
                                    id="subject"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select a subject...</option>
                                    {subjects.map((subject) => (
                                        <option key={subject} value={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                                {errors.subject && (
                                    <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
                                )}
                            </div>

                            {/* Class */}
                            <div>
                                <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
                                    Class *
                                </label>
                                <input
                                    type="text"
                                    id="class"
                                    value={data.class}
                                    onChange={(e) => setData('class', e.target.value)}
                                    placeholder="e.g., Grade 5A, Year 10B, Advanced Math"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                {errors.class && (
                                    <p className="text-red-600 text-sm mt-1">{errors.class}</p>
                                )}
                            </div>

                            {/* Material/Topic */}
                            <div>
                                <label htmlFor="material_topic" className="block text-sm font-medium text-gray-700 mb-2">
                                    Material/Topic Taught *
                                </label>
                                <textarea
                                    id="material_topic"
                                    value={data.material_topic}
                                    onChange={(e) => setData('material_topic', e.target.value)}
                                    placeholder="Describe what you taught in this session..."
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                {errors.material_topic && (
                                    <p className="text-red-600 text-sm mt-1">{errors.material_topic}</p>
                                )}
                            </div>

                            {/* Time Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="start_time" className="block text-sm font-medium text-gray-700 mb-2">
                                        Start Time *
                                    </label>
                                    <input
                                        type="time"
                                        id="start_time"
                                        value={data.start_time}
                                        onChange={(e) => setData('start_time', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                    {errors.start_time && (
                                        <p className="text-red-600 text-sm mt-1">{errors.start_time}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="end_time" className="block text-sm font-medium text-gray-700 mb-2">
                                        End Time *
                                    </label>
                                    <input
                                        type="time"
                                        id="end_time"
                                        value={data.end_time}
                                        onChange={(e) => setData('end_time', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                    {errors.end_time && (
                                        <p className="text-red-600 text-sm mt-1">{errors.end_time}</p>
                                    )}
                                </div>
                            </div>

                            {/* Duration Display */}
                            {calculateDuration() && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-blue-600 font-medium">
                                            Session Duration: {calculateDuration()}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Notes */}
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                                    Notes/Observations (Optional)
                                </label>
                                <textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Any additional notes about this session..."
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.notes && (
                                    <p className="text-red-600 text-sm mt-1">{errors.notes}</p>
                                )}
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-4 pt-6">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <span className="animate-spin">⏳</span>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <span>💾</span>
                                            Update Session
                                        </>
                                    )}
                                </Button>
                                <Link href={route('teaching-records.show', record.id)}>
                                    <Button variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}