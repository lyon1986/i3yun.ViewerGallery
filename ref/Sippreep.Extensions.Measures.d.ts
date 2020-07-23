/// <reference types="THREE" />
declare namespace Sippreep {
    namespace Extensions {
        namespace Measures {
            /**
             * 测量插件
             */
            export interface MeasureExtension {
                /**
                 * 启用或关闭测量工具
                 * @param enable 如果为true则启用测量工具，反之则关闭。
                 * @param measurementType 指定测量类型
                 */
                enableMeasureTool(enable: boolean, measurementType?: MeasurementType): boolean
                /**
                 * 删除当前选中的测量对象
                 */
                deleteCurrentMeasurement(): void
            }
            /**
             * 测量类型
             */
            export enum MeasurementType {
                /**
                 * 距离测量
                 */
                DISTANCE = 1,
                /**
                 * 角度测量
                 */
                ANGLE = 2,
            }
        }
    }
}