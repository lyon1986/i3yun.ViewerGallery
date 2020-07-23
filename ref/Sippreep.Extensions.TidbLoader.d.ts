declare namespace Sippreep {
    namespace Extensions {
        namespace TidbLoader {
            export interface TidbLoaderExtension {
                getConfig(): IConfig;
                loadScene(sceneID: string, successCallback?: (m:Sippreep.Viewing.Model) => void
                    , failedCallback?: (e: { errorCode: number, error: string }) => void): Promise<Sippreep.Viewing.Model>;
                unloadScene(): void;
            }

            export interface IConfig {
                token: string,
                host: string
            }
        }
    }
}