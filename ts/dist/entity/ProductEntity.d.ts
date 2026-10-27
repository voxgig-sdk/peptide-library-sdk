import { PeptideLibraryEntityBase } from '../PeptideLibraryEntityBase';
import type { PeptideLibrarySDK } from '../PeptideLibrarySDK';
import type { Control } from '../types';
import type { Product, ProductLoadMatch, ProductListMatch } from '../PeptideLibraryTypes';
declare class ProductEntity extends PeptideLibraryEntityBase<Product> {
    constructor(client: PeptideLibrarySDK, entopts: any);
    make(this: ProductEntity): ProductEntity;
    load(this: any, reqmatch?: ProductLoadMatch, ctrl?: Control): Promise<ProductEntity>;
    list(this: any, reqmatch?: ProductListMatch, ctrl?: Control): Promise<ProductEntity[]>;
}
export { ProductEntity };
