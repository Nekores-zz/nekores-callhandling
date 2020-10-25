import React, { PureComponent, Fragment } from 'react';
import { DraggableG, Highlight, HighlightHover, TextArea, Comments, Position, PrimaryButton, Padding, Stretch, SecondaryTextLink, PrimaryText, Column, Row, Box, PrimaryTextLink, Icon, IconButton, Menu, MenuItem } from '../components';
import { geometry, events, reactive, objects, arrays, functions, models, debug, matching, generateUid, observables } from '../utility';
import { emptyModule, createModule, observeModule, Selection, mergeModules, ComplexModule, DynamicModule, Container } from '../editor'
import { newComment, getComments, resize, edit } from '../serviceDocument/comments'
import { removeItemsAction, ServiceDocument } from '../serviceDocument'
export * from '../serviceDocument/comments'

const { point, vector, multiply, add, addTo, getRectangleVertex, rectanglePoint, expandRectangle, segmentCrossingRectangle, getShortestPaths, unfoldPath, pathLength, difference, getRectangleVertices, segment, pathSegments, isInsideRectangle, rectangle, } = geometry;

const CommentDraftPositioning = observables.withObservables(
  ({ position, opacity }) => position ? (
    <Position opacity={opacity || 0.64} {...position} pointerEvents='none'>
      <Comments.Marker />
    </Position>
  ) : null
)

const sizes = {
  default: geometry.vector(300, 16 + 40 + 16 + 52 + 16 + 38 + 16),
  minViewing: geometry.vector(200, 16 + 40 + 16 + 0 + 16),
  minEditing: geometry.vector(250, 16 + 40 + 16 + 52 + 16 + 38 + 16),
}

