import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import '@onfido/castor/dist/castor.css';
import '@onfido/castor/dist/themes/day.css';
import './index.css';

render(<App />, document.getElementById('root'));
