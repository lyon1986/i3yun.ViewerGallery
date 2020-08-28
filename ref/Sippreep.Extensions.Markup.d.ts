declare namespace Sippreep {
    namespace Extensions {
        namespace Markup {
            /**
            * 标记插件  
            * 标记有三部分，热点指示 + 偏移线 + 内容， 大概看起来是 o---口  
            * 标记内容框是一个div，所以标记数量不要建立过多，开发机测试200个标记会有明显卡顿，热点和偏移线倒是没什么性能问题
            */
            export interface Markup3DExtension {
                /**
                 * 开始设置，停止视图层的数据刷新
                 * 大量标记设置请一定先使用此方法，设置完成后使用endUpdate()
                 */
                beginUpdate(): void;
                /**
                 * 设置完成，刷新视图
                 */
                endUpdate(): void;
                /**
                 * 获取标记数据
                 */
                getItems(): IMarkup3DCollecton;
                /**
                 * 导出JSON对象
                 */
                exportItems(): string;
                /**
                 * 导入JSON对象
                 * @param data 
                 */
                importItems(data: string): void;

                /**
                 * 获取 热点、偏移线和依附的部件 的空间盒子
                 */
                getBox(item: IMarkup3D): THREE.Box3;
            }
            /**
             * 标记数据
             */
            export interface IMarkup3DCollecton {
                /**
                 * 获取标记数量
                 */
                readonly count: number;
                /**
                 * 获取指定索引的标记
                 * @param index 
                 */
                get(index: number): IMarkup3D;
                /**
                 * 获得所有标记
                 */
                toArray(): IMarkup3D[];
                /**
                 * 添加一个标记
                 */
                add(): IMarkup3D;
                /**
                 * 移除一个标记
                 * @param item 指定标记对象
                 */
                remove(item: IMarkup3D): boolean;
                /**
                 * 移除所有标记
                 */
                clear(): void;
            }
            /**
             * 标记类型
             */
            export type AnchorType = Point | Polyline | Polygon;
            /**
             * 标记对象
             */
            export interface IMarkup3D {
                /**
                 * 依附模型（当模型隐藏或透明时，标记不可见）
                 */
                anchorDbid?: number;
                /**
                 * 标记对象（点、线、面）
                 */
                anchor: AnchorType;
                /**
                 * 标记对象的偏移量
                 */
                offset?: THREE.Vector3;
                /**
                 * 标记对象投影到屏幕坐标时显示的内容
                 */
                content?: string | HTMLElement;
                /**
                 * 内容相对于屏幕的偏移量
                 */
                contentOffset?: THREE.Vector2;
                /**
                 * 一些外观设置
                 */
                appearance?: {
                    /**
                     * 标记颜色
                     */
                    anchorColor?: THREE.Color,
                    /**
                     * 偏移线颜色
                     */
                    offsetColor?: THREE.Color,
                };
                /**
                 * 自定义数据
                 */
                tag?: object;
            }
            /**
             * 点，是一个三维的几何图形，可用于描述需要精确定位的对象。
             */
            export class Point {
                value: THREE.Vector3

            }
            /**
             * 线，是一个有序路径的集合
             */
            export class Polyline {

                /**
                 * 有序点的集合（至少需要2个点）
                 */
                path: THREE.Vector3[];
            }
            /**
             * 面，是环（Ring）的集合，环是一种封闭的路径。
             * 
             */
            export class Polygon {

                /**
                 * 有序点的集合（围绕第一个点组成的面，至少需要3个点）
                 */
                vertices: THREE.Vector3[];
            }
        }
    }
}