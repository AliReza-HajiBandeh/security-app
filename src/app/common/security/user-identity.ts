import {UserIdentity} from "@rbcorp/ui-infra";
import {SubsystemDto} from "../main.dto";

export class AppUserIdentity extends UserIdentity {
  subsystems?: SubsystemDto[];
  constructor(
    public readonly id?: number,
    public readonly userName?: string,
    public readonly nationalCode?: string,
    public readonly nationalId?: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly title?: string,
    public readonly forcePasswordChange?: boolean,
    readonly real?: boolean, // 'Real' or 'Legal' person
    readonly activeSubsystemId?: number,
    readonly activeSubsystemName?: string,
    readonly vip?: boolean,
    subsystems?: SubsystemDto[],
    claims?: string[],
  ) {
    super(claims);
    this.subsystems = subsystems && subsystems?.length ? subsystems : [];
  }
}
