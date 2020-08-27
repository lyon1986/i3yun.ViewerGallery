/// <reference path="Sippreep.d.ts" />

declare namespace SippreepViewer {
    function CreateViewer(container:HTMLElement):Promise<Sippreep.Viewing.Viewer3D>;
}