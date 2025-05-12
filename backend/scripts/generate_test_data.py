
import os
import django
import random
from django.core.management import call_command
from tools.models import Tool, Category, Tag
from faker import Faker

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

fake = Faker()

def create_categories():
    categories = [
        "Text Generation",
        "Image Generation",
        "Code Assistance",
        "Video Editing",
        "Audio Processing"
    ]
    
    for name in categories:
        Category.objects.get_or_create(
            name=name,
            defaults={'icon': name.lower().replace(' ', '-')}
        )
    print(f"Created {len(categories)} categories")

def create_tags():
    tags = [
        "Free",
        "Paid",
        "Open Source",
        "Cloud",
        "Local",
        "API",
        "Web App",
        "Mobile"
    ]
    
    for name in tags:
        Tag.objects.get_or_create(name=name)
    print(f"Created {len(tags)} tags")

def create_tools(count=20):
    categories = list(Category.objects.all())
    tags = list(Tag.objects.all())
    
    for _ in range(count):
        tool = Tool.objects.create(
            name=fake.company() + " AI",
            description=fake.paragraph(nb_sentences=3),
            url=fake.url(),
            category=random.choice(categories),
            is_featured=random.choice([True, False]),
            is_approved=True
        )
        
        # 添加随机标签
        tool_tags = random.sample(tags, random.randint(1, 3))
        tool.tags.set(tool_tags)
    
    print(f"Created {count} tools")

def reset_database():
    call_command('flush', '--noinput')
    call_command('migrate')
    print("Database reset and migrations applied")

if __name__ == '__main__':
    reset_database()
    create_categories()
    create_tags()
    create_tools()
    print("Test data generation completed")
