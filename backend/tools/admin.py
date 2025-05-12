
from django.contrib import admin
from .models import Tool, Category, Tag

class ToolAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'is_featured', 'is_approved', 'submitted_by', 'created_at')
    list_filter = ('is_featured', 'is_approved', 'category', 'tags')
    search_fields = ('name', 'description')
    list_editable = ('is_featured', 'is_approved')
    filter_horizontal = ('tags',)
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'description', 'url', 'logo')
        }),
        ('Classification', {
            'fields': ('category', 'tags')
        }),
        ('Status', {
            'fields': ('is_featured', 'is_approved')
        }),
        ('Metadata', {
            'fields': ('submitted_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

admin.site.register(Tool, ToolAdmin)
admin.site.register(Category)
admin.site.register(Tag)
