declare namespace Sippreep {
    namespace Extensions {
        namespace NingboYanchang {
            export interface NingboYanchangExtension {

                /**
                 * 获取突出显示的dbid
                 */
                outstanding: number[];
            
                /**
                 * 设置dbid颜色
                 * @param dbids 
                 * @param color 
                 */
                setColor(dbids: number[], color: THREE.Color, alpha?: number): void;
            
                /**
                 * 清除所有dbid颜色
                 */
                clearAllColor(): void;
            
                /**
                 * 设置dbid闪烁
                 * @param dbids 
                 * @param color 
                 * @param config 还没想好
                 */
                setFlicker(dbids: number[], color: THREE.Color[], config?: any[]): void;
                /**
                 * 取消dbid闪烁
                 * @param dbids 
                 */
                cancelFlicker(dbids: number[]): void;
                /**
                 * 取消全部闪烁
                 */
                cancelAllFlicker(): void;
            }
            
            export class TreeNode {
                dbId: number;
                name: string;
                children?: TreeNode[];
            }
        }
    }
}


