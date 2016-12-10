<?php

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        //
        $owner = new Role();
        $owner->name         = 'user';
        $owner->display_name = 'General User'; // optional
        $owner->description  = 'This is the standard User'; // optional
        $owner->save();

        $admin = new Role();
        $admin->name         = 'admin';
        $admin->display_name = 'Administrator'; // optional
        $admin->description  = 'An administrator of any kind of managin'; // optional
        $admin->save();

        $admin = new Role();
        $admin->name         = 'super_admin';
        $admin->display_name = 'Super Administrator'; // optional
        $admin->description  = 'Super Admins can do everything'; // optional
        $admin->save();
    }
}
