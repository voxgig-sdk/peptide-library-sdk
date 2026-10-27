import { PeptideLibraryEntityBase } from '../PeptideLibraryEntityBase';
import type { PeptideLibrarySDK } from '../PeptideLibrarySDK';
import type { Control } from '../types';
import type { GetApiIndex, GetApiIndexLoadMatch } from '../PeptideLibraryTypes';
declare class GetApiIndexEntity extends PeptideLibraryEntityBase<GetApiIndex> {
    constructor(client: PeptideLibrarySDK, entopts: any);
    make(this: GetApiIndexEntity): GetApiIndexEntity;
    load(this: any, reqmatch?: GetApiIndexLoadMatch, ctrl?: Control): Promise<GetApiIndexEntity>;
}
export { GetApiIndexEntity };
