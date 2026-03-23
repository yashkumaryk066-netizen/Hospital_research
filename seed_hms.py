import os
import django
import sys
from datetime import date, timedelta

# Setup Django
sys.path.append('/home/tele/hospital')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hospital.settings')
django.setup()

from management.models import Patient, Doctor, Appointment, Vitals, Service, Ward, Bed, Medication

def seed():
    print("Seeding HMS Data...")
    
    # 1. Doctors
    d1, _ = Doctor.objects.get_or_create(name="Dr. Sarah Connor", specialty="Neuro Surgeon", license_number="LIC-1001", contact_number="9876543210")
    d2, _ = Doctor.objects.get_or_create(name="Dr. James Smith", specialty="Cardiologist", license_number="LIC-1002", contact_number="9876543211")
    d3, _ = Doctor.objects.get_or_create(name="Dr. Elena Gilbert", specialty="Emergency Physician", license_number="LIC-1003", contact_number="9876543212")

    # 2. Patients
    p1, _ = Patient.objects.get_or_create(full_name="John Doe", dob="1985-05-15", gender="M", mobile_number="1112223334", chief_complaint="Chest Pain")
    p2, _ = Patient.objects.get_or_create(full_name="Alice Vance", dob="1992-10-22", gender="F", mobile_number="1112223335", chief_complaint="Fractured Leg")
    p3, _ = Patient.objects.get_or_create(full_name="Robert Langdon", dob="1964-03-31", gender="M", mobile_number="1112223336", chief_complaint="Fever and Chills")

    # 3. Wards and Beds
    w1, _ = Ward.objects.get_or_create(name="Emergency Ward", department="ER", total_beds=10)
    w2, _ = Ward.objects.get_or_create(name="ICU", department="Critical Care", total_beds=5)
    
    for i in range(1, 6):
        Bed.objects.get_or_create(ward=w1, bed_number=f"ER-{i:02d}")
    
    # 4. Appointments
    Appointment.objects.get_or_create(patient=p1, doctor=d2, appointment_date=date.today(), time_slot="10:00 AM", reason="Checkup", token_number=1)
    Appointment.objects.get_or_create(patient=p3, doctor=d3, appointment_date=date.today(), time_slot="11:30 AM", reason="Fever", token_number=2)

    # 5. Medications
    Medication.objects.get_or_create(name="Paracetamol", brand_name="Crocin", batch_number="BAT-101", expiry_date="2027-01-01", stock_quantity=500, unit_price=10.00)
    Medication.objects.get_or_create(name="Amoxicillin", brand_name="Amox", batch_number="BAT-202", expiry_date="2026-06-01", stock_quantity=100, unit_price=45.00)

    print("Seeding Complete!")

if __name__ == "__main__":
    seed()
