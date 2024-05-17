<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;

class WelcomeController extends Controller
{
    public function welcome()
    {
        return Redirect::route('admin.create');
    }
}
