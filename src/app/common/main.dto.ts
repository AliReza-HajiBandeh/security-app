export class BaseDto {
    id: number | null;
    version: number;
    constructor(options?: {id?: number | null, version?: number}) {
        this.id = options?.id || null;
        this.version = options?.version || 0;
    }
}

export class SubsystemDto extends BaseDto {
    name: string | null;
    title: string | null;
    constructor(options?: SubsystemDto) {
        super(options);
        this.name = options?.name || null;
        this.title = options?.title || null;
    }
}

export class CommonDto extends BaseDto {
    name?: string | null;
    title?: string | null;
    enabled: boolean;
    description?: string;
    constructor(options?: CommonDto) {
        super({id: options?.id, version: options?.version});
        this.enabled = options && 'enabled' in options ? options?.enabled : true;
        this.title = options?.title || null;
        if (options && options?.name) {
            this.name = options?.name;
        }
        if (options && options?.description) {
            this.description = options?.description;
        }
    }
}

export class GroupDto extends CommonDto {
    subsystem: SubsystemDto | null;
    roles: RoleDto[] | null;
    constructor(options?: GroupDto) {
        super(options);
        this.subsystem = options?.subsystem && options.subsystem?.id ? {id: options.subsystem?.id} as SubsystemDto : null;
        if (options?.roles && options.roles?.[0] && options.roles[0]?.id) {
            this.roles = [];
            for (let i = 0; i < options?.roles.length; ++i) {
                this.roles.push({id: options?.roles[i].id, version: options?.roles[i].version} as RoleDto)
            }
        } else {
            this.roles = null;
        }
    }
}


export class RoleDto extends CommonDto {
    subsystem: SubsystemDto | null;
    permissions: PermissionDto[] | null;
    constructor(options?: RoleDto) {
        super(options);
        this.subsystem = options?.subsystem && options.subsystem?.id ? {id: options.subsystem?.id} as SubsystemDto : null;
        if (options?.permissions && options.permissions?.[0] && options.permissions[0]?.id) {
            this.permissions = [];
            for (let i = 0; i < options?.permissions.length; ++i) {
                this.permissions.push({id: options?.permissions[i].id, version: options?.permissions[i].version} as PermissionDto)
            }
        } else {
            this.permissions = null;
        }
    }
}

export class PermissionDto extends CommonDto {
    subsystem: SubsystemDto | null;
    actions: ActionDto[] | null;
    constructor(options?: PermissionDto) {
        super(options);
        this.subsystem = options?.subsystem && options.subsystem?.id ? {id: options.subsystem?.id} as SubsystemDto : null;
        if (options?.actions && options.actions?.[0] && options.actions[0]?.id) {
            this.actions = [];
            for (let i = 0; i < options?.actions.length; ++i) {
                this.actions.push({id: options?.actions[i].id, version: options?.actions[i].version} as ActionDto)
            }
        } else {
            this.actions = null;
        }
    }
}

export class ActionDto extends CommonDto {
    subsystem: SubsystemDto | null;
    url : string | null;
    constructor(options?: ActionDto) {
        super(options);
        this.subsystem = options?.subsystem && options.subsystem?.id ? {id: options.subsystem?.id} as SubsystemDto : null;
        this.url = options?.url || null;
    }
}

export class UserDto extends CommonDto {
    userName: string | null;
    firstName?: string | null;
    lastName?: string | null;
    real: boolean;
    mobileNumber: string | null;
    email: string;
    enabled: boolean;
    nationalCode: string | null;
    nationalId: string | null;
    subsystems?: SubsystemDto[] | null;
    groups?: GroupDto[] | null;
    constructor(options?: any) {
        super(options);
        this.userName = options?.userName || null;
        this.firstName = options?.firstName || null;
        this.lastName = options?.lastName || null;
        this.email = options?.email || null;
        this.mobileNumber = options?.mobileNumber || null;
        this.nationalId = options?.nationalId || null;
        this.nationalCode = options?.nationalCode || null;
        this.real = options && 'real' in options ? options?.real : true;
        this.enabled = options && 'enabled' in options ? options?.enabled : true;
        if (options?.subsystems && options.subsystems?.[0] && options.subsystems[0]?.id) {
            this.subsystems = [];
            for (let i = 0; i < options?.subsystems.length; ++i) {
                this.subsystems.push({id: options?.subsystems[i].id, version: options?.subsystems[i].version} as SubsystemDto)
            }
        } else {
            this.subsystems = null;
        }
        if (options?.groups && options.groups?.[0] && options.groups[0]?.id) {
            this.groups = [];
            for (let i = 0; i < options?.groups.length; ++i) {
                this.groups.push({id: options?.groups[i].id, version: options?.groups[i].version} as GroupDto)
            }
        } else {
            this.groups = null;
        }
    }
}
