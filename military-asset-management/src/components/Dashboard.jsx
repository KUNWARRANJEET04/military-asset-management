// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import store from './redux/store'; // or wherever your Redux store is defined

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );
// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { fetchAssets } from '../utils/api';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetchAssets().then(data => setAssets(data));
  }, []);

  return (
    <div>
      <h1>Assets Dashboard</h1>
      <ul>
        {assets.map(asset => (
          <li key={asset.id}>{asset.name} - {asset.type}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
