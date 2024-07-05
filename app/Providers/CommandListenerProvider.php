<?php

namespace App\Providers;

use App\Models\Year;
use App\Models\Month;
use App\Models\Schedule;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Events\MigrationsEnded;

class CommandListenerProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Event::listen(MigrationsEnded::class, function (MigrationsEnded $event) {
            $this->createSchedule();
        });
    }

    public function createSchedule()
    {
        $year = date('Y');
        $month = date('m');

        $existingYear = Year::where('year', $year)->first();
        if (!$existingYear) {
            $createYear = new Year();
            $createYear->year = $year;
            if ($createYear->save()) {
                $idYear = Year::latest()->first()->id;
            }
        } else {
            $idYear = $existingYear->id;
        }

        $exitingMonth = Month::where("year_id", $idYear)->where("month", $month)->first();
        if (!$exitingMonth) {
            $createMonth = new Month();
            $createMonth->year_id = $idYear;
            $createMonth->month = $month;
            if ($createMonth->save()) {
                $idMonth = Month::latest()->first()->id;
            }
        } else {
            $idMonth = $exitingMonth->id;
        }

        Schedule::create(['month_id' => $idMonth]);
    }
}
