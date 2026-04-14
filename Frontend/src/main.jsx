import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppWrapper from "./AppWrapper";
import { Provider } from 'react-redux';
import store from "./Redux/store";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>  
  <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
    <AppWrapper />
  </BrowserRouter>
  </Provider>
)
