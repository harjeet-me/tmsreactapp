import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/company-profile">
      Company Profile
    </MenuItem>
    <MenuItem icon="asterisk" to="/customer">
      Customer
    </MenuItem>
    <MenuItem icon="asterisk" to="/trip">
      Trip
    </MenuItem>
    <MenuItem icon="asterisk" to="/invoice">
      Invoice
    </MenuItem>
    <MenuItem icon="asterisk" to="/payment">
      Payment
    </MenuItem>
    <MenuItem icon="asterisk" to="/invoice-report">
      Invoice Report
    </MenuItem>
    <MenuItem icon="asterisk" to="/invoice-item">
      Invoice Item
    </MenuItem>
    <MenuItem icon="asterisk" to="/product-item">
      Product Item
    </MenuItem>
    <MenuItem icon="asterisk" to="/accounts">
      Accounts
    </MenuItem>
    <MenuItem icon="asterisk" to="/transactions-record">
      Transactions Record
    </MenuItem>
    <MenuItem icon="asterisk" to="/container">
      Container
    </MenuItem>
    <MenuItem icon="asterisk" to="/equipment">
      Equipment
    </MenuItem>
    <MenuItem icon="asterisk" to="/insurance">
      Insurance
    </MenuItem>
    <MenuItem icon="asterisk" to="/contact">
      Contact
    </MenuItem>
    <MenuItem icon="asterisk" to="/driver">
      Driver
    </MenuItem>
    <MenuItem icon="asterisk" to="/carrier">
      Carrier
    </MenuItem>
    <MenuItem icon="asterisk" to="/location">
      Location
    </MenuItem>
    <MenuItem icon="asterisk" to="/email">
      Email
    </MenuItem>
    <MenuItem icon="asterisk" to="/invoice-history">
      Invoice History
    </MenuItem>
    <MenuItem icon="asterisk" to="/account-history">
      Account History
    </MenuItem>
    <MenuItem icon="asterisk" to="/report">
      Report
    </MenuItem>
    <MenuItem icon="asterisk" to="/file-system">
      File System
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
