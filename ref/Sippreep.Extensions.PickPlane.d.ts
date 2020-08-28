declare namespace Sippreep {
    namespace Extensions {
        namespace PickPlane {


            /**
             * 拾取面插件
             */
            export interface PickPlaneExtension {
                /**
                 * 设置平面样式。
                 * @param {PickPlaneMode} mode - 指定平面样式。默认 x-
                 * @returns {boolean} - 如果激活成功，则为true。
                 */
                enableMode(mode: PickPlaneMode): boolean;

                /**
                 * 注册一个拾取平面的回调,回调参数是拾取的面列表
                 * @param callback 
                 */
                registerPlaneCallback(callback?: (plane: THREE.Plane) => void): void;
                /**
                 * 配置面信息:正反面颜色,正反面透明度等
                 * @param config 
                 * @returns 更新后的配置信息
                 */
                configPlane(config?: PlaneConfig): PlaneConfig;
            }
            /**拾取面模式 */
            export enum PickPlaneMode {
                /**沿X轴正方向*/
                PositiveDirectionOfX = 0,
                /**沿X轴负方向*/
                NegativeDirectionOfX,
                /**沿Y轴正方向*/
                PositiveDirectionOfY,
                /**沿Y轴负方向*/
                NegativeDirectionOfY,
                /**沿Z轴正方向*/
                PositiveDirectionOfZ,
                /**沿Z轴负方向*/
                NegativeDirectionOfZ,
                /**沿屏幕X轴正方向*/
                PositiveDirectionOfScreenX,
                /**
                 * 沿屏幕X轴负方向
                 */
                NegativeDirectionOfScreenX,
                /**
                 * 沿屏幕Y轴正方向
                 */
                PositiveDirectionOfScreenY,
                /**
                 * 沿屏幕Y轴负方向
                 */
                NegativeDirectionOfScreenY,
                /**
                 * 碰撞面
                 */
                HitFace,
                /**
                 * 碰撞面反面
                 */
                NegativeDirectionOfHitFace,
            }
            export type PlaneConfig = {
                frontColor?: THREE.Color, backColor?: THREE.Color, borderColor?: THREE.Color,
                frontOpacity?: number, backOpacity?: number,
                planeSize?: number,
                //[k: string]: any
            }
        }
    }
}


