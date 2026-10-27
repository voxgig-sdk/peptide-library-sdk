import { PeptideLibraryEntityBase } from '../PeptideLibraryEntityBase';
import type { PeptideLibrarySDK } from '../PeptideLibrarySDK';
import type { Control } from '../types';
import type { ResearchStatistic, ResearchStatisticLoadMatch, ResearchStatisticListMatch } from '../PeptideLibraryTypes';
declare class ResearchStatisticEntity extends PeptideLibraryEntityBase<ResearchStatistic> {
    constructor(client: PeptideLibrarySDK, entopts: any);
    make(this: ResearchStatisticEntity): ResearchStatisticEntity;
    load(this: any, reqmatch?: ResearchStatisticLoadMatch, ctrl?: Control): Promise<ResearchStatisticEntity>;
    list(this: any, reqmatch?: ResearchStatisticListMatch, ctrl?: Control): Promise<ResearchStatisticEntity[]>;
}
export { ResearchStatisticEntity };
