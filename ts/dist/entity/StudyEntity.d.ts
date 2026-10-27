import { PeptideLibraryEntityBase } from '../PeptideLibraryEntityBase';
import type { PeptideLibrarySDK } from '../PeptideLibrarySDK';
import type { Control } from '../types';
import type { Study, StudyLoadMatch, StudyListMatch } from '../PeptideLibraryTypes';
declare class StudyEntity extends PeptideLibraryEntityBase<Study> {
    constructor(client: PeptideLibrarySDK, entopts: any);
    make(this: StudyEntity): StudyEntity;
    load(this: any, reqmatch?: StudyLoadMatch, ctrl?: Control): Promise<StudyEntity>;
    list(this: any, reqmatch?: StudyListMatch, ctrl?: Control): Promise<StudyEntity[]>;
}
export { StudyEntity };
