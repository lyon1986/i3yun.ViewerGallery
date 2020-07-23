declare namespace Sippreep {
    namespace Extensions {
        namespace PerformanceMonitor {
            /**
 * 一个性能显示窗口
 */
            export interface PerformanceMonitorExtension {
                /**
                 * 性能窗口是否显示
                 * @param show true:显示； false:不显示
                 */
                show(show?: boolean): void;
                /**
                 * 当前性能窗口是否显示
                 */
                visible(): boolean;
            }
        }
    }
}


