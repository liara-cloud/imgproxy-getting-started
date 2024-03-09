<style>
    form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
    }

    input[type="file"] {
        display: none;
    }

    .custom-file-upload {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
        border-radius: 5px;
        background-color: #fff;
    }

    .custom-file-upload:hover {
        background-color: #eee;
    }

    button[type="submit"] {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button[type="submit"]:hover {
        background-color: #45a049;
    }
</style>

<form action="{{ route('photo.store') }}" method="post" enctype="multipart/form-data">
    @csrf
    <label for="photo" class="custom-file-upload">انتخاب عکس</label>
    <input type="file" id="photo" name="photo" accept="image/*">
    <button type="submit">آپلود عکس</button>
</form>
