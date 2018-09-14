import React, { Component } from 'react';
import cn from 'classnames';

const screenTypes = {
  list: 'Survey list',
  table: 'Survey table',
  slider: 'Slider bar',
  audio: 'Record audio',
  camera: 'Take camera photo',
  video: 'Take camera video',
  draw: 'Draw',
  sort: 'Sort pictures'
}
export default class Bookmark extends Component {
  render() {
    const {index, selected, screen, onSelect} = this.props;
    const screenType = screen && (screen.surveyType || screen.canvasType);
    return (
      <div className={cn("bookmark", {selected})}>
        <div className="thumb" onClick={() => !selected && onSelect(index)}>
          <div className="thumb__label">
            <h3>{ screen && screen.name }</h3>
            <p>{ screen && screenTypes[screenType].toLowerCase() }</p>
          </div>
        </div>
        <div className="subtitle">Screen {index+1} of 42</div>
      </div>
    );
  }
}