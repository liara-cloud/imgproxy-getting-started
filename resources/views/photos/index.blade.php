<style>
    /* استایل برای عکس‌ها */
    .photo-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .photo-container img {
        margin: 10px;
        max-width: 200px;
        max-height: 200px;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
</style>

<div class="photo-container">
    @foreach($photos as $photo)
        <img src="{{ $photo->path }}" alt="Photo">
    @endforeach
</div>
