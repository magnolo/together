<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    //
    //
    // protected $dateFormat = 'U';
    // protected $dates = ['created_at', 'updated_at'];

    public function types(){
      return $this->belongsToMany('App\Models\LocationType', 'locations_types', 'location_id', 'type_id');
    }
    public function images(){
      return $this->belongsToMany('App\Models\Image', 'location_images', 'location_id', 'image_id');
    }
}
