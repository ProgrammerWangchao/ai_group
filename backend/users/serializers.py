
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'is_active', 'date_joined']
        read_only_fields = ['id', 'date_joined']

class UserAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 
            'is_staff', 'is_active', 'is_superuser', 
            'is_verified', 'date_joined'
        ]
        read_only_fields = ['id', 'date_joined']

    def validate_is_superuser(self, value):
        if value and not self.context['request'].user.is_superuser:
            raise serializers.ValidationError("Only superusers can create other superusers.")
        return value

    def validate_is_verified(self, value):
        if value and not self.context['request'].user.is_staff:
            raise serializers.ValidationError("Only staff can verify users.")
        return value