export const Comment = observables.withObservables(
  class Comment extends PureComponent {
    static sizes = sizes

    handleDelete = (event) => {
      this.props.emitEvent('deleteComment', this.props.commentId, event)
    }
    handleEdit = (event) => {
      this.toggleMenu(event, false)
      if (!this.props.isEditing) {
        this.props.emitEvent('editComment', this.props.commentId, event)
      }
    }
    handleTextChange = (event) => this.props.emitEvent('commentTextChange', this.props.commentId, event)
    handleSubmit = (event) => this.props.emitEvent('submitEditingComment', this.props.commentId, event)
    handleCancel = (event) => this.props.emitEvent('cancelEditingComment', this.props.commentId, event)

    state = {
      isHover: false,
      isOpen: true,
      isResizing: false,
      size: sizes.default,
      menuAnchor: null,
    }

    toggleOpen = (event, shouldOpen) => {
      let isOpen = shouldOpen ?? !this.state.isOpen
      this.setState({ isOpen })
    }

    toggleMenu = (event, shouldOpen = !this.state.menuAnchor) => {
      let menuAnchor = shouldOpen ? event.target : null
      this.setState({ menuAnchor })
    }

    resize = (dragging, event) => {
      let { dx, dy, released } = dragging
      let size = geometry.add(this.state.size, geometry.vector(dx, dy))
      let isResizing = !released
      this.setState({ size, isResizing })
    }

    hoverHandlers = {
      onMouseEnter: (event) => {
        this.setState({ isHover: true })
      },
      onMouseLeave: (event) => {
        this.setState({ isHover: false })
      },
    }

    draggingHandlers = {
      onDragStart: (dragging, event) => {
        this.props.emitEvent('grabComment', this.props.commentId, dragging, event)
      },
      onDrag: (dragging, event) => {
        this.props.emitEvent('dragComment', this.props.commentId, dragging, event)
      },
      onDragEnd: (dragging, event) => {
        if (!dragging.dragged) {
          this.props.emitEvent('commentClick', this.props.commentId, dragging, event)
          this.toggleOpen(event)
        }
        this.props.emitEvent('releaseComment', this.props.commentId, dragging, event)
      },
    }

    resizeHandlers = {
      onDragStart: () => {},
      onDrag: this.resize,
      onDragEnd: this.resize,
    }

    renderActions() {
      let { menuAnchor } = this.state
      return (
        <Box absolute top right alignChildrenCenter>
          <PrimaryTextLink onClick={this.handleDelete}>
            RESOLVE
          </PrimaryTextLink>
          <IconButton onClick={this.toggleMenu}>
            <Icon fontSize="small">more_vert</Icon>
          </IconButton>
          <Menu open={!!menuAnchor} anchorEl={menuAnchor} onClose={this.toggleMenu}>
            <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
            <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
          </Menu>
        </Box>
      )
    }

    renderAuthor() {
      let { user } = this.props
      return (
        <Row>
          <Comments.Author user={user} />
        </Row>
      )
    }

    renderViewing() {
      let { comment } = this.props
      return (
        <Stretch paddingTop verticalScroll>
          <PrimaryText>
            {comment.text}
          </PrimaryText>
        </Stretch>
      )
    }

    renderEditing() {
      let { comment } = this.props
      return (
        <Stretch paddingTop alignChildrenStretch>
          <TextArea
            value={comment.text}
            onChange={this.handleTextChange}
            autoFocus
          />
        </Stretch>
      )
    }

    renderBottomActions() {
      let { comment } = this.props
      return (
        <Row paddingTop>
          <Stretch />
          <SecondaryTextLink onClick={this.handleCancel}>
            Cancel
          </SecondaryTextLink>
          &nbsp;
          <PrimaryButton onClick={this.handleSubmit}>
            Submit
          </PrimaryButton>
        </Row>
      )
    }

    render() {
      let { commentId, comment, user, isEditing, isSelected } = this.props
      let { position, text } = comment
      let { size, isResizing, isHover, isOpen } = this.state
      return (
        <Position {... position}>
          <Comments.Panel
            size={geometry.max([size, isEditing ? sizes.minEditing : sizes.minViewing])}
            isCollapsed={!isHover && !isOpen &&!isEditing}
            isCollapsible={!isResizing}
            opacity={!text && 0.37 || !isOpen && 0.64 || 1}
            onDoubleClick={this.handleEdit}
          >
            <Column padding alignChildrenStretch noOverflow>
              {isEditing ? null : this.renderActions()}
              {this.renderAuthor()}
              {isEditing ? this.renderEditing() : this.renderViewing()}
              {isEditing ? this.renderBottomActions() : null}
              <Box absolute right bottom>
                <Comments.Resize {... this.resizeHandlers}/>
              </Box>
            </Column>
          </Comments.Panel>
          <Highlight isEnabled={!!isSelected} variant={'selected'}>
            <Comments.Marker
              {... this.hoverHandlers}
              {... this.draggingHandlers}
              opacity={isOpen ? 0.64 : 1}
            />
          </Highlight>
        </Position>
      )
    }
  }
)


export const initDraft = (resolve, application, event) => {
  let { emitEvent, serviceDocument, currentUserId, users, viewport, grid } = application
  let id = generateUid()
  let mode = observables.of(initChoosingPosition(initEditing))

  return new DynamicModule({}, observables.switchTo(mode), 'creatingComment')

  function initChoosingPosition() {
    let position = observables.of()
    let eventsHandlers = observables.of({
      canvasMouseOut(event) {
        position.set()
      },
      canvasMouseMove(event) {
        let value = grid.snapPosition(viewport.getEventPosition(event))
        position.set(value)
        events.endEvent(event)
      },
      canvasMouseUp(event) {
        let value = grid.snapPosition(viewport.getEventPosition(event))
        mode.set(initEditing(value))
      },
      mouseUp(event) {
        mode.set(initEditing(position.get()))
      },
    })
    let element = <CommentDraftPositioning key={id} position={position} />
    let renderings = observables.of({ above: [element] })
    return { eventsHandlers, renderings }
  }

  function initEditing(position) {
    if (!position) {
      resolve()
    }
    let comment = observables.of(newComment({ text: '', position, userId: currentUserId }))
    let { id } = comment.get()
    let eventsHandlers = observables.of({
      commentTextChange(commentId, event) {
        if (commentId === id) {
          let text = event.target.value
          observables.update(comment, (comment) => ({ ... comment, text }))
        }
      },
      dragComment(commentId, dragging, event) {
        if (commentId === id) {
          let position = grid.snapPosition(viewport.getEventPosition(event))
          observables.update(comment, (comment) => ({ ... comment, position }))
        }
      },
      submitEditingComment(commentId, event) {
        if (commentId === id) {
          let action = ServiceDocument.createCommentAction(comment.get(), serviceDocument.get())
          resolve(action)
        }
      },
      cancelEditingComment(commentId, event) {
        if (commentId === id) {
          resolve()
        }
      },
    })
    let element = (
      <Comment
        key={id}
        commentId={id}
        comment={comment}
        user={users[currentUserId]}
        isEditing={true}
        isSelected={false}
        emitEvent={emitEvent}
      />
    )
    let renderings = observables.of({ comments: [element] })
    return { eventsHandlers, renderings }
  }
}

