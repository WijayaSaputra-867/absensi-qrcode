<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {


        if (Auth::check() && !$request->user()->isAdmin()) {
            if (!in_array($request->route()->uri(), ['dashboard', 'profile', 'calendar', 'logout', 'login', '/'])) {
                abort(403, "you don't have access to this page");
            }
        }




        return $next($request);
    }
}
