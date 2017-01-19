<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;
use App\Models\LocationType;

class LocationController extends Controller
{
    //
    public function all(){
      return Location::with('types', 'images')->get();
    }
    public function get($id){
      return Location::find($id)->load(['types', 'images']);
    }
    public function getTypes(){
      return LocationType::all();
    }
}
