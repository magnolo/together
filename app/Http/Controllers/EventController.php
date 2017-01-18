<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Event;
use App\Models\EventType;
use Auth;

class EventController extends Controller
{
    //

    public function get(Request $request){
      $events = Event::with(['location', 'type']);
      if($request->has('start')){
        $events = $events->where('start_at', ">=", date('Y-m-d H:i:s', $request->get('start')));
      }
      if($request->has('end')){
        $events = $events->where('end_at', '<=', date('Y-m-d H:i:s', $request->get('end')));
      }
      $events = $events->get();

      foreach($events as &$event){
        $event->title = $event->name;
        $event->start = $event->start_at;
        $event->end = $event->end_at;
        $event->color = $event->location->color;
        $event->allDay = $event->all_day;
      }

      return $events;
    }

    public function create(Request $request){
      $event = new Event();

      $event->all_day = $request->get('allDay');
      $event->start_at = $request->get('start_at');
      $event->end_at = $request->get('end_at');
      $event->name = $request->get('title');
      $event->location_id = $request->get('location_id');
      $event->type_id = $request->get('type_id');
      $event->online_at = $request->get('online_at');
      $event->public = $request->get('public');
      $event->description = $request->get('description');
      $event->user_id = Auth::user()->id;

      $success = $event->save();

      $event->load('type', 'location', 'user');
      $event->title = $event->name;
      $event->start = $event->start_at;
      $event->end = $event->end_at;
      $event->color = $event->location->color;
      $event->allDay = $event->all_day;

      return  response()->success(compact('success', 'event'));
    }

    public function update(Request $request, $id){
      $event = Event::findOrFail($id);

      if($request->has('allDay')) $event->all_day = $request->get('allDay');
      if($request->has('start_at')) $event->start_at = $request->get('start_at');
      if($request->has('end_at')) $event->end_at = $request->get('end_at');
      if($request->has('title')) $event->name = $request->get('title');
      if($request->has('location_id')) $event->location_id = $request->get('location_id');
      if($request->has('type_id')) $event->type_id = $request->get('type_id');
      if($request->has('online_at')) $event->online_at = $request->get('online_at');
      if($request->has('online_at')) $event->public = $request->get('public');
      if($request->has('description')) $event->description = $request->get('description');

      $success = $event->save();

      $event->load('type', 'location');
      $event->title = $event->name;
      $event->start = $event->start_at;
      $event->end = $event->end_at;
      $event->color = $event->location->color;
      $event->allDay = $event->all_day;

      return  response()->success(compact('success', 'event'));

    }
    public function remove($id){
      $event = Event::findOrFail($id);
      $success =  $event->delete();
      return  response()->success(compact('success', 'event'));
    }
    public function getTypes(){
      return EventType::all();
    }
}
