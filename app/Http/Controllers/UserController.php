<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Shift;
use App\Models\Presence;
use App\Models\UserDetail;
use App\Models\PresenceScan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::where('role', 'employee')->orderBy('name', 'asc')->paginate(5);
        return Inertia::render('User/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $shifts = Shift::all();
        return Inertia::render('User/Create', [
            'shifts' => $shifts
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:5|max:100',
            'email' => 'required|string|email|max:100|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'gender' => 'required',
            'phone' => 'required|numeric|min:8',
            'address' => 'required|string|min:10',
            'division' => 'required|string',
            'shift' => 'required'
        ]);

        $new_user = new User;
        $new_user->shift_id = $request->shift;
        $new_user->name = $request->name;
        $new_user->email = $request->email;
        $new_user->password = Hash::make($request->password);
        $new_user->qrcode = Hash::make($request->name);

        if ($new_user->save()) {
            $user = User::latest()->first();
        }

        UserDetail::create([
            'user_id' => $user->id,
            'gender' => $request->gender,
            'phone' => $request->phone,
            'address' => $request->address,
            'division' => $request->division
        ]);;

        PresenceScan::create([
            'user_id' => $user->id,
        ]);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
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
        return Inertia::render('User/Show', [
            'user' => $user,
            'detail' => $detail,
            'presence' => $presence,
            'title' => "Detail User",
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->with('details');
        $shifts = Shift::all();
        return Inertia::render('User/Edit', [
            'user' => $user,
            'detail' => $user->details,
            'shifts' => $shifts
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|min:5|max:100',
            'email' => 'required|string|email|max:100|unique:users,email, ' . $user->id,
            'gender' => 'required',
            'phone' => 'required|integer|min:8',
            'address' => 'required|string|min:10',
            'division' => 'required|string'
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email
        ]);

        $detail = UserDetail::where('user_id', $user->id)->first();

        $detail->update([
            'gender' => $request->gender,
            'phone' => $request->phone,
            'address' => $request->address,
            'division' => $request->division
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->change_profile) {
            Storage::delete($user->profile);
        }
        $detail = UserDetail::where('user_id', $user->id)->first();
        $detail->delete();
        $user->delete();

        return Redirect::route('users.index');
    }

    /**
     * Search User by name
     */
    public function search(string $name)
    {
        $users = User::where('role', 'not like', 'admin')->where('name', 'like', "%{$name}%")->paginate(5);
        return Inertia::render('User/Index', [
            'users' => $users
        ]);
    }
}
