import {functions, arrays, objects, geometry, debug, observables, selectors, events, reactive} from '../utility';
import {emptyModule, createModule, Selection} from '../editor';
import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Lasso as LassoComponent} from '../components';

export const Lasso = observables.withObservables(
  class Lasso extends PureComponent {
    render() {
      let {lassoRect} = this.props;
      return lassoRect && (
        <LassoComponent point0={lassoRect.point0} point1={lassoRect.point1}/>
      );
    }
  }
)

const { rectangle, setRectangleRight, areOverlapping, pathCrossingRectangle } = geometry;

export const createLasso = (dismiss, application, event) => {
  let { viewport, nodes, links, comments, selection } = application
  let point0 = observables.of(null)
  let point1 = observables.of(null)
  let lassoRectangle = observables.map(
    (point0, point1) => point0 && point1 && setRectangleRight(rectangle(point0, point1)),
    point0, point1,
  )

  let eventsHandlers = observables.of({
    canvasMouseDown(event) {
      point0.set(viewport.getEventPosition(event))
      events.endEvent(event)
    },
    canvasMouseMove(event) {
      point1.set(viewport.getEventPosition(event))
      events.endEvent(event)
    },
    mouseDown(event) {
      events.endEvent(event)
    },
    mouseUp(event) {
      lassoRectangle = lassoRectangle.get()
      let ids = lassoRectangle && objects.union(
        objects.filter((node) => areOverlapping(lassoRectangle, node.rectangle.get())) (nodes.nodes.get()),
        objects.filter((link) => pathCrossingRectangle(lassoRectangle) (link.vertices.get())) (links.links.get()),
        objects.filter((comment) => geometry.isInsideRectangle(lassoRectangle) (comment.editorComment.get().position)) (comments.comments.get()),
      )
      selection.select(ids, events.isShift(event), events.isCtrl(event))
      dismiss()
      events.endEvent(event)
    },
  })

  let editorContent = (
    <Lasso key='lasso' lassoRect={lassoRectangle}/>
  )

  let renderings = observables.of({ above: editorContent })

  let params = observables.of({
    cursor: 'crosshair',
    editorMode: 'lasso',
  })

  return createModule({ lassoRectangle, eventsHandlers, renderings, params }, 'lasso')
}
