import { ActivityStatus } from "../common/enum/activity.enum";
import { ITypedAction } from "../model";

export interface IRootAction {
  loadingActivity?(activity: ActivityStatus, type: string): ITypedAction<ActivityStatus>
}
export class RootAction implements IRootAction {
  loadingActivity(activity: ActivityStatus, type: string): ITypedAction<ActivityStatus> {
    return { type, payload: activity }
  }
}
