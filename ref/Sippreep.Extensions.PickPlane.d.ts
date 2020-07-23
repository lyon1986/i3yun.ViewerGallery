declare namespace Sippreep {
    namespace Extensions {
        namespace PickPlane {
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
                registerPlaneCallback(callback: (plane: THREE.Plane) => void): void;
            }
            
            export enum PickPlaneMode {
                /**沿X轴正方向*/
                PositiveDirectionOfX,
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
            }
        }
    }
}


