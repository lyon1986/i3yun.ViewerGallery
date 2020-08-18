declare namespace Sippreep {
    namespace Extensions {
        namespace ModelMan {
            /**
             * 模型外观控制插件
             */
            export interface ModelManExtension {
                /**
                 * 获取外观控制器
                 */
                GetManager(): Promise<ModelManager>
            }
            /**
             * 模型外观控制
             */
            export interface ModelManager {
                /**
                 * 获取所有对象的ID
                 */
                getDbids(): number[];
                /**
                 * 获取指定对象的外观
                 * @param dbid 指定对象ID
                 */
                getAppearance(dbid: number): NodeAppearance;
                /**
                 * 批量设置可见性
                 * @param value 是否可见
                 * @param dbids 指定对象集合
                 * @param exlude 是否排除指定集合对象
                 */
                setVisibles(value: boolean, dbids?: number[], exlude?: boolean): void;
                /**
                 * 批量设置着色
                 * @param value 着色值
                 * @param dbids 指定对象集合
                 * @param exlude 是否排除指定集合对象
                 */
                setColors(value: THREE.Color | null, dbids?: number[], exlude?: boolean): void;
                /**
                 * 批量设置透明度
                 * @param value 透明度值
                 * @param dbids 指定对象集合
                 * @param exlude 是否排除指定集合对象
                 */
                setTransparents(value: number, dbids?: number[], exlude?: boolean): void;
            }
            /**
             * 模型外观
             */
            export interface NodeAppearance {
                readonly dbid: number;
                /**
                 * 可见性
                 */
                visible: boolean;
                /**
                 * 透明度(0-1)
                 * 小于或等于0为不透明，值越大越透明
                 */
                transparent: number;
                /**
                 * 着色
                 */
                color: THREE.Color | null;
            }
        }
    }
}