const initEditing = (resolve, commentId, application, event) => {
  let { emitEvent, serviceDocument, comments, viewport, grid } = application
  let comment = comments.comments.get()[commentId]

  let text = observables.of(comment.storedComment.get().text)
  let draftAction = observables.map((text) => edit(commentId, text), text)
  let draftActions = observables.map((action) => [action], draftAction)

  let eventsHandlers = observables.of({
    commentTextChange(commentId, event) {
      if (comment.commentId === commentId) {
        text.set(event.target.value)
      }
    },
    submitEditingComment(commentId, event) {
      if (comment.commentId === commentId) {
        let action = text.get() ? draftAction.get() : removeItemsAction(serviceDocument.get(), Selection.of(commentId))
        resolve(action)
      }
    },
    cancelEditingComment(commentId, event) {
      if (comment.commentId === commentId) {
        resolve()
      }
    },
  })

  return { commentId, text, draftActions, eventsHandlers }
}

export const createComments = (application) => {
  let { emitEvent, selection, serviceDocument, users } = application

  let storedComments = observables.map(getComments, serviceDocument.actual)
  let editorComments = observables.map(getComments, serviceDocument.draft)
  let editings = new Container().denote('editings')
  let drafts = new Container().denote('drafts')
  let editingComments = observables.distinctMapToObject(
    objects.fromValues((editing) => editing.commentId),
    editings.observable,
  )

  let comments = observables.fromKeys(
    storedComments,
    (commentId) => {
      let storedComment = observables.entry(commentId, storedComments)
      let editorComment = observables.entry(commentId, editorComments)
      let commentEditing = observables.property(commentId, editingComments)
      let user = observables.map((comment) => users[comment.userId], editorComment)
      let element = (
        <Comment
          key={commentId}
          commentId={commentId}
          comment={editorComment}
          user={user}
          isEditing={observables.map(Boolean, commentEditing)}
          isSelected={selection.ofId(commentId)}
          emitEvent={emitEvent}
        />
      )
      return observables.denote(
        { commentId, storedComment, editorComment, commentEditing, element },
        `comment-${commentId.slice(-4)}.`
      )
    }
  )

  let eventsHandlers = observables.of({
    commentMode(event) {
      drafts.create(initDraft, application, event)
      .then(serviceDocument.applyAction)
    },
    editComment(commentId, event) {
      editings.create(initEditing, commentId, application, event)
      .then(serviceDocument.applyAction)
    },
    deleteComment(commentId, event) {
      let action = removeItemsAction(serviceDocument.get(), Selection.of(commentId))
      serviceDocument.applyAction(action)
    },
    grabComment(commentId, dragging, event) {
      emitEvent('selection', commentId, event)
      emitEvent('dragging', event)
    },
    dragComment(commentId, dragging, event) {
    },
  })

  let renderings = observables.map(
    (comments) => ({ comments: objects.toArray(comments, (comment) => comment.element) }),
    comments,
  )

  let components = { comments, editingComments, eventsHandlers, renderings }

  let submodules = observables.map(
    (editings, drafts) => [... editings, ... drafts],
    editings.observable, drafts.observable,
  )

  return observables.denote(new ComplexModule(components, submodules), 'comments')
}
