export enum SortOperation {
    ASC = 'asc',
    DESC = 'desc'
}

export enum FilterOperation {
    EQUAL = 'eq',
    NOT_EQUAL = 'neq',
    GREATER_THAN = 'gt',
    GREATER_THAN_OR_EQUAL_TO = 'gte',
    LESS_THAN = 'lt',
    LESS_THAN_OR_EQUAL_TO = 'lte',
    IN = 'in',
    NOT_IN = 'nin',
    CONTAINS = 'like',
    IS_NULL = 'is_null',
    IS_NOT_NULL = 'is_not_null',
}

export class Filter {
    fieldName = '';
    operation: FilterOperation = FilterOperation.EQUAL;
    value: string | number = 0;
    constructor(fieldName?: string, operation?: FilterOperation, value?: any) {
            this.fieldName = fieldName || '';
            this.operation = operation || FilterOperation.EQUAL;
            this.value = value;
    }
}

export class Sort {
    fieldName = '';
    operation: SortOperation = SortOperation.ASC;
    constructor(fieldName?: string, operation?: SortOperation) {
            this.fieldName = fieldName || '';
            this.operation = operation || SortOperation.ASC;
    }
}

export class PagingRequest {
    start = 0;
    size = 10;
    filters: Filter[];
    sort: Sort | null;
    constructor(start?: number, size?: number, filters?: Filter[], sort?: Sort | null) {
        this.start = start && start >= 0 ? start : 0;
        this.size = size && size > 0 ? size : 10;
        this.filters = filters?.length ? filters : [];
        this.sort = sort?.fieldName && sort?.operation ? sort : null;
    }
}

export type PagingResponse = {
    size: number;
    count: number;
    total: number;
    data: any[];
}
