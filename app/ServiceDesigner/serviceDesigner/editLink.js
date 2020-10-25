import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import { HighlightHover, Highlight, Link } from '../components';
import { functions, arrays, objects, geometry, debug, observables, events, reactive } from '../utility';
import { editItemsAction, removeItemsAction, insertItemsAction } from './serviceDocument';
import { emptyModule, createModule, Grid, combineEventsHandlers, Selection } from '../editor';
import { updateLinkElbowsAction, setLinkEndAction } from './links';

const { point, vector, add, difference, distance, perpendicular, project, pathSegments } = geometry;

class LinkSegment extends PureComponent {
  handleLinkSegmentAddElbow = (event) => this.props.emitEvent('linkSegmentAddElbow', this.props.pieceIndex, this.props.piece, this.props.segmentIndex, this.props.segment, event);
  render() {
    let { pieceIndex, piece, segmentIndex, segment, canDrag, isDragging } = this.props;
    return (
      <Link.Segment
        point0={segment[0]}
        point1={segment[1]}
        onPoint={this.handleLinkSegmentAddElbow}
      />
    );
  }
}

class LinkElbow extends PureComponent {
  handleLinkRemoveElbow = (event) => this.props.emitEvent('linkRemoveElbow', this.props.elbow, this.props.elbowIndex, event);
  handleLinkElbowDragStart = (event) => this.props.emitEvent('linkElbowDragStart', this.props.elbow, this.props.elbowIndex, event);
  render() {
    let { elbow, elbowIndex, isDragging } = this.props;
    return (
      <HighlightHover isOn={isDragging}>
        <Link.Elbow
          point={elbow}
          onStartDrag={this.handleLinkElbowDragStart}
          onRemove={this.handleLinkRemoveElbow}
          isDragging={isDragging}
        />
      </HighlightHover>
    );
  }
}

const EditingLink = observables.withObservables(
  class EditingLink extends PureComponent {
    handleLinkRemove = (event) => this.props.emitEvent('linkRemove', event)
    handleLinkEndDragStart = (event) => this.props.emitEvent('linkEndDragStart', event)

    renderSegment = (piece, pieceIndex) => (segment, segmentIndex) =>
      <LinkSegment
        key={segmentIndex}
        piece={piece} pieceIndex={pieceIndex}
        segment={segment} segmentIndex={segmentIndex}
        emitEvent={this.props.emitEvent}
      />

    renderPiece = (piece, pieceIndex) =>
      pathSegments(piece).map(this.renderSegment(piece, pieceIndex))

    renderElbow = (elbow, elbowIndex) =>
      <LinkElbow
        key={elbowIndex}
        elbow={elbow}
        elbowIndex={elbowIndex}
        emitEvent={this.props.emitEvent}
      />

    renderLinkEnd = (linkEnd, linkEndId) =>
      <Highlight
        key={linkEndId}
        isEnabled={linkEndId === this.props.toLinkEnd}
      >
        <Link.LinksEnd point={linkEnd.position}/>
      </Highlight>

    render() {
      let { isDraggingLinkEnd, linkEnds, elbows, toLinkEnd, pieces, vertices, emitEvent } = this.props;
      return <>
        {pieces.map(this.renderPiece)}
        {elbows.map(this.renderElbow)}
        <HighlightHover>
          <Link.RemoveIcon
            point={vertices[0]}
            onRemove={this.handleLinkRemove}
          />
        </HighlightHover>
        <HighlightHover isOn={!!isDraggingLinkEnd}>
          <Link.Elbow
            point={arrays.last(vertices)}
            onStartDrag={this.handleLinkEndDragStart}
            isDragging={!!isDraggingLinkEnd}
          />
        </HighlightHover>
        {!!isDraggingLinkEnd && objects.toArray(linkEnds, this.renderLinkEnd)}
      </>
    }
  }
)

const addElbow = (elbows, segmentIndex, position) => {
  return [
    ...elbows.slice(0, segmentIndex),
    position,
    ...elbows.slice(segmentIndex),
  ]
}

const removeElbow = (elbows, elbowIndex) => {
  return [
    ...elbows.slice(0, elbowIndex),
    ...elbows.slice(elbowIndex + 1),
  ]
}

const moveElbow = (elbows, elbowIndex, offset) => {
  return elbows.map(
    (elbow, i) => i === elbowIndex ? add(elbow, offset) : elbow
  )
}

const createFixUpElbows = (application) => (elbows) => {
  let { grid } = application
  let gridSize = grid.getGridSize()
  let shouldKeepElbow = (result, elbow) => {
    return !result.length || distance(elbow, arrays.last(result)) >= gridSize
  }
  let fixUpElbow = (result, elbow) => {
    elbow = grid.snapPosition(elbow)
    if (shouldKeepElbow(result, elbow)) {
      result.push(elbow)
    }
    return result
  }
  return elbows.reduce(fixUpElbow, [])
}

const createDraggingLinkElbow = (dismiss, application, link, elbowIndex, event) => {
  let { viewport, serviceDocument } = application
  let isDraggingLinkElbow = true
  let startPosition = events.getPagePosition(event)
  let draggingElbowOffset = observables.of(geometry.zero)

  let fixUpElbows = createFixUpElbows(application)

  let eventsHandlers = observables.of({
    mouseMove(event) {
      let viewOffset = difference(startPosition, events.getPagePosition(event))
      let offset = viewport.transformOffsetFromView(viewOffset)
      draggingElbowOffset.set(offset)
    },
    mouseUp(event) {
      let action = draggingElbowAction.get()
      serviceDocument.applyAction(action)
      dismiss()
    },
  })

  let draggingElbowAction = observables.map(
    (actualLink, offset) => {
      let elbows = fixUpElbows(moveElbow(actualLink.elbows, elbowIndex, offset))
      return updateLinkElbowsAction(actualLink.id, elbows)
    },
    link.actual,
    draggingElbowOffset,
  )

  let draftActions = observables.map((action) => [action], draggingElbowAction)

  return { link, isDraggingLinkElbow, elbowIndex, startPosition, draggingElbowOffset, draggingElbowAction, eventsHandlers, draftActions };
};

