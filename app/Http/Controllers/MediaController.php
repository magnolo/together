<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\Image;
use App\Models\Location;
use File;
use Response;

class MediaController extends Controller
{
    //
    public function getImage($path, $file){
        $path = storage_path() . '/app/'.$path. '/'. $file;

        //return $path;
        if(!File::exists($path)) abort(404);

        $file = File::get($path);
        $type = File::mimeType($path);

        $response = Response::make($file,200);
        $response->header("Content-Type", $type);
        
        return $response;
    }
    public function uploadImage($id){

        $location = Location::findOrFail($id);
        $file = request()->file('file');
        $path =  request()->file('file')->store('locations');
      
        $size = Storage::size($path);

        $image = new Image;
        $image->path = $path;
        $image->size = $size;
        $image->url = 'images/'.$path;
        $image->type = 'image';
        $image->save();

        $location->images()->attach($image);

        return response()->success(compact('image', 'location', 'file'));
    }
}
