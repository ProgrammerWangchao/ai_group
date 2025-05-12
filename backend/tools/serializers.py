
from rest_framework import serializers
from .models import Tool, Category, Tag
from django.contrib.auth import get_user_model

User = get_user_model()

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon']

class ToolSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    submitted_by = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Tool
        fields = [
            'id', 'name', 'description', 'url', 'logo', 
            'category', 'tags', 'is_featured', 'is_approved',
            'submitted_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['is_approved', 'created_at', 'updated_at']

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        tool = Tool.objects.create(**validated_data)
        tool.tags.set(tags_data)
        return tool

class ToolSubmitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = [
            'name', 'description', 'url', 'logo', 
            'category', 'tags', 'is_featured'
        ]
