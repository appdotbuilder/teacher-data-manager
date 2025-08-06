<?php

namespace Database\Seeders;

use App\Models\TeachingRecord;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeachingRecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a sample teacher user if none exists
        $user = User::firstOrCreate(
            ['email' => 'teacher@example.com'],
            [
                'name' => 'Sample Teacher',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        // Create teaching records for the past week
        $startDate = now()->startOfWeek();
        $subjects = ['Mathematics', 'English Literature', 'Science', 'History', 'Art'];
        $classes = ['Grade 5A', 'Grade 5B', 'Grade 6A', 'Grade 4B'];
        $materials = [
            'Algebra basics and equations',
            'Shakespeare\'s Romeo and Juliet',
            'Introduction to Physics',
            'World War II timeline',
            'Color theory and mixing',
            'Advanced multiplication tables',
            'Poetry analysis techniques',
            'Chemical reactions and experiments',
            'Ancient civilizations',
            'Drawing fundamentals'
        ];

        for ($day = 0; $day < 5; $day++) {
            $date = $startDate->copy()->addDays($day);
            
            // Create 2-4 teaching sessions per day
            $sessionsCount = random_int(2, 4);
            $currentTime = 8; // Start at 8 AM
            
            for ($session = 0; $session < $sessionsCount; $session++) {
                // Duration between 1-3 hours
                $duration = random_int(60, 180); // minutes
                $startTime = sprintf('%02d:%02d', $currentTime, random_int(0, 1) * 30);
                $endTime = \Carbon\Carbon::createFromTimeString($startTime)->addMinutes($duration)->format('H:i');
                
                TeachingRecord::create([
                    'user_id' => $user->id,
                    'teaching_date' => $date->format('Y-m-d'),
                    'subject' => $subjects[random_int(0, count($subjects) - 1)],
                    'class' => $classes[random_int(0, count($classes) - 1)],
                    'material_topic' => $materials[random_int(0, count($materials) - 1)],
                    'start_time' => $startTime,
                    'end_time' => $endTime,
                    'notes' => random_int(0, 1) ? 'Students were engaged and participated well in today\'s lesson.' : null,
                ]);
                
                // Move to next time slot (add some gap between sessions)
                $currentTime += ($duration / 60) + 0.5; // Add 30 minutes break
                
                // Don't exceed reasonable teaching hours
                if ($currentTime >= 17) break;
            }
        }
    }
}