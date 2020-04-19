import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const repeatedAppointment = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (repeatedAppointment) {
      throw Error('Appointment already booked');
    }

    const appointment = this.appointmentsRepository.createAppointment({
      date: appointmentDate,
      provider,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
