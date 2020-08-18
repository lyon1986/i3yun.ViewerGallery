declare namespace Sippreep {
    namespace Extensions {
        namespace Markup {
            /**
            * 标签插件  
            * 标签有三部分，热点指示 + 偏移线 + 内容， 大概看起来是 o---口  
            * 标签内容框是一个div，所以标签数量不要建立过多，开发机测试200个标签会有明显卡顿，热点和偏移线倒是没什么性能问题
            */
            export interface Markup3DExtension {
                /**
                 * 开始设置，停止视图层的数据刷新
                 * 大量标签设置请一定先使用此方法，设置完成后使用endUpdate()
                 */
                beginUpdate(): void;
                /**
                 * 设置完成，刷新视图
                 */
                endUpdate(): void;
                /**
                 * 获取标签数据
                 */
                getItems(): IMarkup3DCollecton;
            }
            /**
             * 标签数据
             */
            export interface IMarkup3DCollecton {
                /**
                 * 添加一个标签
                 * 注意，如果不进行设置，则这个标签的默认状态 位置在0，0，0 有文字内容，
                 */
                add(): IMarkup3D;
                /**
                 * 移除一个标签
                 * @param item 
                 */
                remove(item: IMarkup3D): boolean;
                /**
                 * 移除所有标签
                 */
                clear(): void;
                /**
                 * 获得所有标签
                 */
                toArray(): IMarkup3D[];
            }
            /**
             * 单个标签
             */
            export interface IMarkup3D {
                readonly id: number
                /**
                 * 标签内容
                 */
                content?: HTMLElement | string;
                /**
                 * 标签锚定点
                 * number类型的值被理解成dbid的世界坐标点
                 * vector3类型的值被理解成世界坐标点
                 * 需要在模型加载后使用！优化这个todo
                 */
                anchor: number | THREE.Vector3;
                /**
                 * 标签内容位置从锚定点的偏移量
                 */
                offset?: THREE.Vector3;
                /**
                 * 内容框相对于偏移线终点的偏移量
                 */
                contentOffset?:THREE.Vector2;
                /**
                 * 一些外观设置
                 */
                appearance?: {
                    /**
                     * 热点大小
                     */
                    anchorRadiusCoefficient: number,
                    /**
                     * 热点颜色
                     */
                    anchorColor: THREE.Color,
                    /**
                     * 偏移线颜色
                     */
                    offsetColor: THREE.Color,
                };
            }
        }
    }
}