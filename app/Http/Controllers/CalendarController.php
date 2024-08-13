<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CalendarController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $schedules = Schedule::where('shift_id', $user->shift_id)->get();

        return Inertia::render('Schedule/Calendar', [
            'dates' => $schedules,
        ]);
    }
}
