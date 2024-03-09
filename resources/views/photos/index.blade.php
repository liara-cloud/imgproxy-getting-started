@foreach($photos as $photo)
    <img src="{{ $photo->path}}" alt="Photo">
@endforeach
