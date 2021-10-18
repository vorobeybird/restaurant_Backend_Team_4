import { styled } from "@mui/styles";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Dishes from "../dishes/Dishes";
import AdminNavBar from "../navbar/AdminNavBar";
import AdminSideBar from "../sidebar/AdminSideBar";
import Orders from "../orders/Orders";
import Users from "../users/Users";
import Customers from "../customers/Customers";

const AdminLayoutRoot = styled('div')(
    ({ theme }) => ({
      backgroundColor: '#f4f6f8',
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%'
    })
  );
  
  const AdminLayoutWrapper = styled('div')(
    ({ theme }) => ({
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: 64,
/*       [theme.breakpoints.up('lg')]: {
        paddingLeft: 256
      } */
    })
  );
  
  const AdminLayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  });
  
  const AdminLayoutContent = styled('div')({
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  });
  
const AdminLayout = ()=>{

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <AdminLayoutRoot>
      <AdminNavBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <AdminSideBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <AdminLayoutWrapper>
        <AdminLayoutContainer>
          <AdminLayoutContent>
        <Switch>
        <Route path="/dishes"><Dishes/></Route>
        <Route path="/orders"><Orders/></Route>
        <Route path="/customers"><Customers/></Route>
        <Route path="/users"><Users/></Route>
        </Switch>
          </AdminLayoutContent>
        </AdminLayoutContainer>
      </AdminLayoutWrapper>
    </AdminLayoutRoot>
  );

  }

export default AdminLayout;
