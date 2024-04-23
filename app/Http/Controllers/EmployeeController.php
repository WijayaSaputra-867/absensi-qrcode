<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str; // Tambahkan baris ini

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::orderBy('name', 'asc')->paginate(5);
        return Inertia::render('Employee/Index', [
            'employees' => $employees
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
        dd($request);

        $request->validate([
            'name' => 'required|string|min:5|max:100',
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'email' => 'required|string|email|unique:employees,email|max:100',
            'phone' => 'required|min:8|unique:employees,phone',
            'address' => 'required|string|min:5|max:255',
            'gender' => 'required'
        ]);

        Employee::create([
            'name' => $request->name,
            'profile_image' => $request->file('profile_image')->store('/upload/profile/employees'),
            'slug' => Str::slug($request->name),
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'gender' => $request->gender,
        ]);

        return Redirect::route('employees.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        return Inertia::render('Employee/Show', [
            'employee' => $employee
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        $employees = Employee::orderBy('name', 'asc')->paginate(5);

        return Inertia::render('Employee/Index', [
            'employees' => $employees,
            'employee' => $employee
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            'name' => 'required|string|min:5|max:100',
            'email' => 'required|string|email|unique:users,email,id|max:100',
            'phone' => 'required|integer|min:8|unique:users,phone,id',
            'gender' => 'required'
        ]);

        $employee->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'gender' => $request->gender,
        ]);

        return Redirect::route('employees.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        Storage::delete($employee->profile_image);
        $employee->delete();

        return Redirect::route('employees.index');
    }
}
