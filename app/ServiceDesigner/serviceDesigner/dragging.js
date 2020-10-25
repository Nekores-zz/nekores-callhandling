import { functions, arrays, objects, geometry, debug, observables, events, reactive } from '../utility';
import { emptyModule, createModule, observeModule, Selection, mergeModules } from '../editor'
import { ServiceDocument, createNodeAction } from './serviceDocument';

export const createDraggingSelection = (dismiss, application, event) => {
  let { serviceDocument, selection, grid, viewport } = application
  let startPosition = events.getPagePosition(event)

  let offset = observables.of(geometry.zero)

  let action = observables.map(
    ServiceDocument.moveItemsAction(application),
    serviceDocument.actual, selection.ids, offset,
  )

  let eventsHandlers = observables.of({
    mouseMove(event) {
      let position = events.getPagePosition(event)
      let viewOffset = geometry.difference(startPosition, position)
      let value = grid.snapPosition(viewport.transformOffsetFromView(viewOffset))
      offset.set(value)
    },
    mouseUp(event) {
      serviceDocument.applyAction(action.get())
      dismiss()
    },
  })

  let draftActions = observables.map(
    (action) => action ? [action] : null,
    action,
  )

  let params = observables.of({
    cursor: 'move',
  })

  return createModule({ eventsHandlers, draftActions, params }, 'dragging')
}

export const createPanning = (dismiss, application, event) => {
  let { viewport } = application
  var position0 = events.getPagePosition(event)

  let eventsHandlers = observables.of({
    mouseMove(event) {
      let position1 = events.getPagePosition(event)
      let viewOffset = geometry.difference(position0, position1)
      let offset = viewport.transformOffsetFromView(viewOffset)
      viewport.slide(geometry.multiply(-1, offset))
      position0 = position1
    },
    mouseUp(event) {
      dismiss()
    },
  })

  let params = observables.of({
    cursor: 'grabbing',
  })

  return createModule({ eventsHandlers, params }, 'panning')
}