const createDraggingLinkEnd = (dismiss, application, link, event) => {
  let { viewport, serviceDocument } = application
  let isDraggingLinkEnd = true
  let startPosition = events.getPagePosition(event)
  let draggingEndOffset = observables.of(geometry.zero)

  let eventsHandlers = observables.of({
    mouseMove(event) {
      let viewOffset = difference(startPosition, events.getPagePosition(event))
      let offset = viewport.transformOffsetFromView(viewOffset)
      draggingEndOffset.set(offset)
    },
    mouseUp(event) {
      let action = draggingEndAction.get()
      serviceDocument.applyAction(action)
      dismiss()
    },
  })

  let linkEndPosition = link.toSlot.get().position
  let linkEnds = link.toNode.get().linkEnds.get()
  let findLinkEnd = (position) => objects.minimum(
    linkEnds,
    (linkEnd) => geometry.distance(linkEnd.position, position)
  )

  let draggingEndAction = observables.map(
    (actualLink, offset) => {
      let postion = geometry.add(linkEndPosition, offset)
      let toLinkEnd = findLinkEnd(postion)
      return setLinkEndAction(actualLink.id, toLinkEnd)
    },
    link.actual,
    draggingEndOffset,
  )

  let draftActions = observables.map((action) => [action], draggingEndAction)

  return { link, isDraggingLinkEnd, startPosition, draggingEndOffset, eventsHandlers, draftActions }
};


export const initEditingLink = (dismiss, application, linkId, event) => {
  let { emitEvent, serviceDocument, viewport } = application
  let { links } = application.links

  let fixUpElbows = createFixUpElbows(application)

  let link = observables.property(linkId, links)

  let editingLink = observables.map(
    (link) => {
      if (!link) return null
      let { actual, fromSlot, toNode, linkEnds, toLinkEnd, elbows, pieces, vertices } = link
      let mode = observables.of(null).denote('editLinkMode.')
      let modeEventsHandlers = observables.switchMap((mode) => mode ? mode.eventsHandlers : null, mode)
      let draftActions = observables.switchMap((mode) => mode ? mode.draftActions : null, mode)
      let isDraggingLinkEnd = observables.map((mode) => !!(mode && mode.isDraggingLinkEnd), mode)

      let editorContent = (
        <EditingLink key='editingLink'
          isDraggingLinkEnd={isDraggingLinkEnd}
          linkEnds={linkEnds}
          toLinkEnd={toLinkEnd}
          elbows={elbows}
          pieces={pieces}
          vertices={vertices}
          emitEvent={emitEvent}
        />
      )

      let eventsHandlers = observables.map(
        (modeEventsHandlers) => ({
          ...modeEventsHandlers,
          canvasMouseDown: dismiss,
          nodeMouseDown: dismiss,
          commentMouseDown: dismiss,
          linkSegmentAddElbow(pieceIndex, piece, segmentIndex, segment, event) {
            let link = actual.get()
            let linkFrom = fromSlot.get()
            let position = viewport.getEventPosition(event)
            let elbows = fixUpElbows(addElbow(link.elbows, pieceIndex, position))
            let action = updateLinkElbowsAction(link.id, elbows)
            serviceDocument.applyAction(action)
            events.endEvent(event)
          },
          linkRemoveElbow(elbow, elbowIndex, event) {
            let link = actual.get()
            let elbows = fixUpElbows(removeElbow(link.elbows, elbowIndex))
            let action = updateLinkElbowsAction(link.id, elbows)
            serviceDocument.applyAction(action);
            events.endEvent(event);
          },
          linkRemove(event) {
            let action = removeItemsAction(serviceDocument.get(), Selection.of(linkId));
            serviceDocument.applyAction(action);
            events.endEvent(event);
          },
          linkElbowDragStart(elbow, elbowIndex, event) {
            let startPosition = events.getPagePosition(event)
            let dismissMode = () => mode.set(null)
            mode.set(createDraggingLinkElbow(dismissMode, application, link, elbowIndex, event))
            events.endEvent(event)
          },
          linkEndDragStart(event) {
            let startPosition = events.getPagePosition(event)
            let dismissMode = () => mode.set(null)
            mode.set(createDraggingLinkEnd(dismissMode, application, link, event))
            events.endEvent(event)
          }
        }),
        modeEventsHandlers,
      )

      return observables.denote({ eventsHandlers, editorContent, mode, draftActions }, 'editLink.')
    },
    link,
  )
    .denote('editingLink')

  let editorContent = observables.map(
    (editingLink) => editingLink && editingLink.editorContent,
    editingLink,
  )

  let renderings = observables.map(
    (editorContent) => ({ above: editorContent }),
    editorContent,
  )

  let draftActions = observables.switchMap(
    (editingLink) => editingLink && editingLink.draftActions,
    editingLink,
  )

  let eventsHandlers = observables.switchMap(
    (editingLink) => editingLink && editingLink.eventsHandlers,
    editingLink,
  )

  return createModule({
    renderings,
    eventsHandlers,
    draftActions,
  }, 'editLink')
}
