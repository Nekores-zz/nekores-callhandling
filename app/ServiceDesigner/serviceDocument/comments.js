import { functions, arrays, objects, geometry, debug, observables, events, reactive, generateUid, selectors } from '../utility';

const {point, vector, x, y, add, difference, distance, segment, getRectangleVertex, expandRectangle} = geometry;

export const getComments = (serviceDocument) => serviceDocument.comments

export const isComment =
  matching.hasShape({
    id: matching.isString,
    userId: matching.isString,
    text: matching.isString,
    order: matching.isNumber,
    position: matching.isPosition,
  })

export const newComment = (data) => ({
  id: generateUid(),
  order: 0,
  ...data,
})

export const move = (comment, offset) => ({
  position: geometry.add(comment.position, offset),
})

const editCommentAction = (commentId, commentChanges) => {
  return {
    key: 'applyChanges',
    changes : {
      comments: { [commentId]: commentChanges },
    },
  }
}

export const edit = (commentId, text) => editCommentAction(commentId, { text })
