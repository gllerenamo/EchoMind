import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Consultation } from './consultation.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ 
    type: 'enum', 
    enum: ['doctor', 'patient']
  })
  senderType: 'doctor' | 'patient';

  @Column()
  senderId: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => Consultation, consultation => consultation.messages)
  consultation: Consultation;

  @Column()
  consultationId: string;
} 