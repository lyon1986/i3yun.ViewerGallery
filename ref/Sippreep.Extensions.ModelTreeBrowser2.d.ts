declare namespace Sippreep {
    namespace Extensions {
        namespace ModelTreeBrowser2 {
            export interface ModelTreeBrowser2Extension {
                /**
                 * 异步获取当前加载模型的树形组织结构
                 * 部件的关键信息是dbid
                 */
                getModelTree(): Promise<TreeNode>;
                /**
                 * 异步获取部件属性信息
                 * @param dbid 部件
                 */
                getProperties(dbid: number): Promise<Properties>;
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
                 * @param callback 触发选择后的回调，带有一个SelectResult[]的入参表示当前选择中的结果
                 * 
                 */
                handleSelectionChange(callback: (selectResults: SelectResult[]) => void): void;


            }
            export interface ModelTreeSearchExtension {
                /**
                 * 在模型树的结构中搜索
                 * @param keywords 
                 * @param attributeNames 
                 */
                searchTreeNode(keywords: string): Promise<SearchResult[]>;
                /**
                 * 在模型属性值中搜索
                 * @param keywords 
                 * @param searchFieldAttributeNames 
                 */
                searchProperty(keywords: string, searchFieldAttributeNames?: string[]): Promise<SearchResult[]>;

                /**
                 * 返回可用的属性名
                 */
                listPropertyNames(): Promise<string[]>;
            }
            export class TreeNode {
                dbId: number;
                name: string;
                children?: TreeNode[];
            }
            export class Properties {
                dbId: number;
                externalId: string;
                name: string;
                properties: PropItem[];
            }
            export class PropItem {
                displayName: string;
                displayValue: string;
                displayCategory: string;
            }
            /**
             * 搜索结果
             */
            export class SearchResult {
                /**
                 * 名字
                 */
                name: string;
                /**
                 * 第一项（下标为0）总是自己  
                 * （若有）第n项是n-1的父亲节点  
                 * 最后一项总是祖宗节点
                 */
                parentPath: Parent[];//模型树的路径
                /**
                 * 部件编码dbid
                 */
                dbid: number;
            }
            /**
             * 选择结果
             */
            export class SelectResult {
                dbid: number;
                /**
                 * 第一项（下标为0）总是自己  
                 * （若有）第n项是n-1的父亲节点  
                 * 最后一项总是祖宗节点
                 */
                parentPath?: Parent[];
            }
            /**
             * 父节点信息
             */
            export class Parent {
                /**
                 * 部件编码dbid
                 */
                dbid: number;
                /**
                 * 名字
                 */
                name: string;
            }
        }
    }
}


