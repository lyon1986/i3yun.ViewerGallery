declare namespace Sippreep {
  namespace Viewing {
    enum ErrorCodes {
      UNKNOWN_FAILURE = 1,
      BAD_DATA = 2,
      NETWORK_FAILURE = 3,
      NETWORK_ACCESS_DENIED = 4,
      NETWORK_FILE_NOT_FOUND = 5,
      NETWORK_SERVER_ERROR = 6,
      NETWORK_UNHANDLED_RESPONSE_CODE = 7,
      BROWSER_WEBGL_NOT_SUPPORTED = 8,
      BAD_DATA_NO_VIEWABLE_CONTENT = 9,
      BROWSER_WEBGL_DISABLED = 10,
      BAD_DATA_MODEL_IS_EMPTY = 11,
      RTC_ERROR = 12,
      UNSUPORTED_FILE_EXTENSION = 13,
      VIEWER_INTERNAL_ERROR = 14,
    }

    enum SelectionMode {
      MIXED,
      REGULAR,
      OVERLAYED,
      LEAF_OBJECT,
      FIRST_OBJECT,
      LAST_OBJECT,
    }

    enum ProgressState {
      ROOT_LOADED,
      LOADING,
      RENDERING,
    }

    enum KeyCode {
      // 控制区 小数字键盘 功能键 主字母和数字键
      BACKSPACE = 8,
      TAB = 9,
      ENTER = 13,
      SHIFT = 16,
      CONTROL = 17,
      ALT = 18,
      ESCAPE = 27,
      SPACE = 32,
      PAGEUP = 33,
      PAGEDOWN = 34,
      END = 35,
      HOME = 36,
      LEFT = 37,
      UP = 38,
      RIGHT = 39,
      DOWN = 40,
      INSERT = 45,
      DELETE = 46,
      ZERO = 48,
      SEMICOLONMOZ = 59,
      EQUALSMOZ = 61,
      a = 65,
      b = 66,
      c = 67,
      d = 68,
      e = 69,
      f = 70,
      g = 71,
      h = 72,
      i = 73,
      j = 74,
      k = 75,
      l = 76,
      m = 77,
      n = 78,
      o = 79,
      p = 80,
      q = 81,
      r = 82,
      s = 83,
      t = 84,
      u = 85,
      v = 86,
      w = 87,
      x = 88,
      y = 89,
      z = 90,
      ZERO_s = 96,
      ONE_s = 97,
      LCOMMAND = 91,
      RCOMMAND = 93,
      MULT = 106,
      PLUS = 107,
      DASHMOZ = 109,
      DIVD = 111,
      PLUSMOZ = 171, //???
      F1 = 112,
      F2 = 113,
      F3 = 114,
      F4 = 115,
      F5 = 116,
      F6 = 117,
      F7 = 118,
      F8 = 119,
      F9 = 120,
      F10 = 121,
      F11 = 122,
      F12 = 123,
      DASHMOZNEW = 173,
      SEMICOLON = 186,
      EQUALS = 187,
      COMMA = 188,
      DASH = 189,
      PERIOD = 190,
      SLASH = 191,
      LBRACKET = 219,
      RBRACKET = 221,
      SINGLEQUOTE = 222,
      COMMANDMOZ = 224,
    }

    interface ViewerEvent {
      (event: any): void;
    }

    interface Viewer3DConfig {
      startOnInitialize?: boolean;
      theme?: 'dark-theme' | 'light-theme' | string;
      [key: string]: any;
    }

    interface ViewerConfig {
      disableBrowserContextMenu?: boolean;
      disabledExtensions?: {
        bimwalk?: boolean;
        hyperlink?: boolean;
        measure?: boolean;
        scalarisSimulation?: boolean;
        section?: boolean;
      };
      extensions?: string[];
      useConsolidation?: boolean;
      consolidationMemoryLimit?: number;
      sharedPropertyDbPath?: string;
      bubbleNode?: BubbleNode;
      canvasConfig?: any;
      startOnInitialize?: boolean;
      experimental?: any[];
      theme?: 'dark-theme' | 'light-theme' | string;
      [key: string]: any;
    }

    interface ItemSelectedObserver {
      onItemSelected(viewer: Viewer3D): void;
    }

    interface SelectionVisibility {
      hasVisible: boolean;
      hasHidden: boolean;
    }

    interface ThumbnailOptions {
      urn: string;
      width: number;
      height: number;
      guid: string;
      acmsession: (string);
    }

    interface FileLoaderOptions {
      ids?: string;
      sharedPropertyDbPath?: string;
      [key: string]: any;
    }

    interface LoadModelOptions {
      fileLoader?: FileLoader;
      loadOptions?: object;
      sharedPropertyDbPath?: string;
      ids?: string;
      [key: string]: any;
    }

    interface PropertyOptions {
      propFilter?: string[];
      ignoreHidden?: boolean;
      [key: string]: any;
    }

    interface ResizePanelOptions {
      dockingPanels?: UI.DockingPanel[];
      viewer?: Viewer3D;
      dimensions?: {
        width: number;
        height: number;
      };
    }

    class FileLoader {
      constructor(viewer: Viewer3D);

      is3d(): boolean;
      loadFile(url: string, options: FileLoaderOptions, onSuccess: () => void, onError: () => void): void;
    }

    interface ViewerItem {
      children?: ViewerItem[];
      guid: string;
      hasThumbnail: boolean;
      name: string;
      parent: ViewerItem;
      progress: string;
      role: '3d' | '2d' | string;
      size: number;
      status: string;
      success: string;
      type: 'view' | 'geometry' | string;
      viewableID: string;
    }

    interface ExtensionOptions {
      defaultModelStructureTitle: string;
      extensions: string[];
      startOnInitialize: boolean;
      viewableName: string;
      [key: string]: any;
    }

    const AGGREGATE_FIT_TO_VIEW_EVENT = 'aggregateFitToView';
    const AGGREGATE_ISOLATION_CHANGED_EVENT = 'aggregateIsolation';
    const AGGREGATE_SELECTION_CHANGED_EVENT = 'aggregateSelection';
    const ANIMATION_READY_EVENT = 'animationReady';
    const CAMERA_CHANGE_EVENT = 'cameraChanged';
    const CAMERA_TRANSITION_COMPLETED = 'cameraTransitionCompleted';
    const CUTPLANES_CHANGE_EVENT = 'cutplanesChanged';
    const CANCEL_LEAFLET_SCREENSHOT = 'cancelLeafletScreenshot';
    const ESCAPE_EVENT = 'escape';
    const EXPLODE_CHANGE_EVENT = 'explodeChanged';
    const EXTENSION_LOADED_EVENT = 'extensionLoaded';
    const EXTENSION_UNLOADED_EVENT = 'extensionUnloaded';
    const FINAL_FRAME_RENDERED_CHANGED_EVENT = 'finalFrameRenderedChanged';
    const FIT_TO_VIEW_EVENT = 'fitToView';
    const FRAGMENTS_LOADED_EVENT = 'fragmentsLoaded';
    const FULLSCREEN_MODE_EVENT = 'fullscreenMode';
    const GEOMETRY_LOADED_EVENT = 'geometryLoaded';
    const GEOMETRY_DOWNLOAD_COMPLETE_EVENT = 'geometryDownloadComplete';
    const HIDE_EVENT = 'hide';
    const HYPERLINK_EVENT = 'hyperlink';
    const ISOLATE_EVENT = 'isolate';
    const LAYER_VISIBILITY_CHANGED_EVENT = 'layerVisibilityChanged';
    const LOAD_GEOMETRY_EVENT = 'loadGeometry';
    const LOAD_MISSING_GEOMETRY = 'loadMissingGeometry';
    const MODEL_ADDED_EVENT = 'modelAdded';
    const MODEL_ROOT_LOADED_EVENT = 'modelRootLoaded';
    const MODEL_REMOVED_EVENT = 'modelRemoved';
    const MODEL_LAYERS_LOADED_EVENT = 'modelLayersLoaded';
    const MODEL_UNLOADED_EVENT = 'modelUnloaded';
    const NAVIGATION_MODE_CHANGED_EVENT = 'navigationModeChanged';
    const OBJECT_TREE_CREATED_EVENT = 'objectTreeCreated';
    const OBJECT_TREE_UNAVAILABLE_EVENT = 'objectTreeUnavailable';
    const PREF_CHANGED_EVENT = 'prefChanged';
    const PREF_RESET_EVENT = 'prefReset';
    const PROGRESS_UPDATE_EVENT = 'progressUpdate';
    const RENDER_FIRST_PIXEL = 'renderFirstPixel';
    const RENDER_OPTION_CHANGED_EVENT = 'renderOptionChanged';
    const RENDER_PRESENTED_EVENT = 'renderPresented';
    const RESET_EVENT = 'reset';
    const RESTORE_DEFAULT_SETTINGS_EVENT = 'restoreDefaultSettings';
    const SELECTION_CHANGED_EVENT = 'selection';
    const SHOW_EVENT = 'show';
    const TEXTURES_LOADED_EVENT = 'texturesLoaded';
    const TOOL_CHANGE_EVENT = 'toolChanged';
    const TOOLBAR_CREATED_EVENT = 'toolbarCreated';
    const VIEWER_INITIALIZED = 'viewerInitialized';
    const VIEWER_RESIZE_EVENT = 'viewerResize';
    const VIEWER_STATE_RESTORED_EVENT = 'viewerStateRestored';
    const VIEWER_UNINITIALIZED = 'viewerUninitialized';
    const WEBGL_CONTEXT_LOST_EVENT = 'webGlContextLost';

    interface ViewerEventArgs {
      target?: Viewer3D;
      model?: ViewerItem;
      type: string;
      [key: string]: any;
    }

    interface BubbleNodeSearchProps {
      role?: '3d' | '2d' | string;
      type?: 'view' | 'geometry' | string;
      mime?: string;
    }

    class BubbleNode {
      static MODEL_NODE: BubbleNodeSearchProps;
      static GEOMETRY_SVF_NODE: BubbleNodeSearchProps;
      static SHEET_NODE: BubbleNodeSearchProps;
      static GEOMETRY_F2D_NODE: BubbleNodeSearchProps;
      static VIEWABLE_NODE: BubbleNodeSearchProps;

      parent: BubbleNode;
      id: number;
      data: ViewerItem;
      isLeaf: boolean;
      sharedPropertyDbPath: string;
      lodNode: object;
      children: BubbleNode[];

      constructor(rawNode: object, parent?: BubbleNode);

      findByGuid(guid: string): BubbleNode;
      findParentGeom2Dor3D(): BubbleNode;
      findPropertyDbPath(): string;
      findViewableParent(): BubbleNode;
      getLodNode(): boolean;
      getNamedViews(): string[];
      getPlacementTransform(): object;
      getRootNode(): BubbleNode;
      getTag(tag: string): any;
      getViewableRootPath(): string;
      guid(): string;
      is2D(): boolean;
      is2DGeom(): boolean;
      is3D(): boolean;
      is3DGeom(): boolean;
      isGeometry(): boolean;
      isGeomLeaf(): boolean;
      isMetadata(): boolean;
      isViewable(): boolean;
      isViewPreset(): boolean;
      name(): string;
      search(propsToMatch: BubbleNodeSearchProps): BubbleNode[];
      searchByTag(tagsToMatch: object): BubbleNode[];
      setTag(tag: string, value: any): void;
      traverse(cb: (bubble: BubbleNode) => boolean): boolean;
      urn(searchParent?: boolean): string;
      useAsDefault(): boolean;
    }

    let theExtensionManager: ExtensionManager;

    interface InitializerOptions {
      api?: string;
      env?: string;
      webGLHelpLink?: string;
      getAccessToken?(callback?: (accessToken: string, expires: number) => void): void;
      refreshToken?(callback?: (accessToken: string, expires: number) => void): void;
      language?: string;
      accessToken?: string;
      useADP?: boolean;
      useConsolidation?: boolean;
      [key: string]: any;
    }

    function getApiEndpoint(): string;
    function Initializer(options: InitializerOptions, callback?: () => void): void;

    class Document {
      constructor(dataJSON: object, path: string, acmsession: string);
      static load(documentId: string, successCallback: (doc: Document) => void,
        errorCallback: (errorCode: ErrorCodes, errorMsg: string, messages: any[]) => void, accessControlProperties?: any): void;
      static getSubItemsWithProperties(item: object, properties: Properties, recursive: boolean): object[];

      acmSessionId: string;
      myData: any;

      getFullPath(urn: string): string;
      getItemById(id: string): object;
      getMessages(itemId: string, excludeGlobal: boolean): object;
      getNumViews(item: object): number;
      getParentId(item: string): string;
      getPath(): string;
      getPropertyDbPath(): string;
      getRoot(): BubbleNode;
      getRootItem(): object;
      getSubItemsWithProperties(item: object, properties: object, recursive: boolean): object;
      getThumbnailOptions(item: object, width: number, height: number): ThumbnailOptions;
      getThumbnailPath(item: string, width: number, height: number): string;
      getViewableItems(document: Document): void;
      getViewablePath(item: object, outLoadOptions?: object): string;
      getViewGeometry(item: object): object;
      load(documentId: string, onSuccessCallback: () => void, onErrorCallback: () => void, accessControlProperties?: object): void;
      requestThumbnailWithSecurity(data: string, onComplete: (err: Error, response: any) => void): void;
    }

    function shutdown(): void;

    class EventDispatcher {
      addEventListener(type: string, listener: (event: any) => void, options?: any): void;
      removeEventListener(type: string, listener: (event: any) => void): void;
      dispatchEvent(event: any): void;
      hasEventListener(type: string, listener: (event: any) => void): boolean;
    }

    class Extension extends ExtensionMode {
      viewer: GuiViewer3D;
      options: any;
      constructor(viewer: GuiViewer3D, options: any);
      /**
       * True if the load was successful. Optionally, the function can return a Promise which resolves when load succeeds and rejects in case of failure.
       */
      load(): boolean;
      /**
       * True if the unload was successful.
       */
      unload(): boolean;
      onToolbarCreated(toolbar?: UI.ToolBar): void;



      /**
       * Gets the name of the extension.
       * @returns {string} Returns the name of the extension.
       * @alias .Viewing.Extension#getName
       */
      getName(): string;



      /**
          * Add localization strings to the viewer. 
          * This method can override localization keys already loaded.
          * There is no API method to remove localization strings added with this method.
          * 
          * @example
          * var locales = {
                 en: { my_tooltip: "CUSTOM_TOOLTIP" },
                 de: { my_tooltip: "BENUTZERDEFINIERTE_TOOLTIP" }
            };
            ext.extendLocalization(locales);
          *  
          * @param {object} locales The set of localized strings keyed by language
          * @returns {boolean} True if localization was successfully updated
          * @alias .Viewing.Extension#extendLocalization
          */
      extendLocalization(locales: object): boolean;

      /**
      * Returns an object that persists throughout an extension's unload->load operation sequence. 
      * Cache object is kept by the {@link .Viewing.Viewer3D} instance.
      * Cache object lives only in RAM, there is no localStorage persistence.
      * @returns {object} The cache object for a given extension.
      * @alias .Viewing.Extension#getCache
      */
      getCache(): object;
    }
    class ExtensionMode {
      protected constructor();
      /**
       * Override the activate method to enable the functionality of the extension.
       * @param [mode] - An optional mode that indicates a different way the extension can function.
       * @see {@link Viewing.Extension#getModes }
       * @returns {boolean} True if the extension activation was successful.
       * @virtual
       */
      activate(mode: string): boolean;

      /**
       * Override the deactivate method to disable the functionality of the extension.
       * @returns {boolean} True if the extension deactivation was successful.
       * @virtual
       */
      deactivate(): boolean;

      /**
      * Gets an array of modes available for the extension.
      * @returns {Array} Returns an array of modes.
      * @alias .Viewing.Extension#getModes
      */
      getModes(): any[];

      /**
      * Check if the extension is active and optionally check if the specified mode is active for that extension.
      * @param mode - An optional mode that indicates a different way the extension can function.
      * @see {@link .Viewing.Extension#getModes }
      * @returns {boolean} Default - True if the extension is active.
      * When optional argument mode is specified, returns true if both extension and the mode are active, false otherwise.
      * @alias Autodesk.Viewing.Extension#isActive
      */
      isActive(mode?: string): boolean;


      /**
       * Gets the extension state as a plain object. Intended to be called when viewer state is requested.
       * @param {object} viewerState - Object to inject extension values.
       * @virtual
       * @alias .Viewing.Extension#getState
       */
      getState(viewerState: object): any; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


      /**
       * Restores the extension state from a given object.
       * @param {object} viewerState - Viewer state.
       * @param {boolean} immediate - Whether the new view is applied with (true) or without transition (false).
       * @returns {boolean} True if restore operation was successful.
       * @virtual
       * @alias .Viewing.Extension#restoreState
       */
      restoreState(viewerState: object, immediate: boolean): boolean;

    }
    /**
     * 自带的插件管理器
     */
    class ExtensionManager {
      extensions: { [key: string]: Extension };
      extensionsAsync: { [key: string]: Extension };

      /**
       * 将一个插件以给定的id进行注册
       * @param extensionId The string id of the extension.
       * @param extension The Extension-derived class representing the extension.
       * @returns True if the extension was successfully registered.
       */
      registerExtension(extensionId: string, extension: object): boolean;
      /**
       * Unregisters an existing extension with the given id.
       * @param extensionId 
       */
      unregisterExtension(extensionId: string): boolean;
      /**
       * Registers an extension that needs to be downloaded before using it.
       * The Viewer ships with some extensions that are not bundled, but can be runtime-fetched.
       * @param extensionId 
       * @param urlPath 
       */
      registerExternalExtension(extensionId: string, urlPath: string): boolean;
      unregisterExternalExtension(extensionId: string): boolean;
      /**
       * 获取外部插件资源位置
       * @param extensionId 
       */
      getExternalPath(extensionId: string): string | null;
      /**
       * Returns the class representing the extension with the given id.
       * @param extensionId The string id of the extension.
       * @returns The Extension-derived class if one was registered; null otherwise.
       */
      getExtension(extensionId: string): Extension | null;
      /**
       * 获取已注册插件
       */
      getRegisteredExtensions(): Array<{ id: string, inMemory: boolean, isAsync: boolean }>;
      popuplateOptions(options: any): void;
    }

    class InstanceTree {
      //maxDepth: number;
      nodeAccess: InstanceTreeAccess;
      //numHidden: number;
      //numOff: number;
      //objectCount: number;

      enumNodeChildren(node: any, callback: (dbId: number) => void, recursive?: boolean): void;
      enumNodeFragments(node: any, callback: (fragId: number) => void, recursive?: boolean): void;
      getChildCount(dbId: number): number;
      getNodeBox(dbId: number, nodeBox: Float32Array): void;
      getNodeParentId(dbId: number): number;
      getRootId(): number;
      setFlagGlobal(flag: any, value: any): void;
      setFlagNode(dbId: number, flag: any, value: any): boolean;
      //setNodeOff(dbId:number, value:boolean):void;
      isNodeOff(dbId: number): boolean;
      isNodeHidden(dbId: number): boolean;
      isNodeSelectable(dbId: number): boolean;
      getNodeName(dbId: number, includeCount: boolean): string;
    }

    class InstanceTreeAccess {
      children: any;
      dbIdToIndex: Map<number, number>;
      nameSuffixes: any;
      names: any;
      nodeBoxes: any;
      nodes: any;
      numNodes: number;
      rootId: number;
      strings: string[];
      visibleIds: number;
    }

    interface InstanceTreeNode {
      dbId: number;
      name: string;
      fragments: number[];
      children: InstanceTreeNode[];
    }
    class FragmentList {
      /**
       *  @deprecated 此功能为私有属性，不建议使用
       */
      fragments: { fragId2dbId: Int32Array };
      /**
       * @deprecated 此功能为私有属性，不建议使用
       */
      db2ThemingColor: { [dbid: number]: undefined | THREE.Vector4 }
      getWorldBounds(fragId: number, tempBounds: THREE.Box3): void;
      getMaterial(fragId: number): THREE.Material;
      setMaterial(fragId: number, material: THREE.Material): void;
    }
    class Model {
      visibilityManager: Private.VisibilityManager;
      /* 20191220 根据https://autodesk-forge.gitee.io/helpcenter/classes/autodesk.viewing.model.html#id 进行补充 */
      id: number;
      isvizCacheEnabled: boolean;
      visibleBoundsDirty: boolean;

      addEventListener(type: string, listener: (event: Event) => void): void;
      apply(target: any): void;
      dispatchEvent(event: object): void;
      getModelId(): number;
      hasEventListener(type: string, listener: (event: Event) => void): void;
      removeEventListener(type: string, listener: (event: Event) => void): void;
      /* 20191220 结束 */
      clearThemingColors(): void;
      fetchTopology(maxSizeMB: number): Promise<object>;
      /**
       * @returns {THREE.Box3} Bounding box of the model if available, otherwise null.
       */
      getBoundingBox(): THREE.Box3;
      /**
       * Returns properties for multiple objects with an optional filter on which properties to retrieve.
       * @deprecated Use getBuldProperties2 instead.
       * @param dbIds 
       * @param propFilter 
       * @param successCallback 
       * @param errorCallback 
       */
      getBulkProperties(dbIds: number[], propFilter?: string[], successCallback?: (r: PropertyResult[]) => void, errorCallback?: (err: any) => void): void;
      /**
       * Returns properties for multiple objects with an optional filter on which properties to retrieve.
       * @param dbIds 
       * @param options 
       * @param successCallback 
       * @param errorCallback 
       */
      getBulkProperties2(dbIds: number[], options?: object | undefined, successCallback?: (r: PropertyResult[]) => void, errorCallback?: (err: any) => void): void;
      /**
       * Returns the geometry data.
       * @memberof .Viewing.Model
       * @alias .Viewing.Model#getData
       */
      getData(): any;
      getFragmentList(): FragmentList;
      getGeometryList(): any;
      getObjectTree(successCallback?: (result: InstanceTree) => void, errorCallback?: (err: any) => void): void;
      /**
       * Asyncronous method that gets object properties
       * @deprecated Use getProperties2 instead - which makes sure that externalId table is only loaded if really needed.
       * @param dbId 
       * @param successCallback 
       * @param errorCallback 
       */
      getProperties(dbId: number, successCallback?: (r: PropertyResult) => void, errorCallback?: (err: any) => void): void;
      /**
       * Asyncronous method that gets object properties
       * @param dbId 
       * @param successCallback 
       * @param errorCallback 
       * @param option 
       */
      getProperties2(dbId: number, successCallback?: (r: PropertyResult) => void, errorCallback?: (err: any) => void, option?: any): void;
      /**
       * Returns the polygon count.
       */
      geomPolyCount(): number;
      getDefaultCamera(): THREE.Camera;
      /**
       * Returns an object wrapping the bubble/manifest entry for the
       * loaded geometry. Contains data such as the viewableID, guid, role...
       * @returns {Autodesk.Viewing.BubbleNode|null}
       */
      getDocumentNode(): Sippreep.Viewing.BubbleNode | null;
      /**
       * Returns an object with key values being dbNodeIds and values externalIds.
       * Useful to map LMV node ids to Fusion node ids.
       * @param onSuccessCallback 
       * @param onErrorCallback 
       */
      getExternalIdMapping(onSuccessCallback: (idMapping: { [key: string]: number; }) => void, onErrorCallback: () => void): any;
      getFastLoadList(): any;
      /**
       * Returns an object with key values being layer names, pointing to Arrays containing dbIds.
       * @param successCallback 
       * @param errorCallback 
       */
      getLayerToNodeIdMapping(successCallback?: (r: any) => any, errorCallback?: (err: any) => any): any;
      getFragmentMap(): any;
      /**
       * @returns {InstanceTree} Instance tree of the model if available, otherwise null.
       */
      getInstanceTree(): InstanceTree;
      getLayersRoot(): object;
      /**
       * Return metadata value.
       * @param itemName 
       * @param subitemName 
       * @param defaultValue 
       */
      getMetadata(itemName: string, subitemName?: string, defaultValue?: any): any;
      /**
       * Returns the root of the geometry node graph.
       * @returns {object} The root of the geometry node graph. Null if it doesn't exist.
       */
      getRoot(): object;
      /**
       * @returns {number} The ID of the root or null if it doesn't exist.
       */
      getRootId(): number;
      getTopoIndex(fragId: number): number;
      getTopology(index: number): object;
      /**
       * Returns an object that contains the standard unit string (unitString) and the scale value (unitScale).
       * @param {string} unit - Unit name from the metadata:m ft in cm mm pt
       * @returns {object} this object contains the standardized unit string (unitString) and a unit scaling value (unitScale)
       */
      getUnitData(unit: string): object;
      /**
       * Returns a standard string representation of the model's distance unit.
       * @returns {string} Standard representation of model's unit distance or null if it is not known.
       */
      getUnitString(): string;
      /**
       * Returns the scale factor of model's distance unit to meters.
       * @returns {number} The scale factor of the model's distance unit to meters or unity if the units aren't known.
       */
      getUnitScale(): number;
      /**
       * Returns a standard string representation of the model's display unit.
       * @returns {string} Standard representation of model's display unit or null if it is not known.
       */
      getDisplayUnit(): string;
      /**
       * Returns up vector as an array of 3.
       */
      getUpVector(): number[];
      hasTopology(): boolean;
      /**
       * Returns the instanced polygon count.
       */
      instancePolyCount(): number;
      /**
       * @returns {boolean} Whether the model is 2D.
       */
      is2d(): boolean;
      /**
       * @returns {boolean} Whether the model is 3D.
       */
      is3d(): boolean;
      /**
       * @returns {boolean} true if the model is an OTG file - which supports sharing of materials and geometry. 
       */
      isOTG(): boolean;
      /**
      * @returns {boolean} true if the model is created from a PDF file.
      */
      isPdf(): boolean;
      /**
      * @returns {boolean} true if the model is created from an image file.
      */
      isLeaflet(): boolean;
      /**
       * @returns {boolean}  true when the "AEC" loader settings were used when loading the model
       */
      isAEC(): boolean;
      /**
       * Returns true if the model with all its geometries has loaded.
       */
      isLoadDone(): boolean;
      /**
       * Returns true if the frag to node id mapping is done.
       */
      isObjectTreeCreated(): boolean;
      /**
       * Returns an instance of {@link PropDbLoader|PropertyDatabase Loader},
       * responsible for communicating with the PropertyDatabase instance hosted in a browser worker thread.
       * 
       * 这个东西很关键，读取模型数据库的信息。下面的函数在模型树2插件中示例了如何读取属性名列表
       * getPropertyDb().executeUserFunction(userFunction);
       * 可以在运行时查看更多信息
       */
      getPropertyDb(): PropDbLoader;
      isObjectTreeLoaded(): boolean;
      pageToModel(): void;
      pointInClip(): void;
      search(text: string, onSuccessCallback: (r1: Array<number>) => void, onErrorCallback: (e: any | string) => void, attributeNames?: string[]): void;
      setData(data: object): void;
      setThemingColor(dbId: number, color: THREE.Vector4, recursive?: boolean): void;
      /**
       * Set a UUID to identify the SVF model
       * @param {string} urn - Data that represents the geometry.
       */
      setUUID(urn: string): void;
    }
    interface PropDbLoader {
      /**
       * 在工作线程上提供的函数允许对工作线程执行代码PropertyDatabase实例。从提供的函数返回的值将用于解决返回的承诺。该函数必须命名为userFunction
       * @param code
       * @param userData
       */
      executeUserFunction(code: string | ((pdb: PropertyDatabase, userData?: any) => void), userData?: any): Promise<any>
    }
    /**
     * https://autodeskviewer.com/viewers/latest/docs/PropertyDatabase.html#enumAttributes
     */
    interface PropertyDatabase {
      /**
       * Iterates over all properties for a given database id and invokes the supplied callback function.
       */
      enumObjectProperties: { dbId: number, cb: Function };
      /**
       * Given an object ID, returns the corresponding value IDs for the given list of attribute Ids.
       * Takes into account instance_of inheritance of properties.
       */
      getPropertiesSubsetWithInheritance: { dbId: number, desiredAttrIds: Object, dstValIds: Object };
      /**
       * Obtains the number of database ids (dbIds) available.
       * These ids range betwee 1 (inclusive) up to getObjectCount() (exclusive).
       */
      getObjectCount(): number;
      /**
       * Obtains the actual value of a property.
       * @param attrId The attribute id
       * @param valId The value id
       * @param integerHint If true the return value will be casted to integer.
       */
      getAttrValue(attrId: number, valId: number, integerHint?: boolean): any;
      /**
       * Obtains all properties for a given database id.
       * @param dbId 
       * @param propFilter ["parent"]这样与原来没有时区别在于：属性中只有名字为"parent"的属性
       * @param ignoreHidden 
       * @param propIgnored 
       */
      getObjectProperties(dbId: number, propFilter?: string[], ignoreHidden?: boolean, propIgnored?: string[])
        : {
          name: object,
          dbId: object,
          properties: Array<{
            attributeName: string,
            displayCategory: string,
            displayName: string,
            displayValue: string,
            hidden: any,
            precision: any,
            type: any,
            units: any,
            [k: string]: any
          }>,
          externalId: object
        };
      /**
       * Obtains a map between each database id (dbId) and their corresponding external-id.
       * The external-id is the identifier used by the source file.
       * Example: A translated Revit file has a wall with dbId=1, but in Revit (desktop application) the identifier of that wall is "Wall-06-some-guid-here".
       * @param extIdFilter Limits the result to only contain the ids in this array.
       * @returns map from dbId into external-id.
       */
      getExternalIdMapping(extIdFilter?: number[]): object;
      /**
       * Given a text string, returns an array of individual words separated by white spaces.
       * Will preserve white spacing within double quotes.
       */
      getSearchTerms(params?: any): any;
      /**
       * Searches the property database for a string.
       * @param params 
       */
      bruteForceSearch(params?: any): any[];
      /**
       * Given a property name, it returns an array of ids that contain it.
       * @param name 
       */
      bruteForceFind(name: any): any[];
      /**
       * Specialized function that returns:
       * {
       * 'layer-name-1': [id1, id2, ..., idN],
       * 'layer-name-2': [idX, idY, ..., idZ],
       * ...
       * }
       */
      getLayerToNodeIdMapping(): any;
      /**
       * Unpacks an attribute value into all available components.
       * @param attrId 	The attribute id.
       */
      getAttributeDef(attrId: number): object;
      /**
       * Invokes a callback function for each attribute-id in the model.
       */
      enumAttributes(cb: (attrId: number, attrDef: { name: string }, attrRaw: any) => void): void;
      /**
       * Iterates over the property database and finds all layers.
       */
      findLayers(): object;
      /**
       * Iterates over all database ids and invokes a callback function.
       * @param cb 
       * @param fromId 
       * @param toId 
       */
      enumObjects(cb: Function, fromId: number, toId: number): any;
      /**
       * Checks whether an attirbute is hidden or not.
       * @param attrId 
       */
      attributeHidden(attrId: number): boolean;
    }

    interface PropertyResult {
      dbId: number;
      externalId?: string;
      name?: string;
      properties: Property[];
    }

    interface Property {
      attributeName: string;
      displayCategory: string;
      displayName: string;
      displayValue: string;
      precision: number;
      hidden: boolean;
      type: number;
      units: string;
    }

    class Navigation {
      dollyFromPoint(distance: number, point: THREE.Vector3): void;
      fitBounds(immediate: boolean, bounds: THREE.Box3): any;
      getAlignedUpVector(): THREE.Vector3;
      /**
       * 获取当前摄像机 the current camera object.
       * 对摄像机进行操作时需要
       * var tmpCam = this.viewer.navigation.getCamera();
        this._savedGlobalCamera = tmpCam.clone();
        this._savedGlobalCamera.target = tmpCam.target.clone();
        this.viewer.applyCamera(<any>this._savedGlobalCamera, true);
       */
      getCamera(): THREE.Camera & { target: THREE.Vector3, dirty: boolean };
      /**
       * Set or unset the current camera used for navigation. Normally set via the constructor. The camera should be of type Autodesk.Viewing.UnifiedCamera.
       * @param camera the current camera object.
       */
      setCamera(camera: Sippreep.Viewing.UnifiedCamera): void;
      getCameraRightVector(worldAligned: boolean): THREE.Vector3;
      getCameraUpVector(): THREE.Vector3;
      setCameraUpVector(up: THREE.Vector): void;
      /**
       * 获取当前相机视向量. 该向量没有被单位化，它的长度是相机和视点的距离
       * @returns the current camera view vector in world space.
       */
      getEyeVector(): THREE.Vector3;
      /**
       * @returns the minimum allowed vertical field of view in degrees.
       */
      getFovMin(): number;
      /**
       * @returns the maximum allowed vertical field of view in degrees.
       */
      getFovMax(): number;
      getIs2D(): boolean;
      /**
       * @returns the world space position of the pivot point for orbit navigation.
       */
      getPivotPoint(): THREE.Vector3;
      /**
       * Sets the Vector3 world space position of the pivot point for orbit navigation.
       * @param pivot the new pivot position.
       */
      setPivotPoint(pivot: THREE.Vector3): void;
      getPivotSetFlag(): boolean;
      getUsePivotAlways(): boolean;
      setUsePivotAlways(value: boolean): any;
      /**
       * 获取相机的世界坐标
       * @returns 	the world space position of the camera.
       */
      getPosition(): THREE.Vector3;
      /**
       * 设置相机的世界坐标
       * @param pos the new camera position.
       */
      setPosition(pos: THREE.Vector3): void;
      getReverseZoomDirection(): boolean;
      setReverseZoomDirection(state: boolean): void;
      setOrbitPastWorldPoles(value: boolean): any;
      /**
       * 相机正在看向的世界坐标
       */
      getTarget(): THREE.Vector3;
      /**
       * 设置一个相机看向的世界坐标Sets the Vector3 world space position towards which the camera should be pointing.
       * @param target the new camera look at point.
       */
      setTarget(target: THREE.Vector3): void;
      /**
       * Get the current canvas viewport in screen coordinates.
       * @returns with properties left, top, width, height.
       */
      getScreenViewport(): ClientRect;
      /**
       * Set the current canvas viewport in screen coordinates. Invoked internally on canvas resize.
       * @param viewport Rectangle with properties left, top, width, height.
       */
      setScreenViewport(viewport: ClientRect): void;
      /**
       * Sets the cameras position and view direction.
       * @param position the new position for the camera in world space.
       * @param target the point in world space that the camera should look towards.
       */
      setView(position: THREE.Vector3, target: THREE.Vector3): void;
      setUseLeftHandedInput(value: boolean): any;
      setZoomTowardsPivot(value: boolean): any;
      /**
       * 相机上与世界上对齐
       */
      orientCameraUp(): void;
      /**
       * Get a vector from the camera location to the center of the input bounding box.
       * @param bounds Bounding box.
       * @returns The vector from the camera location to the center of the input bounds.
       */
      getEyeToCenterOfBoundsVec(bounds: THREE.Box3): THREE.Vector3;
      /**
       * Limits zoom in to show 1/factor-th of the entire 2D page. Applies only on 2D vectorized models.
       * @param factor 
       */
      setZoomInLimitFactor(factor: number): void;
      /**
       * @returns 	the current limit when zooming into 2D vectorized models.
       */
      getZoomInLimitFactor(): number;
      /**
       * Limits zoom out to a multiplier of the model’s bounding box dimensions. Applies to 2D and 3D models.
       */
      setZoomOutLimitFactor(factor: number): void;
      /**
       * @returns 	the current limit when zooming out 2D and 3D models.
       */
      getZoomOutLimitFactor(): number;
      /**
       * 某点是否可见
       * @param point The point in world coordinates.
       * @returns 在相机视锥内True
       */
      isPointVisible(point: THREE.Vector3): boolean;
      /**
       * Set the current vertical field of view.
       * @param fov the new field of view in degrees (value is clamped to the minimum and maximum field of view values).
       * @param adjustPosition If true, the camera position will be modified to keep either the world space area of the view at the pivot point unchanged (if it is set and visible) or the world space area of view at the camera look at point unchanged.
       */
      setVerticalFov(fov: number, adjustPosition: boolean): void;
      /**
       * 在单点上旋转
       * @param point 旋转点
       * @param angle 旋转弧度
       * @param pivot 旋转轴
       * @param viewVec 前向量
       */
      applyRotation(point: THREE.Vector3, angle: THREE.Vector3, pivot: THREE.Vector3, viewVec: THREE.Vector3): void;
      /**
       * Computes a signed angle between two vectors
       * @param v1 
       * @param V2 
       * @param viewVec 前向量
       */
      getSignedAngle(v1: THREE.Vector3, V2: THREE.Vector3, viewVec: THREE.Vector3): number;
      /**
       * Compute camera position and look at point which will fit the given bounding box in the view frustum at the given field of view angle.
       * @param oldpos existing camera position
       * @param oldcoi existing camera look at point
       * @param fov field of view (in degrees) to use for fit calculation in degrees
       * @param bounds bounding box to fit
       * @param aspect optional aspect ratio of window, horizontal/vertical
       * @returns Object with properties “position” and “target”.
       */
      computeFit(oldpos: THREE.Vector3, oldcoi: THREE.Vector3, fov: number, bounds: THREE.Box3, aspect: number): object;
      /**
       * Compute a vector which is orthogonal to the given view and aligned with the world up direction.
       * @param pos view position
       * @param coi center of interest (view look at point)
       * @returns up direction orthogonal to the given view
       */
      computeOrthogonalUp(pos: THREE.Vector3, coi: THREE.Vector3): THREE.Vector3;
      /**
       * Causes the current camera position to be changed in order to fit the given bounds into the current view frustum.
       * @param immediate if false the camera position will animate to the new location.
       * @param bounds bounding box to fit
       * @param reorient if true the camera up direction will be reoriented with the world up.
       */
      fitBounds(immediate: boolean, bounds: THREE.Box3, reorient: boolean): object;
      /**
       * Update the current camera projection matrix and orient the camera to the current look at point. Invoked internally prior to rendering a new frame with the current camera.
       */
      updateCamera(): void;
      /**
       * Applies zooming and panning restrictions when viewing 2D models. Invoke without parameters to clear any previous setting.
       * @param viewRegion 	in world space. If specified, navigation is restricted so that this region always spans >= half of the screen extent in x and y.
       * @param maxPixelPerUnit Restrict zoom-In, so that a single unit in world-space never exceeds maxPixelPerUnit on screen.
       */
      setConstraints2D(viewRegion: THREE.Box3, maxPixelPerUnit: number): void;
    }

    interface Properties {
      type: string;
      role: string;
    }

    class ToolController {
      /**
       * This method registers an event handling tool with the controller. This makes the tool available for activation and deactivation. Tools are registered under one or more names which must be provided via their “getNames” method. The tools “getNames” method must return an array of one or more names. Typically a tool will only have one name but if it wishes to operate in different modes it can use different names to activate the modes. Registered tools have the properties named “utilities” and “controller” added to them which refer to the ViewingUtilities object and this controller respectively. Tools may not use the name “default” which is reserved.
       * @param tool The tool to be registered.
       */
      registerTool(tool: any): boolean;
      /**
       * This method deregisters an event handling tool with the controller afterwhich it will no longer be available for activation and deactivation. All names that the tool is registered under will be deregistered. If any tool is active at the time of deregistration will first be deactivated and it’s “deactivate” method will be called.
       * @param tool The tool to be deregistered.
       */
      deregisterTool(tool: any): boolean;
      /**
       * This method returns the tool registered under the given name.
       * @param name The tool name to look up.
       * @returns The tool registered under the given name or undefined if not found.
       */
      getActiveToolName(): string;
      /**
       * This method returns the name of the topmost tool on the tool stack. If no tools are active the name of the default tool is returned (which is “default”).
       */
      getActiveTool(): string;
      /**
       * Sorts the toolStack according to the tools’ priority. Useful when a tool’s priority gets changed after activation.
       */
      rearrangeByPriorities(): void;
      /**
       * Activates the tool registered under the given name. 
       * Activation implies pushing the tool on a stack of “active” tools, 
       * each of which (starting from the top of the stack) is given the opportunity to handle incoming events. 
       * Tools may “consume” events by returning true from their event handling methods, 
       * or they may allow events to be passed down to the next tool on the stack by returning false from the handling methods. 
       * Upon activation the tools “activate” method is called with the name under which it has been activated. 
       * Activation is not allowed while the controller is in a “locked” state (see the methods “setIsLocked” and “getIsLocked”). 
       * Tools must be registered prior to activation (see the methods “registerTool” and “deregisterTool”). 
       * Each tool has its own priority property (default 0), such that a tool with higher priority will get events first.
       * @param name The name of the tool to be activated.
       * @returns True if activation was successful.
       */
      activateTool(name: string): boolean;
      /**
       * The first tool found on the active stack with the given name is removed and its “deactivate” method is called. 
       * Once deactivated the tool will no longer receive events via its handler methods. 
       * Deactivation is not allowed while the controller is in a “locked” state (see the methods “setIsLocked” and “getIsLocked”).
       * @param name 
       */
      deactivateTool(name: string): boolean;
      /**
       * Obtain a list of all the currently registered tool names.
       */
      getToolNames(): string[];
      getTool(name: string): object;
      /**
       * Set the tool which will be requested to handle events if no other active tool handles them.
       * @param tool 
       */
      setDefaultTool(tool: object): void;
      /**
       * Get the tool which handle events if no other active tool handles them.
       */
      getDefaultTool(): object;
      /**
       * Set the controller into a locked or unlocked state. 
       * While locked, tool activation and deactivation is not allowed. 
       * Locking the controller is sometimes necessary to force an interaction to remain active until it is fully completed.
       * @param state 
       */
      setIsLocked(state: boolean): boolean;
      /**
       * Get the current state of the controller lock.
       */
      getIsLocked(): boolean;
      /**
       * Whether mouse scroll wheel (and/or two-finger vertical swipe) will trigger a camera zoom operation.
       * @param isEnabled 
       */
      setMouseWheelInputEnabled(isEnabled: boolean): void;
    }

    interface ToolInterface {
      getCursor?(): string;
      /**
       * This is an optional convenience method to obtain the first name of this tool.
       */
      getName(): string;
      /**
       * This method should return an array containing the names of all tools implemented by this class. Often this would be a single name but it is possible to support multiple interactions with a single tool. When this tool is registered with the ToolController each name gets registered as an available tool.
       */
      getNames(): string[];
      /**
       * This method is called by Autodesk.Viewing.ToolController#registerTool. Use this for initialization.
       */
      register(): void;
      /**
       * This method is called by Autodesk.Viewing.ToolController#deregisterTool. Use this to clean up your tool.
       */
      deregister(): void;
      /**
       * The activate method is called by the ToolController when it adds this tool to the list of those to receive event handling calls. Once activated, a tool’s “handle*” methods may be called if no other higher priority tool handles the given event. Each active tool’s “update” method also gets called once during each redraw loop.
       * @param name The name under which the tool has been activated.
       * @param viewerApi Viewer instance.
       */
      activate(name: string, viewerApi?: GuiViewer3D): void;
      /**
       * The deactivate method is called by the ToolController when it removes this tool from the list of those to receive event handling calls. Once deactivated, a tool’s “handle*” methods and “update” method will no longer be called.
       * @param name The name under which the tool has been deactivated.
       */
      deactivate(name: string): void;
      /**
       * The update method is called by the ToolController once per frame and provides each tool with the oportunity to make modifications to the scene or the view.
       * @returns A state value indicating whether the tool has modified the view or the sceneand a full refresh is required.
       */
      update(): boolean;
      /**
       * This method is called when a single mouse button click occurs.
       * @param event The event object that triggered this call.
       * @param button The button number that was clicked (0, 1, 2 for Left, Middle, Right respectively).Note that the button parameter value may be different that the button value indicated in the eventobject due to button re-mapping preferences that may be applied. This value should be respectedover the value in the event object.
       * @returns [True] if this tool wishes to consume the event and [false] to continue to passthe event to lower priority active tools.
       */
      handleSingleClick?(event: MouseEvent, button: number): boolean;
      handleDoubleClick?(event: MouseEvent, button: number): boolean;
      handleSingleTap?(event: Event): boolean;
      handleDoubleTap?(event: Event): boolean;
      handleKeyDown?(event: KeyboardEvent, keyCode: number): boolean;
      handleKeyUp?(event: KeyboardEvent, keyCode: number): boolean;
      handleWheelInput?(delta: number): boolean;
      handleButtonDown?(event: MouseEvent, button: number): boolean;
      handleButtonUp?(event: MouseEvent, button: number): boolean;
      handleMouseMove?(event: MouseEvent): boolean;
      handleGesture?(event: Event): boolean;
      /**
       * This method is called when the canvas area loses focus.
       * @param event The event object that triggered this call.
       */
      handleBlur?(event: Event): boolean;
      /**
       * This method is called on every active tool whenever the screen area changes. The new canvas area can be obtained from the Navigation interface via the getScreenViewport method.
       */
      handleResize?(): void;
      /**
       * This method should return the priority of the tool inside the tool stack. A tool with higher priority will get events first.
       */
      //getPriority(): number;
    }

    class UnifiedCamera extends THREE.Camera {
      isPerspective: boolean;
    }

    interface ContextMenuCallbackStatus {
      hasHidden: boolean;
      hasSelected: boolean;
      hasVisible: boolean;
      numSelected: number;
    }

    interface ContextMenuItem {
      target: () => void;
      title: string;
    }

    class ScreenMode {
    }

    abstract class ScreenModeDelegate {
      constructor(viewer: Viewer3D);

      doScreenModeChange(oldMode: ScreenMode, newMode: ScreenMode): void;
      fullscreenEventListener(): void;
      getEscapeMode(): ScreenMode | undefined;
      getMode(): ScreenMode;
      getNextMode(): ScreenMode | undefined;
      isModeSupported(mode: ScreenMode): boolean;
      onScreenModeChanged(oldMode: ScreenMode, newMode: ScreenMode): void;
      setMode(mode: ScreenMode): boolean;
      uninitialize(): void;
    }

    class AppScreenModeDelegate extends ScreenModeDelegate {
      constructor(viewer: Viewer3D);
    }

    class NullScreenModeDelegate extends ScreenModeDelegate {
      constructor(viewer: Viewer3D);
    }
    class ViewerStateFilter {
      cutplanes?: boolean;
      objectSet?: boolean | Map<string, boolean>;
      renderOptions?: boolean | Map<string, boolean>;
      seedURN?: boolean;
      viewport?: boolean | Map<string, boolean>
    }
    class ViewerStateData {
      cutplanes: number[][];
      objectSet: ViewerStateObjectSetData[];
      renderOptions: {
        ambientOcclusion: { enabled: boolean, intensity: number, radius: number };
        appearance: { ambientShadow: boolean, antiAliasing: boolean, displayLines: boolean, ghostHidden: boolean, progressiveDisplay: boolean, swapBlackAndWhite: boolean };
        environment: string;
        toneMap: { exposure: number, lightMultiplier: number, method: number };
      };
      seedURN: string;
      viewport: {
        aspectRatio: number, distanceToOrbit: number, eye: number[], fieldOfView: number, isOrthographic: boolean
        , name: string, orthographicHeight: number, pivotPoint: number[], projection: string, target: number[], up: number[], worldUpVector: number[]
      }
    }
    class ViewerStateObjectSetData {
      explodeScale: number;
      hidden: number[];
      id: number[];
      idType: string;
      isolated: number[]
    }

    class Viewer3D {
      autocam: any;
      constructor(container: HTMLElement, config?: Viewer3DConfig);

      canvas: HTMLCanvasElement;
      container: Element;
      navigation: Navigation;
      impl: Private.Viewer3DImpl;
      model: Model;
      /**
       * Need to keep track of viewers in document so we know when it is safeto call clearPropertyWorkerCache()
       */
      ViewerCount: any;
      /**
       * Default values passed into #setCanvasClickBehavior specifying how the viewer canvaswill react to user input as well as other 3d-canvas related options.
       */
      kDefaultCanvasConfig: any;
      /**
       * 在Viewer3D中函数有四个参数url, options, onSuccessCallback, onErrorCallback
       * @param url 
       * @param onSuccesfullCallback 
       * @param onErrorCallback 
       */
      start(url: string, onSuccesfullCallback?: () => void, onErrorCallback?: (errorCode: number, errorMessage: string, statusCode: number, statusText: string) => void): any;
      /**
       * Initializes the viewer and loads any extensions specified in the constructor's
       * config parameter. If the optional parameters are specified, the start() function will
       * use an optimized initialization sequence that results in faster model load.
       * The parameters are the same as the ones for Viewer3D.loadModel and you do not need to call loadModel
       * subsequently if the model is loaded via the call to start().       
       * @param {Document} avDocument - The Document instance holding the current derivative manifest
       * @param {BubbleNode} [manifestNode] - The manifest node to load model for.
       * @param {Object} [options] - Extra initialization options to override the defaults. Normally not needed.
       * @returns {Promise} - Resolves on success, rejects on any kind of initialization failure.
       */
      startWithDocumentNode(avDocument: Document, manifestNode: any, options: object): Promise<void>;
      registerUniversalHotkeys(): void;
      createControls(): void;
      initialize(): any;
      setUp(config: any): void;
      tearDown(): void;
      run(): void;
      localize(): void;
      uninitialize(): void;
      finish(): void;
      setLoadHeuristics(options: object): void;
      trackADPSettingsOptions(): void;
      trackADPExtensionsLoaded(): void;
      activateDefaultNavigationTools(is2d: boolean): void;
      registerDimensionSpecificHotkeys(is2d: boolean): void;
      onModelAdded(model: Model, preserveTools: boolean): void;
      loadModel(url: string, options: object, onSuccessCallback?: (model: Model) => void, onErrorCallback?: (errorCode: number, errorMessage: string, errorArgs: any) => void): any;
      unloadModel(model: Model): void;
      loadDocumentNode(avDocument: Document, manifestNode: any/*BubbleNode*/, options: object): Promise<Model>;
      unloadDocumentNode(manifestNode: any/*BubbleNode*/): boolean;
      getDimensions(): Private.Dimensions;
      resize(): void;
      getHotkeyManager(): any/*HotkeyManager*/; //源码中搜索function HotkeyManager() {
      getCamera(): THREE.Camera;
      /**
       * 获取viewer当前状态
       * @param filter 
       */
      getState(filter?: ViewerStateFilter): ViewerStateData;
      /**
       * 重置viewer状态为viewerState
       * @param viewerState 
       * @param filter 
       * @param immediate 
       */
      restoreState(viewerState: any, filter?: ViewerStateFilter, immediate?: boolean): boolean;
      setView(viewNode: any/*BubbleNode*/, options: object): boolean;
      setViewFromArray(params: number[]): void;
      getCameraFromViewArray(paramas: number[]): THREE.Camera;
      getViewArrayFromCamera(): number[];
      setViewFromViewBox(viewbox: number[], name: string, skipTransition: boolean): void;
      activateLayerState(name: string): void;
      getLayerStates(): any[];
      setViewFromFile(model: Model): void;
      getProperties(dbId: number, successCallback?: (r: PropertyResult) => void, errorCallback?: (errorCode: number, errorMessage: string, statusCode: number, statusText: string) => void): any;
      /**
       * 怀疑是viewer.model.getInstanceTree()的异步版本
       * Asyncronous operation that gets a reference to the object tree.
       * @param onSuccessCallback 
       * @param onErrorCallback 
       */
      getObjectTree(onSuccessCallback?: (objTree: InstanceTree) => void, onErrorCallback?: (errorCode: number, errorMessage: string, statusCode: number, statusText: string) => void): any;
      setCanvasClickBehavior(config: any): void;
      /**
       * 顾名思义 似乎只在模型树的节点中搜索
       * @param text 
       * @param onSuccess 有一个number[]的入参
       * @param onError 
       * @param attributeNames 
       */
      search(text: string, onSuccess: (res: number[]) => void, onError: (err: null | string) => void, attributeNames: string[]): void;
      getHiddenNodes(): number[];
      getIsolatedNodes(): number[];
      isolate(node: number[] | number, model?: Model): void;
      /**
       * 1-255 rgb设置背景颜色，上下渐变
       * @param red 上部颜色
       * @param green 上部颜色
       * @param blue 上部颜色
       * @param red2 下部颜色
       * @param green2 下部颜色
       * @param blue2 下部颜色
       */
      setBackgroundColor(red: number, green: number, blue: number, red2: number, green2: number, blue2: number): void;
      toggleSelect(dbId: number, model: Model, selectionType: number): void;
      select(dbIds: number[] | number, model?: Model, selectionType?: number): void;
      clearSelection(): void;
      getSelectionVisibility(): any;
      getSelectionCount(): number;
      setSelectionMode(mode: number): void;
      getSelection(): number[];
      getAggregateSelection(callback?: (model: Model, dbId: number) => void): any[];
      getAggregateIsolation(): any[];
      getAggregateHiddenNodes(): any[];
      hide(node: number | number[]): void;
      show(node: number | number[]): void;
      showAll(): void;
      toggleVisibility(dbId: number, model?: Model): void;
      areAllVisible(): boolean;
      isNodeVisible(node: number, model?: Model): boolean;
      /**
       * 爆炸模型效果
       * @param scale 0-1
       */
      explode(scale: number): void;
      /**
       * 获取当前爆炸系数，没有爆炸时候是0
       */
      getExplodeScale(): number;
      setQualityLevel(useSAO: boolean, useFXAA: boolean): void;
      setGhosting(value: boolean): void;
      setGroundShadow(value: boolean): void;
      setGroundReflection(value: boolean): void;
      setEnvMapBackground(value: boolean): void;
      setFirstPersonToolPopup(value: boolean): void;
      getFirstPersonToolPopup(): boolean;
      setBimWalkToolPopup(value: boolean): void;
      getBimWalkToolPopup(): boolean;
      setProgressiveRendering(value: boolean): void;
      setGrayscale(value: boolean): void;
      setSwapBlackAndWhite(value: boolean): void;
      setOptimizeNavigation(value: boolean): void;
      setNavigationLock(value: boolean): void;
      getNavigationLock(): boolean;
      setNavigationLockSettings(settings: any): void;
      getNavigationLockSettings(): any;
      setActiveNavigationTool(toolName?: string): void;
      getActiveNavigationTool(): string;
      setDefaultNavigationTool(name: string): void;
      getDefaultNavigationTool(): string;
      getFOV(): number;
      setFOV(degrees: number): void;
      getFocalLength(): number;
      setFocalLength(mm: number): void;
      hideLines(hide: boolean): void;
      hidePoints(hide: boolean): void;
      setDisplayEdges(show: boolean): void;
      /**
       * 设置摄像机的属性
       * @param camera 
       * @param fit 是否调整模型大小使之合适相机视野
       */
      applyCamera(camera: THREE.Camera, fit: boolean): void;
      fitToView(ids?: null | number[], model?: Model, immediate?: boolean): void;
      setClickConfig(what: string, where: string, newAction: string[]): boolean;
      /**
       * 点击后的事件？ 
       * @param what 点击形式 "click" "clickAlt" "clickCtrl" "clickShift" "clickCtrlShift"
       * @param where 是否点在了模型上 "onObject" "offObject"
       * 返回类似于 ["selectOnly"]
       */
      getClickConfig(what: string, where: string): string[];
      setClickToSetCOI(state: boolean, updatePrefs?: boolean): void;
      initSettings(): void;
      setLightPreset(preset: number): void;
      setUsePivotAlways(value: boolean): void;
      setReverseZoomDirection(value: boolean): void;
      setReverseHorizontalLookDirection(value: boolean): void;
      setReverseVerticalLookDirection(value: boolean): void;
      setZoomTowardsPivot(value: boolean): void;
      setOrbitPastWorldPoles(value: boolean): void;
      setUseLeftHandedInput(value: boolean): void;
      setLayerVisible(nodes: any[], visible: boolean, isolate?: boolean): void;
      isLayerVisible(node: any): boolean;
      anyLayerHidden(): boolean;
      allLayersHidden(): boolean;
      setGroundShadowColor(color: THREE.Color): void;
      setGroundShadowAlpha(alpha: number): void;
      setGroundReflectionColor(color: THREE.Color): void;
      setGroundReflectionAlpha(alpha: number): void;
      getCutPlanes(): THREE.Vector4[];
      setCutPlanes(planes: THREE.Vector4[]): void;
      /**
       * 
       * @param w 截屏宽
       * @param h 截屏高
       * @param cb 截屏生成完毕的回调 带有参数url，使用
            window.open(url);
            查看
       */
      getScreenShot(w: number, h: number, cb: any): void;
      setContextMenu(menu: any): void;
      setDefaultContextMenu(): boolean;
      triggerContextMenu(event: any): boolean;
      triggerSelectionChanged(dbId: number): void;
      triggerDoubleTapCallback(event: any): void;
      triggerSingleTapCallback(event: any): void;
      triggerSwipeCallback(event: any): void;
      initContextMenu(): void;
      registerContextMenuCallback(id: string, callback: (menu: any, status: any) => void): void;
      unregisterContextMenuCallback(id: string): boolean;
      runContextMenuCallbacks(menu: any[], status: any): void;
      joinLiveReview(sessionId: string): void;
      leaveLiveReview(): void;
      setModelUnits(modelUnits: any): void;
      worldToClient(pt: THREE.Vector3): THREE.Vector3;
      clientToWorld(clientX: number, clientY: number, ignoreTransparent: boolean): object;
      modelHasTopology(): boolean;
      setSelectionColor(col: THREE.Color, selectionType: number): void;
      set2dSelectionColor(col: THREE.Color, opacity: number): void;
      setTheme(name: string): void;
      setThemingColor(dbId: number, color: THREE.Vector4, model?: Model, recursive?: boolean): void;
      clearThemingColors(model: Model): void;
      /**
       * 隐藏指定的模型
       * @param model 
       */
      hideModel(model: number | Model): boolean;
      /**
       * 显示指定的模型
       * @param model 
       * @param preserveTools 
       */
      showModel(model: number | Model, preserveTools: boolean): boolean;
      getVisibleModels(): Model[];
      restoreDefaultSettings(): void;
      disableHighlight(disable: boolean): void;
      disableSelection(disable: boolean): void;
      isHighlightDisabled(): boolean;
      isHighlightPaused(): boolean;
      isHighlightActive(): boolean;
      isSelectionDisabled(): boolean;
      /**
       * 加载插件 with the given id and options. 只内部使用.
       * @param extensionId 
       * @param options 
       */
      loadExtension(extensionId: string, options?: object): Promise<Extension>;
      /**
       * Returns the loaded extension.
       * @param extensionId 
       * @param callback 
       */
      getExtension(extensionId: string, callback?: (ext: Extension) => void): Extension;
      /**
       * Unloads the extension with the given id. For internal use only.
       * @param extensionId 
       */
      unloadExtension(extensionId: string): boolean;
      loadExtensionAsync(extensionId: string, url: string, options?: object): Promise<Extension>;
      forEachExtension(callback: (ext: Extension) => void): void;
      activateExtension(extensionId: string, mode: string): boolean;
      /**
       * Dectivates the extension based on the extensionID specified.
       * @param extensionId 
       */
      deactivateExtension(extensionId: string): boolean;
      /**
       * Check if the extension is active or not by passing the extensionID.
       * @param extensionId 
       * @param mode 
       */
      isExtensionActive(extensionId: string, mode: string): boolean;
      /**
       * Check if the extension is loaded or not by passing the extensionID.
       * @param extensionId 
       */
      isExtensionLoaded(extensionId: string): boolean;
      /**
       * Get a list of all the extensions that are currently loaded.
       */
      getLoadedExtensions(): string[];
      /**
       * Get a list of all the modes that are available for the given extensionID.
       * @param extensionId 
       */
      getExtensionModes(extensionId: string): string[];
      reorderElements(element: object): void;
      appendOrderedElementToViewer(layerOrderId: string): void;
      hitTest(x: number, y: number, ignoreTransparent: boolean): Private.HitTestResult;
      refresh(clear: boolean): void;
      addEventListener(type: string, callback: (event: any) => void): any;
      hasEventListener(type: string, callback: (event: any) => void): any;
      removeEventListener(type: string, callback: (event: any) => void): any;
      dispatchEvent(event: object): void;
    }

    class GuiViewer3D extends Viewer3D {
      toolController: ToolController;
      autocam: any;
      progressbar: any;
      utilities: ViewingUtilities;
      prefs: any;
      dockingPanels: any;
      overlays: OverlayManager;
      running: boolean;

      hasGeometry(): boolean;
      addPanel(panel: UI.DockingPanel): boolean;
      createDebugSubmenu(button: UI.Button): void;
      createViewerOptionsMenu(model: Model): void;
      createUI(model: Model): void;
      onFullScreenModeEvent(event: object): void;
      onProgressBarUpdate(event: object): void;
      addOptionToggle(parent: Element, tooltip: string, initialState: any, onchange: (checked: boolean) => void, saveKey: boolean): void;
      addOptionList(parent: Element, label: string, optionList: string[], initialIndex: number, onchange: (index: number) => void, saveKey: boolean): void;
      showViewer3dOptions(show: boolean): void;
      showRenderingOptions(show: boolean): void;
      showLayerManager(show: boolean): void;
      initHotkeys(model: Model): void;
      setModelStructurePanel(modelStructurePanel: any/*Autodesk.Viewing.UI.ModelStructurePanel*/): void;
      setLayersPanel(layersPanel: any/*Autodesk.Viewing.UI.LayersPanel*/): void;
      setPropertyPanel(propertyPanel: any/*Autodesk.Viewing.UI.PropertyPanel*/): void;
      getPropertyPanel(createDefault?: boolean): any/*Autodesk.Viewing.UI.PropertyPanel*/;
      setSettingsPanel(settingsPanel: any/*Autodesk.Viewing.UI.SettingsPanel*/): void;
      getSettingsPanel(createDefault?: boolean, model?: Model): any/*Autodesk.Viewing.UI.SettingsPanel*/;
      createSettingsPanel(model: Model): void;
      initModelTools(model: Model): void;
      setPropertiesOnSelect(onSelect: boolean): void;
      addDivider(parent: Element): void;
      initDebugTools(): void;
      removeDebugTools(): void;
      initModelStats(): void;
      initEscapeHandlers(): void;
      getToolbar(create: boolean): UI.ToolBar;
      showModelStructurePanel(show: boolean): void;
      onPanelVisible(panel: UI.DockingPanel): void;
      updateFullscreenButton(mode: any): void;
      removePanel(panel: UI.DockingPanel): boolean;
      resizePanels(options: object): void;
      initExplodeSlider(): void;
      initInspectTools(): void;
      initModality(): void;
      updateToolbarButtons(width: number, height: number): void;
    }

    class OverlayManager {
      addScene(name: string): boolean;
      removeScene(name: string): void;
      clearScene(name: string): void;
      hasScene(name: string): boolean;
      addMesh(mesh: THREE.Mesh | THREE.Mesh[], name: string): boolean;
      removeMesh(mesh: THREE.Mesh | THREE.Mesh[], name: string): boolean;
      hasMesh(mesh: THREE.Mesh, name: string): boolean;
    }

    class ViewingUtilities {
      /**
       * This method performs a hit test with the current model using a ray cast from the given screen coordinates.
       * @param x The normalized screen x coordinate in [0, 1].
       * @param y 
       */
      getHitPoint(x: number, y: number): THREE.Vector3;
      /**
       * Return the bounding box of the current model or model selection.
       * @param ignoreSelection If true the current selection is ignored and the model bounds is returned.
       */
      getBoundingBox(ignoreSelection?: boolean): THREE.Box3;
      /**
       * This method triggers a camera view transition as specified by the parameters.
       * @param pos 
       * @param coi 
       * @param fov 
       * @param up 
       * @param worldUp 
       * @param reorient 
       * @param pivot 
       */
      transitionView(pos: THREE.Vector3, coi: THREE.Vector3, fov: number, up: THREE.Vector3, worldUp: THREE.Vector3, reorient: boolean, pivot: THREE.Vector3): void;
      /**
       * This method triggers a camera view transition to the registered home view for the current scene.
       */
      goHome(): void;
      /**
       * This method activates the in scene pivot indicator. The pivot is positioned at the current camera’s pivot point.
       * @param fadeIt If true the indicator will be displayed and then fade away after a short period.
       */
      activatePivot(fadeIt: boolean): void;
      /**
       * This method changes the display state of the in scene pivot indicator. If the current scene is 2D this method has no effect.
       * @param state The requested display state for the indicator.
       * @param fadeIt 	If true and “state” is also true, the indicator will be displayedand then fade away after a short period.
       */
      pivotActive(state: boolean, fadeIt: boolean): void;
      /**
       * Invoke this method to refresh the pivot indicator and continue its fading action if required.
       */
      pivotUpdate(): void;
      /**
       * 
       * @param newPivot The world space position of the new pivot point.
       * @param preserveView If false the camera’s view direction will changeto look at the new pivot point. If true the camera’s view will not be changed.
       * @param isset The new state of the pivot set flag.
       */
      setPivotPoint(newPivot: THREE.Vector3, preserveView: boolean, isset: boolean): void;
      /**
       * Save a copy of the current pivot point and pivot set flag.
       * @param name Optional unique name of the saved location.
       */
      savePivot(name: string): void;
      /**
       * Restore the saved copy of the current pivot point and pivot set flag. Once restored the saved value is erased.
       * @param name Optional unique name of the saved location.
       */
      restorePivot(name: string): void;
      /**
       * Allows the caller to save the current pivot and replace it with a new location. If while the temporary pivot is active a new pivot is set via the setPivotPoint method, the saved pivot will be cleared to avoid restoring an out of date pivot location.
       * @param newPivot The new pivot to be assigned or null to clear any previously saved pivot.
       */
      setTemporaryPivot(newPivot: THREE.Vector3): void;
      /**
       * Restore a pivot value that was saved by a call to setTemporary Pivot.
       */
      removeTemporaryPivot(): void;
      /**
       * 更改Pivot指示图形的大小.
       * @param scale Default size value is 1
       */
      setPivotSize(scale: number): void;
      /**
       * 更改Pivot指示图形的颜色和透明度，例如red 100% solid (non-transparent) use setPivotColor(0xFF0000, 1)
       * @param color RBG Hex color.
       * @param opacity Opacity value from 0 (transparent) to 1 (opaque).
       */
      setPivotColor(color: number, opacity: number): void;
      /**
       * Request a camera transition to fit the current model or model selection into the view frustum.
       * @param immediate If true the transition will be immediate,otherwise animated over a short time period.
       */
      fitToView(immediate: boolean): object;
    }

    namespace Extensions {
      class ViewerPropertyPanel extends UI.PropertyPanel {
        constructor(viewer: GuiViewer3D);
        currentNodeIds: object[];
      }
    }

    namespace Private {
      function getScript(scriptName: string): HTMLScriptElement
      function getHtmlTemplate(url: string, callback: (error: string, content: string) => void): void;

      const env: string;

      function formatValueWithUnits(value: number, units: string, type: number, precision: number): string;
      function convertUnits(fromUnits: string, toUnits: string, calibrationFactor: number,
        d: number, type: string): number;
      function calculatePrecision(value: string | number): number;

      interface PreferencesOptions {
        localStorage?: boolean;
        prefix?: string;
      }

      class Preferences {
        constructor(viewer: Viewer3D, options: PreferencesOptions);

        add(name: string, defaultValue: any, tags?: string[] | string): boolean;
        addListeners(name: string, onChangedCallback: () => void, onResetCallback: () => void): void;
        get(): any;
        hasTag(name: string, tag: string): boolean;
        load(defaultValues: object): void;
        remove(name: string, removeFromWebStorage?: boolean): boolean;
        removeListeners(name: string): void;
        reset(tag?: string, include?: boolean): void;
        set(name: string, value: any, notify?: boolean): boolean;
        tag(tag: string, names?: string[] | string): void;
        untag(tag: string, names?: string[] | string): void;
      }

      class ViewerState {
        constructor(viewer: Viewer3D);

        areEqual(viewerStateA: object, viewerStateB: object, filter?: object): boolean;
        getSeedUrn(): string;
        getState(filter?: object): object;
        restoreState(viewerState: object, filter?: object, immediate?: boolean): boolean;
      }

      interface HitTestResult {
        dbId: number;
        face: THREE.Face3;
        fragId: number;
        intersectPoint: THREE.Vector3;
        model: Model;
      }

      interface Dimensions {
        width: number;
        height: number;
      }

      namespace HudMessage {
        function displayMessage(container: Element, messageSpec: {
          msgTitleKey: string,
          msgTitleDefault?: string,
          messageKey: string,
          messageDefaultValue?: string,
          buttonText?: string,
          checkboxChecked?: boolean
        }, closeCallback?: (event: any) => void, buttonCallback?: (event: any) => void, checkboxCallback?: (event: any) => void): void;

        function dismiss(): boolean;
      }

      class Viewer3DImpl {
        constructor(thecanvas: any, theapi: any);

        visibilityManager: VisibilityManager;

        addOverlay(overlayName: string, mesh: any): void;
        clientToViewport(clientX: number, clientY: number): THREE.Vector3;
        createOverlayScene(name: string, materialPre?: THREE.Material, materialPost?: THREE.Material, camera?: any): void;
        hitTest(clientX: number, clientY: number, ignoreTransparent: boolean): HitTestResult;
        hitTestViewport(vpVec: THREE.Vector3, ignoreTransparent: boolean): HitTestResult;
        initialize(needsClear: boolean, needsRender: boolean, overlayDirty: boolean): void;
        invalidate(needsClear: boolean, needsRender?: boolean, overlayDirty?: boolean): void;
        setLightPreset(index: number, force?: boolean): void;
        selector: any;
        model: any;
        scene: THREE.Scene;
        sceneAfter: THREE.Scene;
        viewportToClient(viewportX: number, viewportY: number): THREE.Vector3;
        modelqueue(): any;
        matman(): any;
        getMaterials(): any;
        getScreenShotProgressive(w: number, h: number, onFinished?: () => void, options?: any): any;
        removeOverlayScene(name: string): any;
        removeOverlay(name: string, mesh: any): any;
        getFitBounds(p: boolean): THREE.Box3;
        rayIntersect(ray: THREE.Ray): HitTestResult;

        getRenderProxy(model: Model, fragId: number): any;
        sceneUpdated(param: boolean): void;
        setViewFromCamera(camera: THREE.Camera, skipTransition?: boolean, useExactCamera?: boolean): void;
      }

      class VisibilityManager {
        constructor(viewerImpl: any, model: any);

        getHiddenNodes(): any;
        getInstanceTree(): InstanceTree;
        getIsolatedNodes(): any;
        hide(node: number | object): void;
        isNodeVisible(dbId: number): boolean;
        isolate(node: number | object): void;
        isolateMultiple(nodeList: any[]): void;
        isolateNone(): void;
        setAllVisibility(visible: boolean): void;
        setVisibilityOnNode(node: number | object, visible: boolean): void;
        setNodeOff(node: number | object, isOff: boolean): void;
        show(node: number | object): void;
        toggleVisibility(node: number | object): void;
        updateNodeVisibilityTracking(node: number | object, visible: boolean): void;
      }
    }

    namespace UI {
      interface DockingPanelOptions {
        localizeTitle?: boolean;
        [key: string]: any;
      }

      interface ScrollContainerOptions {
        left: boolean;
        heightAdjustment: number;
        marginTop: number;
        [key: string]: any;
      }

      interface ContentSize {
        height: number;
        width: number;
      }

      interface ResizeOptions {
        maxHeight: number;
        [key: string]: any;
      }

      interface AddPropertyOptions {
        localizeCategory: boolean;
        localizeProperty: boolean;
        [key: string]: any;
      }

      interface ControlOptions {
        collapsible?: boolean;
        [key: string]: any;
      }

      interface AddControlOptions {
        index?: object;
        [key: string]: any;
      }

      interface DisplayCategoryOptions {
        localize?: boolean;
        [key: string]: any;
      }

      interface MenuItem {
        title: string;
        target: () => void | MenuItem[];
      }

      const COLLAPSED_CHANGED = 'Control.VisibilityChanged';
      const VISIBILITY_CHANGED = 'Control.CollapsedChanged';
      const CONTROL_ADDED = 'ControlGroup.ControlAdded';
      const CONTROL_REMOVED = 'ControlGroup.ControlRemoved';
      const SIZE_CHANGED = 'ControlGroup.SizeChanged';

      class DockingPanel {
        constructor(parentContainer: HTMLElement, id: string, title: string, options?: DockingPanelOptions);

        closer: HTMLElement;
        container: HTMLElement;
        content: Node;
        footer: HTMLElement;
        scrollContainer: HTMLElement;
        title: HTMLElement;
        titleLabel: string;

        addEventListener(target: object, eventId: string, callback: () => void): void;
        addVisibilityListener(callback: (state: boolean) => void): void;
        createCloseButton(): HTMLElement;
        createScrollContainer(options: ScrollContainerOptions): void;
        createTitleBar(title: string): HTMLElement;
        getContainerBoundingRect(): ClientRect;
        getContentSize(): ContentSize;
        initialize(): void;
        initializeCloseHandler(closer: HTMLElement): void;
        initializeMoveHandlers(mover: HTMLElement): void;
        isVisible(): boolean;
        onEndMove(event: MouseEvent, endX: number, endY: number): void;
        onMove(event: MouseEvent, currentX: number, currentY: number): void;
        onStartMove(event: MouseEvent, startX: number, startY: number): void;
        onTitleClick(event: Event): void;
        onTitleDoubleClick(event: Event): void;
        removeEventListener(target: object, eventId: string, callback: () => void): boolean;
        resizeToContent(options: ResizeOptions): void;
        setTitle(text: string, options: DockingPanelOptions): void;
        setVisible(show: boolean): void;
        uninitialize(): void;
        visibilityChanged(): void;
      }

      class LayersPanel extends DockingPanel {
        build(): void;
        createNode(node: object, parent: HTMLElement): void;
        getNodeClass(node: object): string;
        getNodeLabel(node: object): string;
        isGroupCollapsed(node: object): boolean;
        isGroupNode(node: object): boolean;
        onClick(node: object, event: Event): void;
        onDoubleClick(node: object, event: Event): void;
        onIconClick(node: object, event: Event): void;
        onImageClick(node: object, event: Event): void;
        onRightClick(node: object, event: Event): void;
        setGroupCollapsed(node: object, collapse: boolean): void;
        setLayerVisible(node: object, collapse: boolean): void;
        shouldInclude(node: object): boolean;
        update(): void;
      }

      class PropertyPanel extends DockingPanel {
        addProperty(name: string, value: string, category: string, options?: AddPropertyOptions): boolean;
        areDefaultPropertiesShown(): void;
        displayCategory(category: object, parent: HTMLElement, options: DisplayCategoryOptions): HTMLElement[];
        displayProperty(property: object, parent: HTMLElement, options: DisplayCategoryOptions): HTMLElement[];
        getCategoryClass(category: object): string;
        getPropertyClass(property: object): string;
        hasProperties(): boolean;
        highlight(text: string, options: object): void;
        isCategoryCollapsed(category: object): boolean;
        onCategoryClick(category: object, event: Event): void;
        onCategoryDoubleClick(category: object, event: Event): void;
        onCategoryIconClick(category: object, event: Event): void;
        onCategoryRightClick(category: object, event: Event): void;
        onPropertyClick(property: object, event: Event): void;
        onPropertyDoubleClick(property: object, event: Event): void;
        onPropertyIconClick(property: object, event: Event): void;
        onPropertyRightClick(property: object, event: Event): void;
        removeAllProperties(): void;
        removeProperty(name: string, value: string, category: string, options?: object): boolean;
        setCategoryCollapsed(category: object, collapsed: boolean): void;
        setProperties(properties: Array<{ displayName: string, displayValue: any }>, options?: object): void;
        showDefaultProperties(): void;
        showNoProperties(): void;
      }

      class SettingsPanel extends DockingPanel {
        /* 20191213 ===========添加=========== */
        /**
         * Resize the tabs, so all tabs have the same width
         */
        resizeTabs(): void;
        /**
         * Gets the id of the selected tab.
         * @returns {string|null} id of the selected tab, or null if none selected. 
         */
        getSelectedTabId(): string | null;
        /**
         * 
         * @param tabId Id of the tab that will contain the button将要把这个label添加到哪个tab下
         * @param name User facing text.
         * @returns {object} the label control
         */
        addLabel(tabId: string, name: string): object;
        /**
         * 
         * @param tabId Id of the tab that will contain the button.
         * @param label User facing text.
         * @returns {string} ID of a new control.
         */
        addButton(tabId: string, label: string): string;
        /**
         * 
         * @param tabId Tab to which to add a new row.
         * @param caption The text associated with the row.
         * @param description 
         * @param options insertAtIndex - index at which to insert a new row
         * @returns {string} ID of a new control.
         */
        addRow(tabId: string, caption: string, description: string, options: object | undefined): string;
        /**
         *
         * @param {string} tabId - Tab to which to add a new slider.
         * @param {string} caption - The text associated with the slider
         * @param {string} description - The description for the slider
         * @param {number} min - Min value of the slider.
         * @param {number} max - Max value of the slider.
         * @param {number} initialValue - Initial value for the slider.
         * @param {function} onchange - Callback that is called when the slider value is changed.
         * @param {object|undefined} options - Additional options:
         * - insertAtIndex - index at which to insert a new slider
         * @returns {string[]} - an array of control ids
         */
        addSliderV2(tabId: string, caption: string, description: string, min: number, max: number, initialValue: number, onchange: Function, options: object | undefined): string[];
        removeButton(buttonId: string | Sippreep.Viewing.UI.Control): boolean;
        /**
  * Resizes panel vertically to wrap around the content.
  * It will always leave some room at the bottom to display the toolbar.
  * @param {HTMLElement} container - parent container of settings panel 
  *
  */
        sizeToContent(container: HTMLElement): void;

        /* 20191213 ===========添加完毕=========== */
        addCheckbox(tabId: string, caption: string, initialState: boolean,
          onchange: () => void, options?: object): string;
        addControl(tabId: string, control: object | HTMLElement, options: object | undefined): string;
        addDropDownMenu(tabId: string, caption: string, items: MenuItem[],
          initialItemIndex: number, onchange: () => void, options: object | undefined): string;
        addSlider(tabId: string, caption: string, min: number, max: number, initialValue: number,
          onchange: () => void, options: object | undefined): string;
        addTab(tabId: string, tabTitle: string, options: object | undefined): boolean;
        getControl(controlId: string): object;
        hasTab(tabId: string): boolean;
        isTabSelected(tabId: string): boolean;
        removeCheckbox(checkboxId: string | Control): boolean;
        removeControl(controlId: string | Control): boolean;
        removeDropdownMenu(dropdownMenuId: string | Control): boolean;
        removeSlider(sliderId: string | Control): boolean;
        removeTab(tabId: string): boolean;
        selectTab(tabId: string): boolean;
        setVisible(show: boolean, skipTransition?: boolean): void;
      }

      class ModelStructurePanel extends DockingPanel {
        addClass(id: string, className: string): boolean;
        getNodeClass(node: object): string;
        getNodeLabel(node: object): string;
        isGroupCollapsed(node: object): boolean;
        isGroupNode(node: object): boolean;
        onClick(node: object, event: Event): void;
        onDoubleClick(node: object, event: Event): void;
        onHover(node: object, event: Event): void;
        onIconClick(node: object, event: Event): void;
        onRightClick(node: object, event: Event): void;
        removeClass(id: string, className: string): boolean;
        setGroupCollapsed(node: object, collapsed: boolean): void;
        setModel(instanceTree: object, modelTitle: string): void;
        setSelection(nodes: Model[]): void;
        shouldInclude(node: Model): boolean;
      }

      class ObjectContextMenu {
        constructor(viewer: Viewer3D);

        buildMenu(event: Event, status: object): MenuItem[];
        hide(): boolean;
        show(event: Event): void;
      }

      class ControlEventArgs {
        VISIBILITY_CHANGED: 'Control.VisibilityChanged';
        COLLAPSED_CHANGED: 'Control.CollapsedChanged';
        ACTIVE_BUTTON_CHANGED: 'RadioButtonGroup.ActiveButtonChanged';
        STATE_CHANGED: 'Button.StateChanged';
        CLICK: 'click';
      }

      class Control {
        constructor(id?: string, options?: ControlOptions);

        Event: ControlEventArgs;
        addClass(cssClass: string): void;
        getDimensions(): object;
        getId(): string;
        getPosition(): object;
        getToolTip(): string;
        isCollapsed(): boolean;
        isCollapsible(): boolean;
        isVisible(): boolean;
        removeClass(cssClass: string): void;
        setCollapsed(collapsed: boolean): boolean;
        setToolTip(toolTipText: string): boolean;
        setVisible(visible: boolean): boolean;

        // Events
        addEventListener(type: string,
          listener?: ViewerEvent,
          options?: boolean | AddEventListenerOptions): void;
        dispatchEvent(evt: Event): boolean;
        removeEventListener(type: string,
          listener?: ViewerEvent,
          options?: boolean | EventListenerOptions): void;
      }

      class ControlGroup extends Control {
        container: HTMLElement;

        addControl(control: Control, options?: AddControlOptions): boolean;
        getControl(controlId: string): Control;
        getControlId(index: number): string;
        getNumberOfControls(): number;
        indexOf(control: string | Control): number;
        removeControl(control: string | Control): boolean;
        setCollapsed(collapsed: boolean): boolean;
      }

      class ToolBar extends ControlGroup {
        constructor(id: string, options?: object);
      }

      class RadioButtonGroup extends ControlGroup {
        constructor(id: string, options?: object);

        Event: ControlEventArgs;

        addControl(control: Control, options: object): boolean;
        getActiveButton(): Button;
        removeControl(control: string | Control): boolean;
      }

      class Button extends Control {
        constructor(id: string, options?: object);

        Event: ControlEventArgs;

        getState(): Button.State;
        onClick: (event: Event) => void;
        onMouseOut: (event: Event) => void;
        onMouseOver: (event: Event) => void;
        setIcon(iconClass: string): void;
        setState(state: Button.State): boolean;
      }

      // NOTE: TypeScript doesn't support enum inside class. This seems to be commonly used workaround.
      namespace Button {
        enum State { ACTIVE, INACTIVE, DISABLED }
      }

      class ComboButton extends Button {
        constructor(id: string, options?: object);

        addControl(): void;
        restoreDefault(): void;
        saveAsDefault(): void;
      }
    }
  }
}
declare function SippreepNamespace(s: string): any
