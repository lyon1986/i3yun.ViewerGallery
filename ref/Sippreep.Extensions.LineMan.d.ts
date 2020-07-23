declare namespace Sippreep {
    namespace Extensions {
        namespace LineMan {
            /**
             * 三维模型线管理插件
             */
            export interface LineManExtension {
                /**
                 * 绘制模型线
                 * @param point3Ds 三维坐标点集合
                 * @param color 线颜色
                 * @param lineWidth 线宽度
                 * @returns 返回绘制的模型线ID
                 */
                draw3DLine(point3Ds: Vector3[], color: Color, lineWidth: Number): string;
                /**
                 * 清除指定的模型线
                 * @param lineID 模型线ID
                 */
                clear3DLine(lineID: string): void;
                /**
                 * 清除所有的模型线
                 */
                clearAll3DLine(): void;
            }
            /**
             * 三维向量
             */
            export interface Vector3 {
                /**
                 * 向量的x值
                 */
                x: number;
                /**
                 * 向量的y值
                 */
                y: number;
                /**
                 * 向量的z值
                 */
                z: number;
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