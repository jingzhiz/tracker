import { DefaultOptions, TrackerOptions, TrackerConfig } from '../types/index'
import { createHistoryEvent } from '../utils/pv'

class Tracker {
  private _mouseEventList: string[] = ['click', 'dblclick', 'contextmenu', 'mousedown', 'mouseup', 'mouseenter', 'mouseout', 'mouseover']

  public data: TrackerOptions

  constructor(options: TrackerOptions) {
    this.data = {
      ...this.initDef(),
      ...options
    }
    this.install()
  }

  private initDef(): DefaultOptions {
    window.history['pushState'] = createHistoryEvent('pushState')
    window.history['replaceState'] = createHistoryEvent('replaceState')

    return <DefaultOptions>{
      sdkVersion: TrackerConfig.version,
      historyTracker: false,
      hashTracker: false,
      domTracker: false,
      jsError: false
    }
  }

  private install() {
    if (this.data.historyTracker) {
      this.routeChangeTracker(['pushState','replaceState', 'popstate'], 'history-pv')
    }
    if (this.data.hashTracker) {
      this.routeChangeTracker(['hashChange'], 'hash-pv')
    }
    if (this.data.domTracker) {
      this.domOpTracker()
    }
    if (this.data.jsError) {
      this.jsErrorTracker()
    }
  }

  private routeChangeTracker<T>(eventList: string[], targetKey: string, data?: T) {
    eventList.forEach(event => {
      window.addEventListener(event, () => {
        this.report({
          event,
          targetKey,
          data
        })
      })
    })
  }

  private domOpTracker() {
    this._mouseEventList.forEach(event => {
      window.addEventListener(event, (e) => {
        const target = e.target as HTMLElement
        const targetKey = target.getAttribute('tracker')
        if (targetKey) {
          this.report({
            event,
            targetKey
          })
        }
      })
    })
  }

  private jsErrorTracker() {
    window.addEventListener('error', (event) => {
      this.sendReport({
        event,
        targetKey: 'message',
        data: event.message
      })
    })
    window.addEventListener('unhandledrejection', (event) => {
      event.promise.catch(error => {
        this.sendReport({
          event: 'promise',
          targetKey:'message',
          data: error
        })
      })
    })
  }

  private report<T>(data: T) {
    const params = Object.assign(this.data, data, {time: new Date().getTime()})
    const blob = new Blob([JSON.stringify(params)], {type: 'application/x-www-form-urlencoded'})
    navigator.sendBeacon(this.data.requestURL, blob)
  }

  public sendReport<T>(data: T) {
    this.report(data)
  }

  public setUserId <T extends DefaultOptions['uuid']>(uuid: T) {
    this.data.uuid = uuid
  }

  public setExtra <T extends DefaultOptions['extra']>(extra: T) {
    this.data.extra = extra
  }
}

export default Tracker