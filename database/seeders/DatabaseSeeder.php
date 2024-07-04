<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserDetail;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'M.Wijaya Saputra',
            'role' => 'admin',
            'email' => 'wijayasaputra679@gmail.com',
            'password' => Hash::make(12345678),
            'role' => 'admin'
        ]);

        // UserDetail::factory()->create([
        //     'user_id' => 1,
        //     'gender' =>'Male',
        //     'qrcode' => Hash::make('M.Wijaya Saputra Manager'),
        //     'phone' => 83875041369,
        //     'address' => 'Depok',
        //     'division' => 'Manager'
        // ]);
    }
}
