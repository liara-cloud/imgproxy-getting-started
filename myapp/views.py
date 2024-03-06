from django.shortcuts import render, redirect
from .forms import ImageForm
from .models import Image

def upload_image(request):
    if request.method == 'POST':
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('display_images')
    else:
        form = ImageForm()
    return render(request, 'upload.html', {'form': form})

def display_images(request):
    images = Image.objects.all()
    return render(request, 'display_images.html', {'images': images})
