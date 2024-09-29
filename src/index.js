import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {Provider, useDispatch} from 'react-redux';
import bridge from '@vkontakte/vk-bridge';
import {store} from './store';
import '../public/assets/css/normalize.css'
import '../public/assets/css/main.css'
import '../public/assets/css/media.css'

bridge.send("VKWebAppInit");
bridge.send("VKWebAppSetViewSettings", {"status_bar_style": "light", "action_bar_color": "#fff"});

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <Provider store={store}>
        <App/>
    </Provider>,
);
