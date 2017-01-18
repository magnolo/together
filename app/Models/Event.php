<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //protected $dates = ['created_at', 'updated_at', 'online_at', 'start_at', 'end_at'];
    //
    // public function getStartAtAttribute($value){
    //   return strtotime($value);
    // }
    // public function getEndAtAttribute($value){
    //   return strtotime($value);
    // }
    public function type(){
      return $this->belongsTo('App\Models\EventType', 'type_id');
    }
    public function user(){
      return $this->belongsTo('App\Models\User', 'user_id');
    }
    public function location(){
      return $this->belongsTo('App\Models\Location', 'location_id');
    }
}
