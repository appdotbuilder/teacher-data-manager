<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTeachingRecordRequest;
use App\Http\Requests\UpdateTeachingRecordRequest;
use App\Models\TeachingRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class TeachingRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $date = $request->get('date', now()->format('Y-m-d'));
        
        $records = TeachingRecord::forUser(auth()->id())
            ->forDate($date)
            ->orderBy('start_time')
            ->get();
        
        $totalMinutes = $records->sum('duration_minutes');
        $remainingMinutes = max(0, 600 - $totalMinutes); // 10 hours = 600 minutes
        
        return Inertia::render('teaching-records/index', [
            'records' => $records,
            'selectedDate' => $date,
            'totalHours' => $this->formatMinutes($totalMinutes),
            'remainingHours' => $this->formatMinutes($remainingMinutes),
            'dailyLimitReached' => $remainingMinutes <= 0,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $date = $request->get('date', now()->format('Y-m-d'));
        
        // Check remaining hours for the date
        $existingRecords = TeachingRecord::forUser(auth()->id())
            ->forDate($date)
            ->get();
        
        $totalMinutes = $existingRecords->sum('duration_minutes');
        $remainingMinutes = max(0, 600 - $totalMinutes);
        
        return Inertia::render('teaching-records/create', [
            'selectedDate' => $date,
            'remainingHours' => $this->formatMinutes($remainingMinutes),
            'dailyLimitReached' => $remainingMinutes <= 0,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeachingRecordRequest $request)
    {
        $teachingRecord = TeachingRecord::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('teaching-records.index', ['date' => $request->teaching_date])
            ->with('success', 'Teaching record added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(TeachingRecord $teachingRecord)
    {
        // Ensure user can only view their own records
        if ($teachingRecord->user_id !== auth()->id()) {
            abort(403);
        }
        
        return Inertia::render('teaching-records/show', [
            'record' => $teachingRecord,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TeachingRecord $teachingRecord)
    {
        // Ensure user can only edit their own records
        if ($teachingRecord->user_id !== auth()->id()) {
            abort(403);
        }
        
        return Inertia::render('teaching-records/edit', [
            'record' => $teachingRecord,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeachingRecordRequest $request, TeachingRecord $teachingRecord)
    {
        $teachingRecord->update($request->validated());

        return redirect()->route('teaching-records.index', ['date' => $request->teaching_date])
            ->with('success', 'Teaching record updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TeachingRecord $teachingRecord)
    {
        // Ensure user can only delete their own records
        if ($teachingRecord->user_id !== auth()->id()) {
            abort(403);
        }
        
        $date = $teachingRecord->teaching_date->format('Y-m-d');
        $teachingRecord->delete();

        return redirect()->route('teaching-records.index', ['date' => $date])
            ->with('success', 'Teaching record deleted successfully.');
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