import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  type: string; // 'new_message', 'new_referral', 'case_assigned', etc.

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  body?: string;

  @Column({ type: 'json', nullable: true })
  data?: Record<string, any>;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;
} 