from rest_framework import viewsets,status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login,logout
from .models import CustomUser
from .serializers import CustomUserSerializer
from .permissions import AllowAllForCRUD
from rest_framework.authtoken.models import Token


@api_view(['POST'])
def custom_login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, email=email, password=password)
    if user is not None:
        token = Token.objects.get(user = user)
        if token is None:
            token = Token.objects.create(user = user)
        if user.group == 'HR':
            login(request, user)
            return Response({'message': 'Logged in successfully',
                             'token' : token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Your are not a HR'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({'message': 'Authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def custom_logout(request):
    logout(request)
    return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_custom_user(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data.get('password'))  # Set and hash the password
        user.is_active = True
        user.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAllForCRUD]