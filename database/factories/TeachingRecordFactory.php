<?php

namespace Database\Factories;

use App\Models\TeachingRecord;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TeachingRecord>
 */
class TeachingRecordFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\TeachingRecord>
     */
    protected $model = TeachingRecord::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subjects = [
            'Mathematics', 'English Literature', 'History', 'Science', 'Physics', 
            'Chemistry', 'Biology', 'Geography', 'Art', 'Music', 'Physical Education'
        ];
        
        $classes = [
            'Grade 1A', 'Grade 1B', 'Grade 2A', 'Grade 2B', 'Grade 3A', 'Grade 3B',
            'Grade 4A', 'Grade 4B', 'Grade 5A', 'Grade 5B', 'Grade 6A', 'Grade 6B'
        ];
        
        $materials = [
            'Introduction to Algebra', 'Reading Comprehension', 'World War II',
            'Scientific Method', 'Newton\'s Laws', 'Chemical Bonds', 'Plant Biology',
            'Map Reading', 'Color Theory', 'Musical Scales', 'Team Sports'
        ];
        
        // Generate random start time between 8 AM and 4 PM
        $startHour = $this->faker->numberBetween(8, 16);
        $startMinute = $this->faker->randomElement([0, 15, 30, 45]);
        $startTime = sprintf('%02d:%02d', $startHour, $startMinute);
        
        // Generate end time 1-3 hours after start time
        $durationMinutes = $this->faker->randomElement([60, 90, 120, 150, 180]);
        $endTime = \Carbon\Carbon::createFromTimeString($startTime)->addMinutes($durationMinutes)->format('H:i');
        
        return [
            'user_id' => User::factory(),
            'teaching_date' => $this->faker->dateTimeBetween('-30 days', 'today')->format('Y-m-d'),
            'subject' => $this->faker->randomElement($subjects),
            'class' => $this->faker->randomElement($classes),
            'material_topic' => $this->faker->randomElement($materials),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'notes' => $this->faker->optional(0.7)->paragraph(),
        ];
    }
}