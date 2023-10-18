from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')  # Remove the password field from validated_data
        groups = validated_data.pop('groups', [])  # Remove the groups field and provide a default empty list if not provided
        user_permissions = validated_data.pop('user_permissions', [])  # Default empty list if not provided
        user = CustomUser(**validated_data)
        user.set_password(password)  # Set and hash the password
        user.save()
        user.user_permissions.set(user_permissions)  # Assign user permissions using the set() method
        user.groups.set(groups)  # Assign groups using the set() method
        return user