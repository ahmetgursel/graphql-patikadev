import { FilterProvider } from './Context/FilterStates';

import HeaderContainer from './components/HeaderContainer';
import SidebarContainer from './components/SidebarContainer';
import CardsContainer from './components/CardsContainer';

function App() {
  return (
    <div>
      <FilterProvider>
        <HeaderContainer />
        <div className='body-container'>
          <SidebarContainer />
          <CardsContainer />
        </div>
      </FilterProvider>
    </div>
  );
}

export default App;
