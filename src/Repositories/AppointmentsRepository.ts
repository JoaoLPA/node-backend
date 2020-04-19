import { isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

interface AppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public index(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findRepeatedAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findRepeatedAppointment || null;
  }

  public createAppointment({ provider, date }: AppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
