declare namespace Sippreep {
    namespace Extensions {
        namespace FlickerMan {
            /**
            * 对象颜色闪烁管理插件
            */
            export interface FlickerManExtension {
                /**
                 * 设置指定对象的颜色闪烁
                 * @param dbIds 指定设置对象的dbid
                 * @param colors 指定设置对象的颜色集合,第一维对应各个dbid，第二位是每个dbid的闪烁颜色
                 * 如果颜色的第一维长度不足dbids的长度，将被循环使用
                 */
                setFlicker(dbIds: number[], colors?: Color[][]): void;
                /**
                 * 清除指定对象的颜色闪烁
                 * @param dbIds 指定设置对象的ID
                 */
                cancelFlicker(dbIds: number[]): void;
                /**
                 * 清除所有对象的颜色闪烁
                 */
                cancelAllFlicker(): void;
            }
            /**
             * 颜色对象（rgba值）
             */
            export interface Color {
                /**
                 * 红色通道值介于0和1之间。
                 */
                r: number;
                /**
                 * 绿色通道值介于0和1之间。
                 */
                g: number;
                /**
                 * 蓝色通道值介于0和1之间。
                 */
                b: number;
                /**
                 * 透明度值介于0和1之间。
                 */
                a: number;
            }
        }
    }
}