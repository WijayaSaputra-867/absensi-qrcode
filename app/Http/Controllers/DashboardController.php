<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Presence;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        $detail = UserDetail::where('user_id', $user->id)->first();

        $presence =  Presence::with('user')->where('user_id', $user->id)->where('month', Carbon::now()->format('m'))->groupBy('user_id', 'year')
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
            ->first();

        if ($presence == null) {
            $presence['total_present'] = 0;
            $presence['total_absent'] = 0;
            $presence['total_permission'] = 0;
            $presence['total_late'] = 0;
        }

        // dd($presence->total_present);


        if (Auth::user()->role == 'admin') {
            return Inertia::render('Dashboard');
        } else {
            return Inertia::render('User/Show', [
                'user' => $user,
                'detail' => $detail,
                'presence' => $presence,
                'title' => "Dashboard",
            ]);
        }
    }
}
