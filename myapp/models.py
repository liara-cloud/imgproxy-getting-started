from django.db import models
from django.conf import settings

img_proxy_conf = {
    "signature": "_",
    "options": "resize:fill:300:400:0",
    "gravity": "gravity:sm",
}

class Image(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='')
    full_path = models.CharField(max_length=255)
    final_result = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        if self.image:

            self.full_path = f"{settings.ENDPOINT}{self.image.url}"

            if settings.IMGPROXY_URL != "":
                self.final_result = (
                    f"{settings.IMGPROXY_URL}/{img_proxy_conf['signature']}/"
                    f"{img_proxy_conf['options']}/{img_proxy_conf['gravity']}/plain/"
                    f"{self.full_path}"
                )
            else:
                self.final_result = self.image.url

        super().save(*args, **kwargs)
