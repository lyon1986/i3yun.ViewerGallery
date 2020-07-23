declare namespace Sippreep {
    namespace Extensions {
        namespace ViewpointAnimation {
            export interface IViewpointAnimation {
                getPlayer(): IAnimationPlayer;
                getAnimationNames(): IterableIterator<string>;  //for (const iterator of object) {   }
                getAnimationBy(name: string): ICameraAnimation;
                addAnimationBy(name: string): ICameraAnimation;
                renameAnimation(oldName: string, newName: string): boolean;
                delAnimationBy(name: string): boolean;
                saveAnimations(): string;
                loadAnimations(s: string, takeCare?: boolean): boolean;
            }
            /**
             * 播放器
             */
            export interface IAnimationPlayer {
                setAnimation(value: IAnimation): IAnimation;
                getAnimation(): ICameraAnimation;
                play(): boolean;
                pause(): boolean;
                stop(): boolean;
                getCurrentTime(): number;
                setCurrentTime(value: number): number;
                getTotalTime(): number;
                multiSpeed:number;
            }
            /**
             * 播放内容接口
             */
            export interface IAnimation {
                update(time: number, viewer: Sippreep.Viewing.Viewer3D): boolean;
                getTotalTime(): number;
            }
            /**
             * 播放内容序列
             */
            export interface ICameraAnimation extends IAnimation {
                readonly points: CameraAnimationPoint[];
                name: string;
                addPoint(viewer: Sippreep.Viewing.Viewer3D, time?: number, whenScreenShot?: Function): ICameraAnimationPoint;
                delPoint(pointIndex?: number): void;
                resizeTotalTime(newTotalTime: number): void;
            }
            /**
             * 帧
             */
            export interface ICameraAnimationPoint {
                //nextPointTime: number;
                readonly parent: ICameraAnimation;
                timeAnchor: number;
            }
            export class CameraAnimationPoint implements ICameraAnimationPoint {
                parent: ICameraAnimation;
                timeAnchor: number;
                position: THREE.Vector3;
                target: THREE.Vector3;
                base64: string;
            }
        }
    }
}


