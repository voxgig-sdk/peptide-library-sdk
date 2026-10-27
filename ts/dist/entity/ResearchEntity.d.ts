import { PeptideLibraryEntityBase } from '../PeptideLibraryEntityBase';
import type { PeptideLibrarySDK } from '../PeptideLibrarySDK';
import type { Control } from '../types';
import type { Research, ResearchLoadMatch, ResearchListMatch } from '../PeptideLibraryTypes';
declare class ResearchEntity extends PeptideLibraryEntityBase<Research> {
    constructor(client: PeptideLibrarySDK, entopts: any);
    make(this: ResearchEntity): ResearchEntity;
    load(this: any, reqmatch?: ResearchLoadMatch, ctrl?: Control): Promise<ResearchEntity>;
    list(this: any, reqmatch?: ResearchListMatch, ctrl?: Control): Promise<ResearchEntity[]>;
}
export { ResearchEntity };
