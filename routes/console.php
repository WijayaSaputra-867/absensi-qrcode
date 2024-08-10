<?php

use Carbon\Carbon;
use App\Models\User;
use App\Models\Presence;
use App\Models\Schedule;
use App\Models\PresenceScan;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('presence:check', function () {
    $scan = PresenceScan::all();
    $schedule = Schedule::all();
    $resultScan = [];
    $index = 0;

    // check if presence scan not null and schedule not null
    if (PresenceScan::count() != 0 && Schedule::count() != 0) {
        // loop presence scan
        foreach ($scan as $item) {
            // loop schedule
            foreach ($schedule as $s) {
                // find user id
                $user_id = User::find($item->user_id);
                // check if shift id in user same with shift id in schedule
                if ($user_id->shift_id == $s->shift_id) {
                    // check schedule date is not same with today
                    if ($s->date != Carbon::now()->format('d-m-Y')) {
                        $resultScan[$index]['user_id'] = $item->user_id;
                        // check if time 1 to time 4 is true
                        if ($item->time_1 == 1 && $item->time_2 == 1 && $item->time_3 == 1 && $item->time_4 == 1) {
                            $resultScan[$index]['is_present'] = true;
                            $resultScan[$index]['is_absent'] = false;
                        } else {
                            $resultScan[$index]['is_present'] = false;
                            $resultScan[$index]['is_absent'] = true;
                        } // end else
                        // reset time
                        $item->time_1 = 0;
                        $item->time_2 = 0;
                        $item->time_3 = 0;
                        $item->time_4 = 0;
                        $item->save();
                    } // end if check schedule date is not same with today
                } // end if check if shift id in user same with shift id in schedule
            } // end loop schedule
            // increment index
            $index++;
        } // end loop presence scan

        // looping and create presence
        foreach ($resultScan as $key) {
            Presence::create([
                'user_id' => $key['user_id'],
                'date' => Carbon::now()->format('d'),
                'month' => Carbon::now()->format('m'),
                'year' => Carbon::now()->format('Y'),
                'is_present' => $key['is_present'],
                'is_absent' => $key['is_absent']
            ]);
        }
    }
})->purpose('Check the presence')->dailyAt('00:00');


Artisan::command('email:sender', function () {
    //
})->purpose('Send Reminder Email to User')->hourly();
