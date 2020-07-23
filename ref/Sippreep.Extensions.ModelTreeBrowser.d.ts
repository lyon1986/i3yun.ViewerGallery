declare namespace Sippreep {
    namespace Extensions {
        namespace ModelTreeBrowser {
            /**
 * 模型树相关API
 */
            export interface IModelTreeBrowser {
                /**
                 * 异步获取当前加载模型的树形组织结构
                 * 部件的关键信息是dbid
                 */
                getModelTree(): Promise<ITreeNode>;
                /**
                 * 异步获取部件属性信息
                 * @param dbid 部件
                 */
                getProperties(dbid: number): Promise<IProperties>;
                /**
                 * 隐藏指定的部件
                 * @param dbid 部件
                 */
                hide(dbid: number | number[]): void;
                /**
                 * 显示指定的部件
                 * @param dbid 部件
                 */
                show(dbid: number | number[]): void;
                /**
                 * 设置当前模型全部显示或隐藏
                 * @param show 显示或隐藏
                 */
                setAllVisibility(show: boolean): void;
                /**
                 * 切换指定部件的显示隐藏状态
                 * @param dbId 
                 */
                toggleVisibility(dbId: number | number[]): void;
                /**
                 * 读取当前模型是否全部部件都是显示状态
                 */
                areAllVisible(): boolean;
                /**
                 * 读取指定部件的显示状态
                 * @param dbid 
                 */
                isDbidVisible(dbid: number): boolean;
                /**
                 * 读取当前模型所有隐藏状态的部件
                 */
                getHiddenDbids(): number[];
                /**
                 * 将一个部件移动到视角的合适位置
                 * @param dbids 指定的部件
                 * @param immediate 默认false：有动画的移动过去；true：无动画，移动立即完成。
                 */
                fitToView(dbids?: null | number | number[]/*, immediate?: boolean*/): void;
                /**
                 * 切换指定部件的选择状态
                 * @param dbId 
                 */
                toggleSelect(dbId: number): void;
                /**
                 * 选择指定部件
                 * @param dbIds 
                 */
                select(dbIds: number[] | number): void;
                /**
                 * 取消选择指定部件
                 * @param dbIds 
                 */
                deselect(dbIds: number[] | number): void;
                /**
                 * 取消选择所有部件
                 */
                clearSelection(): void;
                /**
                 * 获取当前选择的所有部件
                 */
                getSelection(): number[];
                /**
                 * 订阅选择部件事件
                 * 只要是选择的内容被操作了就会触发，可能内容不变，可能触发多次
                 * @param callback 触发选择后的回调，带有一个number[]的入参表示当前选择中的部件
                 */
                handleSelectionChange(callback: (newDbIds: number[]) => void): void;
            }
            /**
             * 模型树数据结构
             * 可能是根部件，可能是中间部件，可能是叶子部件
             */
            export interface ITreeNode {
                /**
                 * 当前部件的dbid
                 */
                dbId: number;
                /**
                 * 当前部件的名字
                 */
                name: string;
                /**
                 * 当前部件的子部件列表
                 * 叶子部件没有children属性
                 */
                children?: Array<ITreeNode>;
            }
            /**
             * 部件的属性信息
             */
            export interface IProperties {
                /**
                 * 部件dbid
                 */
                dbId: number;
                /**
                 * 暂无用
                 */
                externalId: string;
                /**
                 * 部件名字
                 */
                name: string;
                /**
                 * 此部件的属性列表
                 */
                properties: Array<IPropItem>;
            }
            /**
             * 部件属性项
             */
            export interface IPropItem {
                /**
                 * 属性名
                 */
                displayName: string;
                /**
                 * 属性值
                 */
                displayValue: string;
                /**
                 * 属性分类
                 */
                displayCategory: string;
            }
        }
    }
}


