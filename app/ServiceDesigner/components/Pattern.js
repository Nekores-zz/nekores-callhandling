import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export class GridPattern extends PureComponent {
  static propTypes = {
    
  };

  static defaultProps = {
  };

  render() {
    let {id, gridSize, transform} = this.props;
    return (
      <pattern id={id} width={gridSize} height={gridSize} patternUnits="userSpaceOnUse" patternTransform={transform}>
        <rect x={0} y={0} width={1} height={1} fill='#00000033'/>
      </pattern>
    );
  }
}
