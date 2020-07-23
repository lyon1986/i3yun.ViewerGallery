/// <reference types="THREE" />
declare namespace Sippreep {
    namespace Extensions {
        namespace Sections {
            /**
             * 剖面插件
             */
            export interface SectionExtension {
                /**
                 * 通过Box3数据设置一个剖面框。
                 * 此方法还将启用“剖面”工具。
                 * @param {THREE.Box3} box - 用于设置剖面框。
                 */
                setSectionBox(box: THREE.Box3): void

                /**
                 * 启用剖面并设置剖面平面样式。
                 * @param {string} mode - 指定剖面平面样式。
                 * @returns {boolean} - 如果激活成功，则为true。
                 */
                enableMode(mode: SectionMode): boolean

                /**
                 * 从三维画布中关闭剖面/框。
                 * @returns {boolean} - 如果停用则返回true，否则返回false。
                 */
                disableMode(): boolean
            }
            /**
             * 剖面平面样式
             */
            export enum SectionMode {
                /**
                 * 剖面框样式
                 */
                box,
            }
        }
    }
}