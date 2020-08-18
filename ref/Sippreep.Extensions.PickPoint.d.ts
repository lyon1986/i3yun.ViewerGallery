/// <reference types="THREE" />
declare namespace Sippreep {
    namespace Extensions {
        namespace PickPoint {
            /**
             * 拾取三维点插件
             */
            export interface PickPointExtension {
                /**
                 * 启用拾取点
                 */
                enableMode(): void;
                /**
                 * 注册拾取点回调函数(如果重复则返回false,否则返回true)
                 * @param callback 回调函数
                 */
                registerPointCallback(callback: (point: THREE.Vector3) => void): boolean;
                /**
                 * 解除拾取点回调函数(如果解除存在则返回true,否则返回false)
                 * @param callback 回调函数
                 */
                unregisterPointCallback(callback: (point: THREE.Vector3) => void): boolean;
            }
        }
    }
}