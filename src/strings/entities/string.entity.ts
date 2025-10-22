import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('strings')
export class StringEntity {
  @PrimaryColumn()
  id: string; // sha256

  @Column({ type: 'text', unique: true })
  value: string;

  @Column({ type: 'jsonb' })
  properties: any;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
