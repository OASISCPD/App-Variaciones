import { Route, Routes } from 'react-router-dom';
import RedirectModule from '../hook/RedirectComponent';
import PageTest from '../test/page';
import PageHome from '../page/home/page';
import UsersPage from '../page/users/page';
export const RouterContainer = () => {
    return (
        <div className='tracking-wider gothamMedium'>
            <Routes>
                <Route path='/' element={<RedirectModule route='/home' />} />
                <Route path='/home' element={<PageHome />}/>
                <Route path='/users' element={<UsersPage />}/>
                <Route path='/test' element={<PageTest />}/>
            </Routes>
        </div>
    )
}