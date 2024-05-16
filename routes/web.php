<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserDetailController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/scan', function () {
    return Inertia::render('Scanner');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile', [ProfileController::class, 'upload_image'])->name('profile.upload-image');

    Route::resource('/users', UserController::class);
    Route::prefix('/users')->group(function () {
        Route::get('/search/{name}', [UserController::class, 'search'])->name('users.search');
        Route::get('/create/details/{user}', [UserDetailController::class, 'create'])->name('details.create');
        Route::post('/create/details', [UserDetailController::class, 'store'])->name('details.store');
    });


});

require __DIR__.'/auth.php';
