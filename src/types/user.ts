export interface User {
  uid: string; // ID generato da Firebase Authentication
  email: string; // Email dell'utente
  role: 'company' | 'waiter'; // Ruolo dell'utente
  profileId: string; // Riferimento al documento in companies o waiters
  createdAt: Date; // Data di creazione del profilo
  updatedAt?: Date; // Data dell'ultimo aggiornamento
}

export interface Company {
  id: string; // ID del documento (opzionale, se necessario)
  uid: string; // ID dell'utente a cui appartiene questa azienda
  name?: string; // Nome dell'azienda
  email: string | null;
  vatNumber?: string; // Numero di partita IVA
  createdAt: Date; // Data di creazione
  updatedAt?: Date; // Data dell'ultimo aggiornamento
}

export interface Waiter {
  id: string; // ID del documento (opzionale, se necessario)
  uid?: string; // ID dell'utente a cui appartiene questo profilo
  email: string;
  fullName?: string; // Nome completo
  experience?: string; // Esperienza lavorativa (es. "3 anni")
  availability?: 'full-time' | 'part-time' | 'occasional'; // Disponibilità lavorativa
  skills?: string[]; // Array di competenze (opzionale)
  appliedJobs?: string[]; // Array di riferimenti agli annunci di lavoro candidati
  createdAt: Date; // Data di creazione
  updatedAt?: Date; // Data dell'ultimo aggiornamento
}
