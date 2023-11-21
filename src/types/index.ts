export interface DefaultOptions {
  uuid: string | undefined,
  requestURL: string,
  historyTracker: boolean,
  hashTracker: boolean,
  domTracker: boolean,
  jsError: boolean,
  extra: Record<string, any> | undefined,
  sdkVersion: string | number
}

export interface TrackerOptions extends Partial<DefaultOptions> {
  requestURL: string
}

export enum TrackerConfig {
  version = '1.0.0'
}