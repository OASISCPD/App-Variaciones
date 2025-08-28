import { Route, Routes } from 'react-router-dom';
import RedirectModule from '../hook/RedirectComponent';
import PageHome from '../page/home/page';
import UsersPage from '../page/users/page';
import LoginModule from '../page/auth/page';
import { PrintVariacion } from '../page/print/Variacion';
import { PrintVale } from '../page/print/Vale';
export const RouterContainer = () => {

    return (
        <div className='tracking-wider gothamMedium'>
            <Routes>
                <Route path='/' element={<RedirectModule route='/login' />} />
                <Route path='/login' element={<LoginModule />} />
                <Route path='/print-variacion/:id' element={<PrintVariacion />} />
                <Route path='/print-vale/:id' element={<PrintVale />} />
                <Route path='/home' element={<PageHome />} />
                <Route path='/users' element={<UsersPage />} />
            </Routes>
        </div>
    )
}