<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Shift;
use App\Models\Presence;
use App\Models\PresenceScan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PresenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        return inertia::render('Presence/Index');
    }

    public function month()
    {
        $presences =  Presence::with('user')->groupBy('user_id', 'month', 'year')
            ->select(
                'id',
                'user_id',
                'month',
                'year',
                DB::raw('SUM(is_present) as total_present'),
                DB::raw('SUM(is_absent) as total_absent'),
                DB::raw('SUM(is_permission) as total_permission'),
                DB::raw('SUM(is_late) as total_late'),
            )
            ->get();


        return Inertia::render('Presence/Group', [
            'presences' => $presences,
            'title' => 'Month'
        ]);
    }


    public function year()
    {
        $presences =  Presence::with('user')->groupBy('user_id', 'month', 'year')
            ->select(
                'id',
                'user_id',
                'month',
                'year',
                DB::raw('SUM(is_present) as total_present'),
                DB::raw('SUM(is_absent) as total_absent'),
                DB::raw('SUM(is_permission) as total_permission'),
                DB::raw('SUM(is_late) as total_late'),
            )
            ->get();

        return Inertia::render('Presence/Group', [
            'presences' => $presences,
            'title' => 'Year'
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Presence $presence)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Presence $presence)
    {
        $presences = Presence::where('user_id', $presence->user_id)->get();
        $user = User::find($presence->user_id);
        return Inertia::render('Presence/Edit', [
            'presences' => $presences,
            'presence' => $presence,
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Presence $presence)
    {
        $request->validate([
            'date' => 'required',
            'month' => 'required',
            'year' => 'required',
            'description' => 'required|string',
        ]);

        $new_presence = Presence::where('user_id', $presence->user_id)->where('date', $request->date)->where('month', $request->month)->where('year', $request->year)->first();
        switch ($request->description) {
            case 'present':
                $present = 1;
                $absent = 0;
                $permission = 0;
                $late = 0;
                break;
            case 'absent':
                $present = 0;
                $absent = 1;
                $permission = 0;
                $late = 0;
                break;
            case 'permission':
                $present = 0;
                $absent = 0;
                $permission = 1;
                $late = 0;
                break;
            case 'late':
                $present = 0;
                $absent = 0;
                $permission = 0;
                $late = 1;
                break;
        }

        $new_presence->update([
            'is_present' => $present,
            'is_absent' => $absent,
            'is_permission' => $permission,
            'is_late' => $late,
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Presence $presence)
    {
        //
    }

    public function scans()
    {
        $shifts = Shift::all();
        $hour = Carbon::now()->format('H');
        $currentHour = Carbon::createFromTime($hour, 00)->format('H:i');
        $result = [];
        $index = 0;

        foreach ($shifts as $shift) {
            $workTimeRange[$index] = [
                'start' => Carbon::createFromFormat('H:i', $shift->work_time)->subMinutes(30)->format('H:i'),
                'end' => Carbon::createFromFormat('H:i', $shift->work_time)->addMinutes(30)->format('H:i'),
            ];

            $breakStartTimeRange[$index] = [
                'start' => Carbon::createFromFormat('H:i', $shift->break_start)->subMinutes(30)->format('H:i'),
                'end' => Carbon::createFromFormat('H:i', $shift->break_start)->addMinutes(30)->format('H:i'),
            ];

            $breakEndTimeRange[$index] = [
                'start' => Carbon::createFromFormat('H:i', $shift->break_end)->subMinutes(30)->format('H:i'),
                'end' => Carbon::createFromFormat('H:i', $shift->break_end)->addMinutes(30)->format('H:i'),
            ];

            $homeTimeRange[$index] = [
                'start' => Carbon::createFromFormat('H:i', $shift->home_time)->subMinutes(30)->format('H:i'),
                'end' => Carbon::createFromFormat('H:i', $shift->home_time)->addMinutes(30)->format('H:i'),
            ];
            $index++;
        }

        // dd($workTimeRange);
        foreach ($workTimeRange as $workTime) {
            if (Carbon::createFromFormat('H:i', $workTime['start'])->addMinutes(30)->format('H:i') == $currentHour) {
                $result['start'] = $workTime['start'];
                $result['end'] = $workTime['end'];
            }
        }

        foreach ($breakStartTimeRange as $breakTime) {
            if (Carbon::createFromFormat('H:i', $breakTime['start'])->addMinutes(30)->format('H:i') == $currentHour) {
                $result['start'] = $breakTime['start'];
                $result['end'] = $breakTime['end'];
            }
        }

        foreach ($breakEndTimeRange as $breakTime) {
            if (Carbon::createFromFormat('H:i', $breakTime['start'])->addMinutes(30)->format('H:i') == $currentHour) {
                $result['start'] = $breakTime['start'];
                $result['end'] = $breakTime['end'];
            }
        }

        foreach ($homeTimeRange as $homeTime) {
            if (Carbon::createFromFormat('H:i', $homeTime['start'])->addMinutes(30)->format('H:i') == $currentHour) {
                $result['start'] = $homeTime['start'];
                $result['end'] = $homeTime['end'];
            }
        }

        // dd($result);

        return Inertia::render('Presence/Scan/Scanner', [
            'result' => $result
        ]);
    }

    public function scans_index()
    {
        $data = PresenceScan::with('user')->get();
        return Inertia::render('Presence/Scan/Index', [
            'presences' => $data
        ]);
    }

    public function scans_store(Request $request)
    {
        $user = User::where('qrcode', $request->input('scannedText'))->first();
        $hour = Carbon::now()->format('H');
        $time = Carbon::createFromTime($hour, 00)->format('H:i');
        $shifts = Shift::all();
        $shift_id = 0;
        $work = 0;
        $break_start = 0;
        $break_end = 0;
        $home = 0;

        // dd($time);
        foreach ($shifts as $shift) {
            if ($shift->work_time == $time) {
                $shift_id = $shift->id;
                $work = 1;
            } else if ($shift->break_start == $time) {
                $shift_id = $shift->id;
                $break_start = 1;
            } else if ($shift->break_end == $time) {
                $shift_id = $shift->id;
                $break_end = 1;
            } else if ($shift->home_time == $time) {
                $shift_id = $shift->id;
                $home = 1;
            }
        }

        if ($user->shift_id == $shift_id) {
            $scan = PresenceScan::where('user_id', $user->id)->first();
            $scan->update([
                'time_1' => $work,
                'time_2' => $break_start,
                'time_3' => $break_end,
                'time_4' => $home
            ]);
        } else {
            return redirect()->back();
        }

        return redirect()->back();
    }
}
