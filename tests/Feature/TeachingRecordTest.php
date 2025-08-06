<?php

use App\Models\TeachingRecord;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('allows user to view teaching records index', function () {
    $this->actingAs($this->user)
        ->get(route('teaching-records.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('teaching-records/index'));
});

it('allows user to create teaching record', function () {
    $data = [
        'teaching_date' => now()->format('Y-m-d'),
        'subject' => 'Mathematics',
        'class' => 'Grade 5A',
        'material_topic' => 'Basic algebra concepts',
        'start_time' => '09:00',
        'end_time' => '10:30',
        'notes' => 'Students understood the concepts well',
    ];

    $this->actingAs($this->user)
        ->post(route('teaching-records.store'), $data)
        ->assertRedirect();

    $this->assertDatabaseHas('teaching_records', [
        'user_id' => $this->user->id,
        'subject' => 'Mathematics',
        'class' => 'Grade 5A',
    ]);
});

it('validates basic required fields', function () {
    $data = []; // Empty data should trigger validation errors

    $response = $this->actingAs($this->user)
        ->post(route('teaching-records.store'), $data);
    
    $response->assertSessionHasErrors([
        'teaching_date', 
        'subject', 
        'class', 
        'material_topic', 
        'start_time', 
        'end_time'
    ]);
});

it('only allows users to view own records', function () {
    $otherUser = User::factory()->create();
    $otherRecord = TeachingRecord::factory()->create(['user_id' => $otherUser->id]);

    $this->actingAs($this->user)
        ->get(route('teaching-records.show', $otherRecord))
        ->assertForbidden();
});

it('allows user to update teaching record', function () {
    $record = TeachingRecord::factory()->create(['user_id' => $this->user->id]);

    $data = [
        'teaching_date' => $record->teaching_date,
        'subject' => 'Updated Subject',
        'class' => $record->class,
        'material_topic' => $record->material_topic,
        'start_time' => $record->start_time,
        'end_time' => $record->end_time,
    ];

    $this->actingAs($this->user)
        ->put(route('teaching-records.update', $record), $data)
        ->assertRedirect();

    $this->assertDatabaseHas('teaching_records', [
        'id' => $record->id,
        'subject' => 'Updated Subject',
    ]);
});

it('allows user to delete teaching record', function () {
    $record = TeachingRecord::factory()->create(['user_id' => $this->user->id]);

    $this->actingAs($this->user)
        ->delete(route('teaching-records.destroy', $record))
        ->assertRedirect();

    $this->assertDatabaseMissing('teaching_records', ['id' => $record->id]);
});

it('allows user to view weekly recap', function () {
    TeachingRecord::factory()->count(3)->create([
        'user_id' => $this->user->id,
        'teaching_date' => now()->format('Y-m-d'),
    ]);

    $this->actingAs($this->user)
        ->get(route('teaching-records.weekly-recap'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('teaching-records/weekly-recap'));
});

it('calculates duration correctly', function () {
    $record = TeachingRecord::factory()->create([
        'user_id' => $this->user->id,
        'start_time' => '09:00',
        'end_time' => '10:30',
    ]);

    expect($record->fresh()->duration_minutes)->toBe(90);
    expect($record->fresh()->duration_hours)->toBe('1h 30m');
});

it('requires end time after start time', function () {
    $data = [
        'teaching_date' => now()->format('Y-m-d'),
        'subject' => 'Mathematics',
        'class' => 'Grade 5A',
        'material_topic' => 'Test topic',
        'start_time' => '10:00',
        'end_time' => '09:00', // Before start time
    ];

    $this->actingAs($this->user)
        ->post(route('teaching-records.store'), $data)
        ->assertInvalid(['end_time']);
});

it('prevents future dates', function () {
    $data = [
        'teaching_date' => now()->addDays(1)->format('Y-m-d'), // Future date
        'subject' => 'Mathematics',
        'class' => 'Grade 5A',
        'material_topic' => 'Test topic',
        'start_time' => '09:00',
        'end_time' => '10:00',
    ];

    $this->actingAs($this->user)
        ->post(route('teaching-records.store'), $data)
        ->assertInvalid(['teaching_date']);
});