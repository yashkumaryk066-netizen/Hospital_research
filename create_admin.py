import os
import django
import sys
from django.contrib.auth.models import User

# Setup Django
sys.path.append('/home/tele/hospital')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hospital.settings')
django.setup()

from management.models import Employee

def create_admin():
    print("Creating Admin User...")
    if not User.objects.filter(username="admin@healcare.com").exists():
        user = User.objects.create_superuser("admin@healcare.com", "admin@healcare.com", "admin123")
        user.first_name = "Chief"
        user.last_name = "Administrator"
        user.save()
        
        Employee.objects.get_or_create(
            user=user,
            emp_id="EMP-001",
            full_name="Chief Administrator",
            department="Management",
            designation="Super Admin",
            salary=150000
        )
        print("Admin Created: admin@healcare.com / admin123")
    else:
        print("Admin already exists.")

if __name__ == "__main__":
    create_admin()
