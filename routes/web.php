<?php

use App\Http\Controllers\TeachingRecordController;
use App\Http\Controllers\WeeklyRecapController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Teaching Records routes
    Route::resource('teaching-records', TeachingRecordController::class);
    Route::get('weekly-recap', [WeeklyRecapController::class, 'index'])->name('teaching-records.weekly-recap');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
