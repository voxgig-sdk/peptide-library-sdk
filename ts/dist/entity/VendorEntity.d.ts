import { PeptideLibraryEntityBase } from '../PeptideLibraryEntityBase';
import type { PeptideLibrarySDK } from '../PeptideLibrarySDK';
import type { Control } from '../types';
import type { Vendor, VendorLoadMatch, VendorListMatch } from '../PeptideLibraryTypes';
declare class VendorEntity extends PeptideLibraryEntityBase<Vendor> {
    constructor(client: PeptideLibrarySDK, entopts: any);
    make(this: VendorEntity): VendorEntity;
    load(this: any, reqmatch?: VendorLoadMatch, ctrl?: Control): Promise<VendorEntity>;
    list(this: any, reqmatch?: VendorListMatch, ctrl?: Control): Promise<VendorEntity[]>;
}
export { VendorEntity };
