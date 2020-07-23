/// <reference types="THREE" />
declare namespace Sippreep {
    namespace Extensions {
        namespace PickPoints {
            export interface PickPointExtension {
                Picked:(worldPoint: { x: number; y: number; z: number; })=>void;
            }
        }
    }
}