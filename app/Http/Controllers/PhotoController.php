<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Photo;

class PhotoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $photoPath = $request->file('photo')->store('public/photos');

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
