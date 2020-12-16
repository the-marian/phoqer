from django.core.files.storage import FileSystemStorage
from rest_framework.parsers import FileUploadParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class ImageUpload(APIView):
    parser_classes = [FileUploadParser]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        image_file = request.data['file']
        fs = FileSystemStorage()
        filename = fs.save(image_file.name, image_file)
        image_url = fs.url(filename)
        print(image_url)
        return Response({"image_url": image_url}, status=201)
