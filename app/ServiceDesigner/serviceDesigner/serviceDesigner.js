import { objects, geometry, debug, observables, events, } from '../utility';
import {
  emptyModule, createModule, mergeModules, emitEventTo, observeModule, Selection, createEventEmitter,
  createAsyncTasks, createViewport, createGrid, createSelection, mergeObservables,
} from '../editor';
import { createNodes } from './nodes';
import { createLinks } from './links';
import { createComments } from './comments';
import { createLasso } from './lasso';
import { createPanning, createDraggingSelection } from './dragging';
import { createServiceDocument, ServiceDocument, ServiceDocumentSelection, moveItemsAction, removeItemsAction, insertItemsAction } from './serviceDocument';
import { vector } from '../utility/geometry';

const handleOnlyAtTarget = (handler) => (... args) => {
  let [event] = args
  if (event && event.target === event.currentTarget) { // Not to handle focused keystrokes, i.e. moving the caret inside an input
    handler(... args)
  }
}

const createServiceDesignerModule = (application) => {
  let {
    selection, viewport, grid, comments,
    serviceDocument, nodes, onOpenNodeDialog,
  } = application

  let clipboard = observables.of(null)
  let canvas = observables.of(null)
  let moving = observables.of(null)

  let mode = observables.of(emptyModule).denote('editorMode')

  function dismissMode() {
    mode.set(emptyModule)
  }

  let movingAction = observables.switchMap(
    (moving) => moving ? observables.map(
      (ids, serviceDocument) => moving && moveItemsAction(application) (serviceDocument, ids, moving.offset),
      selection.ids,
      serviceDocument.actual,
    ) : observables.of(null),
    moving,
  )

  let draftActions = observables.fromArray([movingAction])

  let removeSelection = (event) => {
    let action = removeItemsAction(serviceDocument.get(), selection.ids.get())
    serviceDocument.applyAction(action)
    selection.reset()
  }

  let copySelection = (event) => {
    let cascades = serviceDocument.cascadesSelector()
    let selectionCascade = objects.flatMap((_, id) => cascades[id]) (selection.ids.get())
    let clipboardContent = ServiceDocumentSelection.select(serviceDocument.get(), selectionCascade)
    clipboard.set(clipboardContent)
  }

  function estimateRectangle(serviceDocument) {
    let points = [
      viewport.state.get().position,
      ... objects.values(serviceDocument.nodes).map((node) => node.position),
      ... objects.values(serviceDocument.comments).map((comment) => comment.position),
    ]
    let point0 = geometry.min(points)
    let point1 = geometry.add(geometry.max(points), geometry.vector(400, 400))
    return geometry.expandRectangle(geometry.vector(20, 20)) (geometry.rectangle(point0, point1))
  }

  let pasteSelection = (event) => {
    let clipboardContent = clipboard.get()
    if (clipboardContent) {
      clipboardContent = ServiceDocument.getCopy(clipboardContent)
      let documentRectangle = estimateRectangle(serviceDocument.get())
      let clipboardRectangle = estimateRectangle(clipboardContent)
      let width = geometry.width(documentRectangle)
      let height = geometry.height(documentRectangle)
      let rectangleOffset = geometry.difference(geometry.minorCorner(clipboardRectangle), geometry.majorCorner(documentRectangle))
      let offset = grid.snapPosition(width > height ? vector(0, rectangleOffset.y) : vector(rectangleOffset.x, 0))
      let selectedIds = objects.flatten(clipboardContent)
      let moveAction = moveItemsAction(application) (clipboardContent, selectedIds, offset)
      clipboardContent = ServiceDocument.applyAction(clipboardContent, moveAction)
      let action = insertItemsAction(clipboardContent)
      serviceDocument.applyAction(action)
      selection.select(selectedIds)
      setTimeout(fitViewport)
    }
  }

  let flipSelectionToFront = () => {
    let action = serviceDocument.createAction(ServiceDocument.flipToFrontAction, selection.ids.get())
    serviceDocument.applyAction(action)
    selection.reset()
  }

  let flipSelectionToBack = () => {
    let action = serviceDocument.createAction(ServiceDocument.flipToBackAction, selection.ids.get())
    serviceDocument.applyAction(action)
    selection.reset()
  }

  let zoom = (event) => {
    let deltaZoom = -0.001 * event.deltaY
    let position = viewport.getEventPosition(event)
    viewport.zoomInto(deltaZoom, position)
  }

  let fitViewport = () => {
    let contentRectangle = geometry.mergeRectangles([
      ... objects.values(nodes.nodes.get()).map((node) => node.rectangle.get()),
      ... objects.values(comments.comments.get()).map((comment) => geometry.rectangle(comment.storedComment.get()?.position)),
    ])
    let fitRectangle = geometry.expandRectangle(geometry.vector(200, 200)) (contentRectangle)
    let canvasElement = canvas.get()
    let viewSize = {
      x: canvasElement.offsetWidth,
      y: canvasElement.offsetHeight,
    }
    viewSize && viewport.fit(fitRectangle, viewSize)
  }

  let moveSelection = handleOnlyAtTarget((event, dx, dy) => {
    let gridSize = grid.getGridSize()
    let step = geometry.multiply(grid.getGridSize(), geometry.vector(dx, dy))
    let prevMoving = moving.get()
    let offset = geometry.add(prevMoving ? prevMoving.offset : geometry.zero, step)
    moving.set({ offset })
  })

  let dismissMovingSelection = (event) => {
    moving.set(null)
  }

  let unholdMovingSelection = (event, key) => {
    let action = movingAction.get()
    serviceDocument.applyAction(action)
    moving.set(null)
  }

  let eventsHandlers = observables.of({
    copySelection,
    pasteSelection,
    removeSelection,
    flipSelectionToFront,
    flipSelectionToBack,
    fitViewport,
    canvasWheel: zoom,
    setZoom: viewport.setZoom,
    setGridSize: grid.setGridSize,
    canvasRef: canvas.set,
    undo: serviceDocument.undo,
    redo: serviceDocument.redo,
    openNodeDialog: onOpenNodeDialog,
    selection(id, event) {
      let selected = selection.ids.get()
      if (!selected[id] || events.isCtrl(event)) {
        selection.select(Selection.of(id), events.isShift(event), events.isCtrl(event))
      }
    },
    dragging(event) {
      mode.set(createDraggingSelection(dismissMode, application, event))
    },
    lassoMode(event) {
      let lassoMode = createLasso(dismissMode, application, event)
      mode.set(lassoMode)
    },
    defaultMode(event) {
      dismissMode()
    },
    keyDown: (event) => ({
      Delete: handleOnlyAtTarget(removeSelection),
      c: handleOnlyAtTarget((event) => (events.isCtrl(event)) && copySelection(event)),
      v: handleOnlyAtTarget((event) => (events.isCtrl(event)) && pasteSelection(event)),
      ArrowLeft: (event) => moveSelection(event, -1, 0),
      ArrowUp: (event) => moveSelection(event, 0, -1),
      ArrowRight: (event) => moveSelection(event, 1, 0),
      ArrowDown: (event) => moveSelection(event, 0, 1),
      Shift: (event) => {
        let lassoMode = createLasso(dismissMode, application, event)
        mode.set(lassoMode)
      },
      Escape: (event) => {
        selection.reset()
        dismissMovingSelection(event)
      },
    }) [event.key]?.(event),
    keyUp: (event) => ({
      ArrowLeft: (event) => unholdMovingSelection(event),
      ArrowUp: (event) => unholdMovingSelection(event),
      ArrowRight: (event) => unholdMovingSelection(event),
      ArrowDown: (event) => unholdMovingSelection(event),
      Shift: (event) => {
        let { params } = mode.get() || {}
        let { editorMode } = params && params.get() || {}
        if (editorMode === 'lasso') {
          dismissMode()
        }
      },
    }) [event.key]?.(event),
    canvasMouseDown: (event) => {
      if (mode.get() === emptyModule) {
        selection.reset()
        mode.set(createPanning(dismissMode, application, event))
      }
    },
  })

  let components = createModule({ draftActions, eventsHandlers }, 'serverDesigner')

  let module = observables.map(
    (mode) => mergeModules([components, mode], 'serverDesigner'),
    mode
  )

  return {
    clipboard, moving, canvas,
    ... observeModule(module, 'serverDesigner'),
  }
}

export const createServiceDesigner = (serviceDocument, onAction, initial = {}) => {
  let modules = observables.of([]).denote('applicationModules')
  let module = observables.map(mergeModules, modules)
  let application = { ... initial, ... observeModule(module, 'application.') }
  application.viewport = createViewport()
  application.grid = createGrid()
  application.selection = createSelection()
  application.asyncTasksWorker = createAsyncTasks(application)
  application.emitEvent = createEventEmitter(application)
  application.serviceDocument = createServiceDocument(serviceDocument, onAction, application)
  application.nodes = createNodes(application)
  application.links = createLinks(application)
  application.comments = createComments(application)
  application.serviceDesigner = createServiceDesignerModule(application)
  let { serviceDesigner, serviceDocument: serviceDocumentModule, nodes, links, comments } = application
  modules.set([serviceDesigner, serviceDocumentModule, nodes, links, comments])
  return application
}
