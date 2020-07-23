declare namespace Sippreep {
    namespace Extensions {
        namespace LoadProgress {

            /**
 * 模型加载进度
 */
            export interface LoadProgressExtension {
                /**
                 * 添加监听
                 * @param cb 回调函数
                 */
                addListener(cb: (p: progress) => any): void;
                /**
                 * 移除监听
                 */
                removeListener(): void;
            }
            /**
             * 回调中使用的数据类型
             */
            export class progress {
                /**
                 * 1-2
                 * 1：表示模型下载进度，一般情况下仅会在首次进入页面时发生，可能会有多次从0到100的过程
                 * 2：表示模型显示完全进度，可能会有多次从0到100的过程
                 */
                state: number;
                /**
                 * 0-100
                 * 表示某个加载过程百分比
                 */
                percent: number;
            }
        }
    }
}


