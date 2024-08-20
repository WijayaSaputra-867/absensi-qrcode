<?php

namespace App\Traits;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Shift;

trait Time
{
    public function timeRange()
    {
        $shifts = Shift::all();
        $currentTime = Carbon::now()->format('H:i');
        $result = [];
        $index = 0;
        $workTimeRange = [];
        $breakStartTimeRange = [];
        $breakEndTimeRange = [];
        $homeTimeRange = [];

        foreach ($shifts as $shift) {
            $workTimeRange[$index] = [
                'id' => $shift->id,
                'start' => Carbon::createFromFormat('H:i', $shift->work_time)->subMinutes(30)->format('H:i'),
                'end' => Carbon::createFromFormat('H:i', $shift->work_time)->addMinutes(30)->format('H:i'),
            ];

            $breakStartTimeRange[$index] = [
                'id' => $shift->id,
                'start' => Carbon::createFromFormat('H:i', $shift->break_start)->subMinutes(30)->format('H:i'),
                'end' => Carbon::createFromFormat('H:i', $shift->break_start)->addMinutes(30)->format('H:i'),
            ];

            $breakEndTimeRange[$index] = [
                'id' => $shift->id,
                'start' => Carbon::createFromFormat('H:i', $shift->break_end)->subMinutes(30)->format('H:i'),
                'end' => Carbon::createFromFormat('H:i', $shift->break_end)->addMinutes(30)->format('H:i'),
            ];

            $homeTimeRange[$index] = [
                'id' => $shift->id,
                'start' => Carbon::createFromFormat('H:i', $shift->home_time)->subMinutes(30)->format('H:i'),
                'end' => Carbon::createFromFormat('H:i', $shift->home_time)->addMinutes(30)->format('H:i'),
            ];
            $index++;
        }

        // dd($workTimeRange, $breakStartTimeRange, $breakEndTimeRange, $homeTimeRange);

        foreach ($workTimeRange as $workTime) {
            if ($result == null) {
                if ($currentTime >= $workTime['start'] && $currentTime <= $workTime['end']) {
                    $result['id'] = $workTime['id'];
                    $result['start'] = $workTime['start'];
                    $result['end'] = $workTime['end'];
                }
            }
        }

        foreach ($breakStartTimeRange as $breakStartTime) {
            if ($result == null) {
                if ($currentTime >= $breakStartTime['start'] && $currentTime <= $breakStartTime['end']) {
                    $result['id'] = $breakStartTime['id'];
                    $result['start'] = $breakStartTime['start'];
                    $result['end'] = $breakStartTime['end'];
                }
            }
        }

        foreach ($breakEndTimeRange as $breakEndTime) {
            if ($result == null) {
                if ($currentTime >= $breakEndTime['start'] && $currentTime <= $breakEndTime['end']) {
                    $result['id'] = $breakEndTime['id'];
                    $result['start'] = $breakEndTime['start'];
                    $result['end'] = $breakEndTime['end'];
                }
            }
        }

        foreach ($homeTimeRange as $homeTime) {
            if ($result == null) {
                if ($currentTime >= $homeTime['start'] && $currentTime <= $homeTime['end']) {
                    $result['id'] = $homeTime['id'];
                    $result['start'] = $homeTime['start'];
                    $result['end'] = $homeTime['end'];
                }
            }
        }

        return $result;
        // dd($result);
    }

    public function checkShift(string $qrcode)
    {
        $user = User::where('qrcode', $qrcode)->with('shift')->first();
        $message = "";

        if ($user == null) {
            $message = "This employee is not in the list";
            return $message;
        }

        $time = $this->timeRange();
        $currentTime = Carbon::now()->format('H:i');
        $result = [
            'work_time' => 0,
            'break_start' => 0,
            'break_end' => 0,
            'home_time' => 0,
            'late' => 0,
            'user_id' => $user->id,
        ];

        $workTimeRange = [];
        $breakStartTimeRange = [];
        $breakEndTimeRange = [];
        $homeTimeRange = [];

        if ($user->shift_id == $time['id']) {
            $workTimeRange['start'] = Carbon::createFromFormat('H:i', $user->shift->work_time)->subMinutes(30)->format('H:i');
            $workTimeRange['time'] = $user->shift->work_time;
            $workTimeRange['end'] = Carbon::createFromFormat('H:i', $user->shift->work_time)->addMinutes(30)->format('H:i');

            $breakStartTimeRange['start'] = Carbon::createFromFormat('H:i', $user->shift->break_start)->subMinutes(30)->format('H:i');
            $breakStartTimeRange['time'] = $user->shift->break_start;
            $breakStartTimeRange['end'] = Carbon::createFromFormat('H:i', $user->shift->break_start)->addMinutes(30)->format('H:i');

            $breakEndTimeRange['start'] = Carbon::createFromFormat('H:i', $user->shift->break_end)->subMinutes(30)->format('H:i');
            $breakEndTimeRange['time'] = $user->shift->break_end;
            $breakEndTimeRange['end'] = Carbon::createFromFormat('H:i', $user->shift->break_end)->addMinutes(30)->format('H:i');

            $homeTimeRange['start'] = Carbon::createFromFormat('H:i', $user->shift->home_time)->subMinutes(30)->format('H:i');
            $homeTimeRange['time'] = $user->shift->home_time;
            $homeTimeRange['end'] = Carbon::createFromFormat('H:i', $user->shift->home_time)->addMinutes(30)->format('H:i');
        } else {
            $message = 'This employee is not on the current shift!';
            return $message;
        }

        if ($currentTime >= $workTimeRange['start'] && $currentTime <= $workTimeRange['end']) {
            if ($currentTime >= $workTimeRange['start'] && $currentTime <= $workTimeRange['time']) {
                $result['work_time'] = 1;
            } else {
                $result['work_time'] = 1;
                $result['late'] = 1;
            }
        } else if ($currentTime >= $breakStartTimeRange['start'] && $currentTime <= $breakStartTimeRange['end']) {
            if ($currentTime >= $breakStartTimeRange['start'] && $currentTime <= $breakStartTimeRange['time']) {
                $result['break_start'] = 1;
            } else {
                $result['break_start'] = 1;
                $result['late'] = 1;
            }
        } else if ($currentTime >= $breakEndTimeRange['start'] && $currentTime <= $breakEndTimeRange['end']) {
            if ($currentTime >= $breakEndTimeRange['start'] && $currentTime <= $breakEndTimeRange['time']) {
                $result['break_end'] = 1;
            } else {
                $result['break_end'] = 1;
                $result['late'] = 1;
            }
        } else if ($currentTime >= $homeTimeRange['start'] && $currentTime <= $homeTimeRange['end']) {
            if ($currentTime >= $homeTimeRange['start'] && $currentTime <= $homeTimeRange['time']) {
                $result['home_time'] = 1;
            } else {
                $result['home_time'] = 1;
                $result['late'] = 1;
            }
        }

        return $result;
        // dd($result);
    }
}
