declare namespace Sippreep {
    namespace Extensions {
        namespace EEPTools {
            /**
             * 三维视图操作命令插件
             */
            export interface EEPToolExtension {
                /**
                 * 设置三维视图操作工具命令
                 * @param CommandID 操作工具命令
                 */
                set3DCommand(CommandID: EEPToolCommand): void;
                /**
                 * 订阅三维点拾取命令数据触发事件
                 * @param callback 三维点拾取命令数据回调
                 */
                addPicked(callback: (worldPoint: { x: number; y: number; z: number; }) => void): void;
                /**
                 * 取消订阅三维点拾取命令数据触发事件
                 * @param callback 三维点拾取命令数据回调
                 */
                removePicked(callback: (worldPoint: { x: number; y: number; z: number; }) => void): void;
            }
            /**
             * 三维视图操作工具命令
             */
            export enum EEPToolCommand {
                /**
                 * 选择
                 */
                SELECT = 0,
                /**
                 * 平移
                 */
                PAN,
                /**
                 * 缩放
                 */
                ZOOM,
                /**
                 * 旋转
                 */
                ROTATE,
                /**
                 * 漫游
                 */
                ROAM,
                /**
                 * 三维点拾取
                 */
                POINT3DPICK,
                /**
                 * 环视
                 */
                LOOKAROUND,
                /**
                 * 盒式选择器
                 */
                EEPBoxSelect,
                /**
                 * 框选
                 */
                RectSelect,
            }
        }
    }
}


