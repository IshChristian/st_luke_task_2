import { Outlet } from 'react-router-dom';
import Header from '../components/header';

function Dashboard() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Dashboard;