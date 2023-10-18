from django.urls import path,include
from .views import custom_login,CustomUserViewSet,custom_logout
from rest_framework.routers import DefaultRouter
# from django.contrib.auth.views import LogoutView

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)

urlpatterns = [
    path('login/', custom_login,name='login'),
    path('logout/', custom_logout, name='logout'),
    path('api/', include(router.urls)),
]