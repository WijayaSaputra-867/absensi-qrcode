<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Shift;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ScheduleController extends Controller
{
    public function index()
    {
        // get schedule data and shift data
        $dates = Schedule::all();
        $shifts = Shift::all();

        // return index jsx and display data
        return Inertia::render('Schedule/Index', [
            'dates' => $dates,
            'shifts' => $shifts
        ]);
    }

    public function store(Request $request)
    {
        // stores all shifts id
        $shifts = [];
        foreach ($request->input('shifts') as $shift) {
            $shifts[] = $shift;
        }

        // Change format of date
        $formattedDates = [];
        foreach ($request->input('dates') as $date) {
            $formattedDates[] = Carbon::parse($date)->format('d-m-Y');
        }

        // define description
        $desc = $request->input('description');

        // Stores all data to database
        foreach ($shifts as $shift) {
            foreach ($formattedDates as $date) {
                Schedule::create([
                    'shift_id' => $shift,
                    'date' => $date,
                    'description' => $desc
                ]);
            }
        }

        // return back to view
        return redirect()->back();
    }
}
