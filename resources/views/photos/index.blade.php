@foreach($photos as $photo)
    <img src="{{ Storage::url($photo->path) }}" alt="Photo">
@endforeach
