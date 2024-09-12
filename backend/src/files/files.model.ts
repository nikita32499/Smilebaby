import { TFile } from 'shared-smilebaby/dist/types/file.types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileModel implements TFile {
    @PrimaryGeneratedColumn('uuid')
    declare id: string;

    @Column()
    declare filename: string;

    @Column()
    declare mimetype: string;

    @Column({ type: 'bytea' })
    declare data: Buffer;
}
