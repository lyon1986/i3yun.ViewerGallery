declare namespace Sippreep {
    namespace Extensions {
        namespace ExtensionManager {
            /**
             * 插件管理器
             */
            export interface ExtensionManagerExtension {
                /**
                 * 查询所有插件情况
                 */
                QueryAll(): IPlugin[];
                /**
                 * 插件管理器启动完成
                 * @param callback 
                 */
                onPluginLoaded(callback: () => void): void;
            }
            /**
             * 一个插件
             */
            export interface IPlugin {
                id: number;
                getNickname(): string;
                getExid(): string;
                getUrl(): string;
                getDes(): string;
                getLoaded(): boolean;
                load(): void;
                unLoad(): void;
            }

        }
    }
}


