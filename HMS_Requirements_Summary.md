# Hospital Management System (HMS) v2.2 - Requirement Summary

This document summarizes the requirements extracted from the HMS Patient Workflow PDF (v2.2) for implementation in the Hospital Research project.

## 1. Core Data Models (Master Tables)

### M01 Patient Master
- **UHID**: Auto-generated unique hospital ID.
- **Full Name**: First + Last (Middle optional). [REQ]
- **DOB**: Age auto-calculated. [REQ]
- **Gender**: Male/Female/Other/PNTS. [REQ]
- **Mobile Number**: Used for OTP, alerts. [REQ]
- **Aadhaar / Govt ID**: Encrypted at rest, display last 4 digits only.
- **Email Address**, **Emergency Contact**, **Blood Group**, **Known Allergies**.
- **Visit Type**: New / Follow-up / Emergency.
- **Chief Complaint**: Voice-to-text supported.
- **Payer Type**: Corporate / Insurance / Self-Pay.
- **Insurance/TPA Details**: Triggers pre-auth if applicable.
- **Consent Flags**: Privacy (HIPAA NPP), Digital Consent.

### M04 Doctor Master
- Name, Specialty, License Number, Contact Info.
- Schedule / Availability.

### M08–M10 Pharmacy & Drug Master
- Drug Formulary (WHO INN generic names).
- Interaction Matrix & Allergen Master.

## 2. Key Modules & Workflows

### Phase 1: Registration & Triage
- **ESI Triage Level**: 1 (Critical) to 5 (Non-urgent).
- **Vitals Capture**: BP, HR, SpO2, Temp, Glucose.
- **MLC Flag**: Medico-Legal Case tracking.

### Phase 2: Consultation & EMR
- **SOAP Format**: Subjective, Objective, Assessment, Plan.
- **ICD-10 Integration**: AI-suggested diagnosis codes based on complaints.
- **E-Prescription**: Mandatory interaction and allergy checks.
- **CPOE**: Computerized Physician Order Entry for Lab/Radiology.

### Phase 3: Diagnostics (LIS & RIS/PACS)
- **Lab Orders**: Priority (STAT/Urgent/Routine), Barcode tracking.
- **Radiology**: Clinical Indication mandatory, AI finding highlights.

### Phase 4: Inpatient Department (IPD)
- **Bed Management**: Real-time map with status (Available, Occupied, Clean-pending).
- **Nursing Station**: Digital MAR (Medication Administration Record), I/O Balance.
- **ICU Monitoring**: Hourly vitals, severity scores (APACHE II/SOFA).
- **Surgery/OT**: WHO Surgical Safety Checklist, Implant tracking.

### Phase 5: Pharmacy
- FIFO/Expiry-based inventory.
- Dispensing verification.

### Phase 6: Billing & RCM
- Automated charge capture from clinical events.
- Insurance Pre-auth & Claim submission.

### Phase 7: Discharge Management
- **Mandatory Sequence**: Nursing Clearance → Resident Doctor Approval → Pharmacy Return Check → Final Billing → Gate Pass Exit.

## 3. Compliance & Security
- **HIPAA**: PHI encryption, RBAC (18 roles), Audit trails.
- **Interoperability**: HL7 FHIR R4 standard readiness.
