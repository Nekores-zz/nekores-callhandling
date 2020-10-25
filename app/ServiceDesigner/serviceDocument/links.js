import { objects, arrays, functions, matching, generateUid, geometry, } from '../utility';
import { isNodeInput } from './nodes'

export const isLink =
  matching.hasShape({
    id: matching.isString,
    fromNodeId: matching.isString,
    fromLinkSource: matching.isString,
    toNodeId: matching.isString,
    toLinkEnd: isNodeInput,
    elbows: matching.isArrayOf(matching.isPosition),
  })

export const createLink = (data) => ({
  id: generateUid(),
  ...data,
})

export const move = (link, offset) => link.elbows.length ? {
  elbows: link.elbows.map(geometry.addTo(offset)),
} : null

const editLinkAction = (linkId, linkChanges) => {
  return {
    key: 'applyChanges',
    changes : {
      links: { [linkId]: linkChanges },
    },
  }
}

export const updateLinkElbowsAction = (linkId, elbows) => {
  return editLinkAction(linkId, { elbows })
}

export const setLinkEndAction = (linkId, toLinkEnd) => {
  return editLinkAction(linkId, { toLinkEnd })
}

export const getLinks = (serviceDocument) => serviceDocument.links
export const getFromNodeId = (link) => link.fromNodeId
export const getToNodeId = (link) => link.toNodeId
export const getFromLinkSource = (link) => link.fromLinkSource
export const getToLinksEnd = (link) => link.toLinkEnd
export const getElbows = (link) => link.elbows