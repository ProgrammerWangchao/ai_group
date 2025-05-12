
import os
import django
import json
from django.core import serializers
from tools.models import Tool, Category, Tag

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def export_data(output_file='data_export.json'):
    """导出所有数据到JSON文件"""
    data = {
        'tools': serializers.serialize('json', Tool.objects.all()),
        'categories': serializers.serialize('json', Category.objects.all()),
        'tags': serializers.serialize('json', Tag.objects.all())
    }
    
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Data exported to {output_file}")

def import_data(input_file='data_export.json'):
    """从JSON文件导入数据"""
    with open(input_file) as f:
        data = json.load(f)
    
    # 清空现有数据
    Tool.objects.all().delete()
    Category.objects.all().delete()
    Tag.objects.all().delete()
    
    # 导入数据
    for obj in serializers.deserialize('json', data['categories']):
        obj.save()
    
    for obj in serializers.deserialize('json', data['tags']):
        obj.save()
    
    for obj in serializers.deserialize('json', data['tools']):
        obj.save()
    
    print(f"Data imported from {input_file}")

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Data import/export utility')
    parser.add_argument('--export', action='store_true', help='Export data to JSON')
    parser.add_argument('--import', action='store_true', help='Import data from JSON')
    parser.add_argument('--file', default='data_export.json', help='Input/output file path')
    
    args = parser.parse_args()
    
    if args.export:
        export_data(args.file)
    elif getattr(args, 'import'):
        import_data(args.file)
    else:
        print("Please specify --export or --import")
