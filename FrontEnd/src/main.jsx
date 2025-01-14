import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/ConfigStore.jsx'
import './index.css'
import { QueryProvider } from './components/providers/QueryProviders.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <QueryProvider>
      <App />
    </QueryProvider>
  </Provider>,
)
