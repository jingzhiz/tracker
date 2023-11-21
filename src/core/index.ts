import { DefaultOptions, TrackerOptions, TrackerConfig } from '../types/index'

class Tracker {
  public data: TrackerOptions

  constructor(options: TrackerOptions) {
    this.data = {
      ...this.initDef(),
      ...options
    }
  }

  private initDef(): DefaultOptions {
    return <DefaultOptions>{
      sdkVersion: TrackerConfig.version,
      historyTracker: false,
      hashTracker: false,
      domTracker: false,
      jsError: false
    }
  }
}

export default Tracker