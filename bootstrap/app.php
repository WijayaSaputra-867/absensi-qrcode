<?php

use Illuminate\Foundation\Application;
use App\Http\Middleware\AdminMiddleware;
<<<<<<< HEAD
=======
use App\Http\Middleware\ShiftMiddleware;
>>>>>>> 7764e16 (Memperbaiki error saat membuat admin dan menambahkan beberapa fitur middleware)
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
<<<<<<< HEAD
            AdminMiddleware::class
=======
        ]);
        $middleware->alias([
            'role' => AdminMiddleware::class,
            'shift' => ShiftMiddleware::class,
>>>>>>> 7764e16 (Memperbaiki error saat membuat admin dan menambahkan beberapa fitur middleware)
        ]);

        // $middleware->append([
        //     AdminMiddleware::class,
        // ]);
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
