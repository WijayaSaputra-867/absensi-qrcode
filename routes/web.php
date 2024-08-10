<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\PresenceController;
use App\Http\Controllers\ScheduleController;

Route::get('/', [WelcomeController::class, 'welcome'])->name('welcome');

Route::get('/pie', function () {
    return Inertia::render('Test');
});

Route::get('/admin', [AdminController::class, 'create'])->name('admin.create');
Route::post('/admin/create', [AdminController::class, 'store'])->name('admin.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // route for profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile', [ProfileController::class, 'upload_image'])->name('profile.upload-image');
});

Route::middleware([AdminMiddleware::class, 'role:admin'])->group(function () {

    // route for user
    Route::resource('/users', UserController::class);
    Route::prefix('/users')->group(function () {
        Route::get('/search/{name}', [UserController::class, 'search'])->name('users.search');
    });

    // route for shift
    Route::resource('/shifts', ShiftController::class);

    // route for schedule
    Route::get('/schedules', [ScheduleController::class, 'index'])->name('schedule.index');
    Route::get('/schedules/create', [ScheduleController::class, 'create'])->name('schedule.create');
    Route::post('/schedules', [ScheduleController::class, 'store'])->name('schedule.store');

    // route for presence
    Route::resource('/presences', PresenceController::class);
    Route::prefix('/presence')->group(function () {
        Route::get('/month', [PresenceController::class, 'month'])->name('presences.month');
        Route::get('/year', [PresenceController::class, 'month'])->name('presences.year');
        Route::get('/scan', [PresenceController::class, 'scans_index'])->name('scans.index');
    });
});

// route for scans
Route::get('/scans', [PresenceController::class, 'scans'])->name('scans');
Route::post('/scans', [PresenceController::class, 'scans_store'])->name('scans.store');

require __DIR__ . '/auth.php';
