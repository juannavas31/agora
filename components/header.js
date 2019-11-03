import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

function Header(props) {

    let address = '';

    if (props.company != undefined) {
      if (props.company.registered) {
        address = props.company.cAddress;
      }
    }

    return (

      <Menu style={{ marginTop : '20px'}}>
         <Menu.Item header>ROUT</Menu.Item>
         <Menu.Item name='home'>
           <Link route = "/">
               <a className = "item">
               Home
               </a>
           </Link>
         </Menu.Item>

         <Menu.Item name='admin'>
           <Link route = "/admin">
               <a className = "item">
               Sign In
               </a>
           </Link>
         </Menu.Item>

       </Menu>
    )
};

export default Header;
