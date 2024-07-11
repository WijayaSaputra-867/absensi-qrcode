<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Shift;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shifts = Shift::all();
        return Inertia::render('Shift/Index', [
            'shifts' => $shifts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Shift/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string|min:4",
            "work_time" => "required",
            "break_start" => "required",
            "break_end" => "required",
            "home_time" => "required"
        ]);

        Shift::create([
            "shift_name" => $request->name,
            "work_time" => $request->work_time,
            "break_start" => $request->break_start,
            "break_end" => $request->break_end,
            "home_time" => $request->home_time
        ]);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Shift $shift)
    {
        $users = User::where('shift_id', $shift->id)->get();

        return Inertia::render('Shift/Show', [
            'shift' => $shift,
            'users' => $users
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shift $shift)
    {
        return Inertia::render('Shift/Edit', [
            'shift' => $shift
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Shift $shift)
    {
        $request->validate([
            "name" => "required|string|min:4",
            "work_time" => "required",
            "break_start" => "required",
            "break_end" => "required",
            "home_time" => "required"
        ]);

        $shift->update([
            "shift_name" => $request->name,
            "work_time" => $request->work_time,
            "break_start" => $request->break_start,
            "break_end" => $request->break_end,
            "home_time" => $request->home_time
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shift $shift)
    {
        //
    }
}
