<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TeachingRecord
 *
 * @property int $id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon $teaching_date
 * @property string $subject
 * @property string $class
 * @property string $material_topic
 * @property string $start_time
 * @property string $end_time
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read int $duration_minutes
 * @property-read string $duration_hours
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord query()
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord whereTeachingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord whereClass($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord whereMaterialTopic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord forDate($date)
 * @method static \Illuminate\Database\Eloquent\Builder|TeachingRecord forUser($userId)
 * @method static \Database\Factories\TeachingRecordFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class TeachingRecord extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'teaching_date',
        'subject',
        'class',
        'material_topic',
        'start_time',
        'end_time',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'teaching_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the teaching record.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the duration in minutes.
     *
     * @return int
     */
    public function getDurationMinutesAttribute(): int
    {
        $start = \Carbon\Carbon::createFromTimeString($this->start_time);
        $end = \Carbon\Carbon::createFromTimeString($this->end_time);
        
        return (int) abs($end->diffInMinutes($start));
    }

    /**
     * Get the duration in hours (formatted).
     *
     * @return string
     */
    public function getDurationHoursAttribute(): string
    {
        $minutes = $this->duration_minutes;
        $hours = floor($minutes / 60);
        $remainingMinutes = $minutes % 60;
        
        if ($hours > 0) {
            return $remainingMinutes > 0 ? "{$hours}h {$remainingMinutes}m" : "{$hours}h";
        }
        
        return "{$remainingMinutes}m";
    }

    /**
     * Scope a query to only include records for a specific date.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string|\Carbon\Carbon  $date
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForDate($query, $date)
    {
        return $query->where('teaching_date', $date);
    }

    /**
     * Scope a query to only include records for a specific user.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $userId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}