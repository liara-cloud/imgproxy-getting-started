<form action="{{ route('photo.store') }}" method="post" enctype="multipart/form-data">
    @csrf
    <input type="file" name="photo">
    <button type="submit">آپلود عکس</button>
</form>
