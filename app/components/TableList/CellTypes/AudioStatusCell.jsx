/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TableListCellWrapper } from "components";
import { AudioStatus } from "components/Audio";

class AudioStatusCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired,

    audioPlayerInstance: PropTypes.object,
    onPlayPause: PropTypes.func,
    onChangeProgress: PropTypes.func
  };

  render = () => {
    const { rowData, args, ...props } = this.props;

    const status = rowData[args[0]];
    const getPlayUrl = args[1];

    return (
      <TableListCellWrapper {...props}>
        <AudioStatus status={status.toLowerCase()} getPlayUrl={getPlayUrl} fileId={rowData.id} {...props} />
      </TableListCellWrapper>
    );
  };
}

export default AudioStatusCell;
