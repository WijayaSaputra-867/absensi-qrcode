<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
        $user = [
            "name" => "",
            "email" => "",
            "password" => "",
        ];
        return Inertia::render('User/Create', ['user' => $user]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi untuk data user
        $request->validate([
            'name' => 'required|string|min:5|max:100',
            'email' => 'required|string|email|unique:users,email|max:100',
            'password' => 'required|string|min:8|confirmed'
        ]);

        // Memasukan ke variabel user
        $user = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'gender' => '',
            'phone' => '',
            'address' => '',
            'division' => ''
        ];

        // Mengirim ke Detail user
        return Inertia::render('User/Detail/Create', [
            'user' => $user,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('User/Show', ['user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        // mengambil semua data user untuk mengirim data
        $users = User::orderBy('name', 'asc')->paginate(5);

        // mengembalikan data user dan semua user ke view
        return Inertia::render('User/Edit', [
            'users' => $users,
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        // melakukan validasi untuk ubdah data
        $request->validate([
            'name' => 'required|string|min:5|max:100',
            'email' => 'required|string|email|max:100|unique:users,email,' . $user->id,
        ]);

        // mengubah data sesuai dari post
        $user->update([
            'name' => $request->name,
            'email' => $request->email
        ]);

        return Redirect::route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {

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
