<?php

use Illuminate\Database\Seeder;

use App\Models\EventType;
use App\Models\Event;
use App\Models\Location;

class EventsSeeder extends Seeder
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
        $eventTypes = [[
          "name" => "Circle",
          "icon" => "icon-radiobox-blank"
        ],[
          "name" => "Konzert",
          "icon" => "icon-music-note"
        ],[
          "name" => "Essen",
          "icon" => "icon-silverware-variant"
        ],[
          "name" => "Vortrag",
          "icon" => "icon-theater"
        ],[
          "name" => "Party",
          "icon" => "icon-untappd"
        ]];

        foreach($eventTypes as $type){
          $et = new EventType;
          $et->name = $type["name"];
          $et->icon = $type["icon"];
          $et->save();
        }


        $events = [
        [
          "name" => "Orga Circle",
          "start_at" => "2016-12-22 16:00:00",
          "end_at" => "2016-12-22 19:00:00",
          "type" => "Circle",
          "location" => "Point Villach"
        ],
        [
          "name" => "Sylvester Party",
          "start_at" => "2016-12-31 20:00:00",
          "end_at" => "2016-12-31 23:00:00",
          "type" => "Party",
          "location" => "Point Villach"
        ],
        [
          "name" => "Weihnachtsessen",
          "start_at" => "2016-12-23 19:00:00",
          "end_at" => "2016-12-23 23:00:00",
          "type" => "Essen",
          "location" => "Lorenz"
        ],
        [
          "name" => "The Stolen Goose Project feat. the fox quartett",
          "start_at" => "2016-12-31 20:00:00",
          "end_at" => "2016-12-31 23:00:00",
          "type" => "Konzert",
          "location" => "Lorenz"
        ],
        [
          "name" => "Haus Circle",
          "start_at" => "2016-12-29 18:00:00",
          "end_at" => "2016-12-29 21:00:00",
          "type" => "Circle",
          "location" => "Lorenz"
        ]
      ];

      foreach($events as $event){
        $e = new Event;
        $e->name = $event['name'];
        $e->start_at = $event['start_at'];
        $e->end_at = $event['end_at'];
        $e->type_id = EventType::where('name','=', $event['type'])->first()->id;
        $e->location_id = Location::where('name', '=', $event['location'])->first()->id;
        $e->save();

      }
    }
}
