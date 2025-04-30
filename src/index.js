import React from 'react';
import { createRoot } from 'react-dom/client';

import './global.css';
import Game from "./components/game/game";

const root = createRoot(document.querySelector('#root'));
root.render(<Game />);