<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    //
    public function type(){
      return $this->belongsTo('App\Models\LocationType', 'type_id');
    }
}
