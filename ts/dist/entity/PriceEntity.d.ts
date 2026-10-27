import { PeptideLibraryEntityBase } from '../PeptideLibraryEntityBase';
import type { PeptideLibrarySDK } from '../PeptideLibrarySDK';
import type { Control } from '../types';
import type { Price, PriceLoadMatch, PriceListMatch } from '../PeptideLibraryTypes';
declare class PriceEntity extends PeptideLibraryEntityBase<Price> {
    constructor(client: PeptideLibrarySDK, entopts: any);
    make(this: PriceEntity): PriceEntity;
    load(this: any, reqmatch?: PriceLoadMatch, ctrl?: Control): Promise<PriceEntity>;
    list(this: any, reqmatch?: PriceListMatch, ctrl?: Control): Promise<PriceEntity[]>;
}
export { PriceEntity };
