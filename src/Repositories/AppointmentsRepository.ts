import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findRepeatedAppointment = await this.findOne({ where: { date } });

    return findRepeatedAppointment || null;
  }
}

export default AppointmentsRepository;
