<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;
use App\Models\TeachingRecord;

class StoreTeachingRecordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'teaching_date' => 'required|date|before_or_equal:today',
            'subject' => 'required|string|max:255',
            'class' => 'required|string|max:255',
            'material_topic' => 'required|string',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->filled('teaching_date') && $this->filled('start_time') && $this->filled('end_time')) {
                // Calculate duration for this new record
                $start = Carbon::createFromTimeString($this->start_time);
                $end = Carbon::createFromTimeString($this->end_time);
                $newDurationMinutes = $end->diffInMinutes($start);
                
                // Get existing records for this user and date
                $existingRecords = TeachingRecord::forUser(auth()->id())
                    ->forDate($this->teaching_date)
                    ->get();
                
                $totalExistingMinutes = $existingRecords->sum('duration_minutes');
                $totalMinutes = $totalExistingMinutes + $newDurationMinutes;
                
                // Check if total exceeds 10 hours (600 minutes)
                if ($totalMinutes > 600) {
                    $remainingMinutes = 600 - $totalExistingMinutes;
                    $remainingHours = floor($remainingMinutes / 60);
                    $remainingMins = $remainingMinutes % 60;
                    
                    $remainingTime = $remainingHours > 0 
                        ? "{$remainingHours}h {$remainingMins}m" 
                        : "{$remainingMins}m";
                    
                    $validator->errors()->add(
                        'end_time', 
                        "Adding this session would exceed the 10-hour daily limit. You have {$remainingTime} remaining for this date."
                    );
                }
            }
        });
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'teaching_date.required' => 'Teaching date is required.',
            'teaching_date.date' => 'Please provide a valid date.',
            'teaching_date.before_or_equal' => 'Teaching date cannot be in the future.',
            'subject.required' => 'Subject is required.',
            'class.required' => 'Class is required.',
            'material_topic.required' => 'Material/Topic taught is required.',
            'start_time.required' => 'Start time is required.',
            'start_time.date_format' => 'Start time must be in HH:MM format.',
            'end_time.required' => 'End time is required.',
            'end_time.date_format' => 'End time must be in HH:MM format.',
            'end_time.after' => 'End time must be after start time.',
        ];
    }
}