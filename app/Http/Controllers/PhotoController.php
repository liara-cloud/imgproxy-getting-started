<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Photo;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imgProxyConf = config('custom.img_proxy_conf');
        $options = $imgProxyConf['options'];
        $gravity = $imgProxyConf['gravity'];
        $signature = $imgProxyConf['signature'];


        $phototemp = $request->file('photo')->store('public/photos');
        $photoPath_ = env('ENDPOINT_URL') . Storage::url($phototemp);
        $photoPath = env('IMGPROXY_URL') . '/' . $signature . '/' . $options . '/' . $gravity . '/plain/' . $photoPath_;


        Photo::create([
            'path' => $photoPath,
        ]);

        return redirect()->route('photo.index');
    }
    
    public function index()
    {
        $photos = Photo::all();
        return view('photos.index', compact('photos'));
    }
}
