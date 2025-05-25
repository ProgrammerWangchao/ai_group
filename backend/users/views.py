# 
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from .models import User
from .serializers import UserAdminSerializer

from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.views import View
from django.http import HttpResponse


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserAdminSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        queryset = super().get_queryset()
        if not self.request.user.is_superuser:
            queryset = queryset.filter(is_superuser=False)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        user = self.get_object()
        user.is_verified = True
        user.save()
        return Response({'status': 'user verified'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def unverify(self, request, pk=None):
        user = self.get_object()
        user.is_verified = False
        user.save()
        return Response({'status': 'user unverified'}, status=status.HTTP_200_OK)

class RegisterView(APIView):
    
    def get(self, request, *args, **kwargs):
        return Response("This is a GET response.", status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        return Response("This is a POST response.", status=status.HTTP_200_OK)