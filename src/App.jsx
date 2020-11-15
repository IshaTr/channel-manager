import React from 'react'
import ChannelsManager from './containers/ChannelsManager'

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './store/reducer'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = () => (
  <Provider store={store}>
    <ChannelsManager />
  </Provider>
)

export default App
