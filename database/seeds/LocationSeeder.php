<?php

use Illuminate\Database\Seeder;

use App\Models\LocationType;
use App\Models\Location;

class LocationSeeder extends Seeder
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
        $locationType = new LocationType();

        $locationType->name = "Point";
        $locationType->save();

        $location = new Location();
        $location->name = "Point Villach";
        $location->display_name = "Point Villach";
        $location->address = "Lederergasse, 9500 Villach";
        $location->color = "green";
        $location->save();

        $location->types()->attach($locationType);


        $locationType = new LocationType();

        $locationType->name = "Wohnprojekt";
        $locationType->save();

        $location = new Location();
        $location->name = "Lorenz";
        $location->display_name = "Lorenz";
        $location->address = "Denkmalweg 7, 9581 Ledenitzen";
        $location->color = "red";
        $location->save();

        $location->types()->attach($locationType);
    }
}
