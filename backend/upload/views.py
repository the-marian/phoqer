from django.core.files.storage import FileSystemStorage
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class ImageUpload(APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        image_file_list = request.FILES.getlist('file')
        fs = FileSystemStorage()
        images_url = []
        for image in image_file_list:
            filename = fs.save(image.name, image)
            images_url.append(fs.url(filename))
        return Response({"images_url": images_url}, status=201)
