# from rest_framework import permissions

# class IsSuperuserForDelete(permissions.BasePermission):
#     def has_permission(self, request,view):
#         print(request.method)
#         if request.method == 'DELETE':
#             return request.user.is_superuser
#         return True 
from rest_framework import permissions

class AllowAllForCRUD(permissions.BasePermission):
    def has_permission(self, request, view):
        return True