// Base User type
export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

// Patient type
export type Patient = User & {
  dateOfBirth: Date;
  phoneNumber: string;
  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
  medicalHistory?: string;
  allergies?: string[];
  bloodType?: string;
};

// Doctor type
export type Doctor = User & {
  licenseNumber: string;
  specialty: string;
  hospital?: string;
  phoneNumber: string;
  isAvailable: boolean;
  consultationFee?: number;
};

// Clinical Case type
export type ClinicalCase = {
  id: string;
  patientId: string;
  title: string;
  description: string;
  symptoms: string[];
  diagnosis?: string;
  treatment?: string;
  status: 'active' | 'resolved' | 'pending';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  updatedAt: Date;
  assignedDoctors: string[]; // Array of doctor IDs
};

// Consultation type (Interconsulta)
export type Consultation = {
  id: string;
  clinicalCaseId: string;
  requestingDoctorId: string;
  requestedDoctorId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  response?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
};

// Message type for chat
export type Message = {
  id: string;
  consultationId: string;
  senderId: string;
  senderType: 'doctor' | 'patient';
  content: string;
  createdAt: Date;
  isRead: boolean;
};

// Registration DTOs
export type RegisterPatientDto = {
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  phoneNumber: string;
  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
};

export type RegisterDoctorDto = {
  name: string;
  email: string;
  password: string;
  licenseNumber: string;
  specialty: string;
  hospital?: string;
  phoneNumber: string;
  consultationFee?: number;
};

// Login DTO
export type LoginDto = {
  email: string;
  password: string;
};

// Auth Response
export type AuthResponse = {
  user: User | Patient | Doctor;
  token: string;
};