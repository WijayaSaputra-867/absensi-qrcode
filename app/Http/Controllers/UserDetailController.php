<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gender' => "required",
            'phone' => "required|integer|min:8",
            'address' => "required|string|min:10",
            'division' => "required|string"
        ]);

        $user = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'gender' => $request->gender,
            'phone' => $request->phone,
            'division' => $request->division,
        ];

        if ($validator->fails()){
            return Inertia::render('User/Detail/Create', [
                'user' => $user,
                'errors' => $validator->errors(),
            ]);
        }

        $new_user = new User;
        $new_user->name = $request->name;
        $new_user->email = $request->email;
        $new_user->password = Hash::make($request->password);

        if($new_user->save()){
            $user = User::latest()->first();
        }

        UserDetail::create([
            'user_id' => $user->id,
            'gender' => $request->gender,
            'qrcode' => Hash::make($request->name),
            'phone' => $request->phone,
            'address' => $request->address,
            'division' => $request->division
        ]);

        // return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(UserDetail $userDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserDetail $userDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserDetail $userDetail)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserDetail $userDetail)
    {
        //
    }
}
