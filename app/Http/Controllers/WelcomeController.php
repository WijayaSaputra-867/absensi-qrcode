<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;

class WelcomeController extends Controller
{
    public function welcome()
    {
        // check if user not null
        if (User::count() == 0) {
            return Redirect::route('admin.create');
        }
        return Redirect::route('login');
    }
}
