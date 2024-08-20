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
use App\Traits\Time;
use Hamcrest\Arrays\IsArray;

class PresenceController extends Controller
{
    use Time;
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
        // dd($this->timeRange());
        return Inertia::render('Presence/Scan/Scanner', [
            'result' => $this->timeRange()
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
        // dd($request);
        $result =  $this->checkShift($request->input('qr_code'));
        // dd($result);
        if (!is_array($result)) {
            return redirect()->back()->with('error', $result);
        }
        $presenceScan = PresenceScan::where('user_id', $result['user_id'])->first();
        $newLate = $presenceScan->late + 1;

        if ($result['work_time'] == 1) {
            $presenceScan->time_1 = $result['work_time'];
        }
        if ($result['break_start'] == 1) {
            $presenceScan->time_2 = $result['break_start'];
        }
        if ($result['break_end'] == 1) {
            $presenceScan->time_3 = $result['break_end'];
        }
        if ($result['home_time'] == 1) {
            $presenceScan->time_4 = $result['home_time'];
        }
        if ($result['late'] == 1) {
            $presenceScan->late = $newLate;
        }

        if ($presenceScan->save()) {
            return redirect()->back()->with('success', 'Successful Absences');
        } else {
            return redirect()->back()->with('error', 'Failed Absences');
        }
    }
}
