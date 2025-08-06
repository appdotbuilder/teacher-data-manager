<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\TeachingRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class WeeklyRecapController extends Controller
{
    /**
     * Display weekly recap.
     */
    public function index(Request $request)
    {
        $date = $request->get('date', now()->format('Y-m-d'));
        $startOfWeek = Carbon::parse($date)->startOfWeek();
        $endOfWeek = Carbon::parse($date)->endOfWeek();
        
        $records = TeachingRecord::forUser(auth()->id())
            ->whereBetween('teaching_date', [$startOfWeek, $endOfWeek])
            ->orderBy('teaching_date')
            ->orderBy('start_time')
            ->get();
        
        // Group by subject
        $bySubject = $records->groupBy('subject')
            ->map(function ($subjectRecords) {
                return [
                    'total_minutes' => $subjectRecords->sum('duration_minutes'),
                    'total_hours' => $this->formatMinutes($subjectRecords->sum('duration_minutes')),
                    'sessions' => $subjectRecords->count(),
                ];
            });
        
        // Group by class
        $byClass = $records->groupBy('class')
            ->map(function ($classRecords) {
                return [
                    'total_minutes' => $classRecords->sum('duration_minutes'),
                    'total_hours' => $this->formatMinutes($classRecords->sum('duration_minutes')),
                    'sessions' => $classRecords->count(),
                ];
            });
        
        // Daily breakdown
        $dailyBreakdown = $records->groupBy(function ($record) {
            return $record->teaching_date->format('Y-m-d');
        })->map(function ($dayRecords, $date) {
            return [
                'date' => Carbon::parse($date)->format('l, M j, Y'),
                'total_minutes' => $dayRecords->sum('duration_minutes'),
                'total_hours' => $this->formatMinutes($dayRecords->sum('duration_minutes')),
                'sessions' => $dayRecords->count(),
            ];
        });
        
        $totalMinutes = $records->sum('duration_minutes');
        
        return Inertia::render('teaching-records/weekly-recap', [
            'weekStart' => $startOfWeek->format('M j, Y'),
            'weekEnd' => $endOfWeek->format('M j, Y'),
            'selectedDate' => $date,
            'totalHours' => $this->formatMinutes($totalMinutes),
            'totalSessions' => $records->count(),
            'bySubject' => $bySubject,
            'byClass' => $byClass,
            'dailyBreakdown' => $dailyBreakdown,
        ]);
    }

    /**
     * Format minutes to hours and minutes.
     *
     * @param int $minutes
     * @return string
     */
    protected function formatMinutes(int $minutes): string
    {
        if ($minutes === 0) {
            return '0h';
        }
        
        $hours = floor($minutes / 60);
        $remainingMinutes = $minutes % 60;
        
        if ($hours > 0) {
            return $remainingMinutes > 0 ? "{$hours}h {$remainingMinutes}m" : "{$hours}h";
        }
        
        return "{$remainingMinutes}m";
    }
}