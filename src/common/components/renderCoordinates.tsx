import React from 'react';
import { TMouseEventRenderer } from './MouseCoordinates';

const renderCoordinates: TMouseEventRenderer = ({ x, y }) => (
    <div>
        <span className="test">Mouse coordinates:</span>
        <br />
        <span>x = {x ? x : '?'}</span>
        <span>{'   '}</span>
        <span>y = {y ? y : '?'}</span>
    </div>
);

export default renderCoordinates;
