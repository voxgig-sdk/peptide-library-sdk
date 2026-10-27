import { PeptideLibraryEntityBase } from '../PeptideLibraryEntityBase';
import type { PeptideLibrarySDK } from '../PeptideLibrarySDK';
import type { Control } from '../types';
import type { Meta, MetaLoadMatch } from '../PeptideLibraryTypes';
declare class MetaEntity extends PeptideLibraryEntityBase<Meta> {
    constructor(client: PeptideLibrarySDK, entopts: any);
    make(this: MetaEntity): MetaEntity;
    load(this: any, reqmatch?: MetaLoadMatch, ctrl?: Control): Promise<MetaEntity>;
}
export { MetaEntity };
