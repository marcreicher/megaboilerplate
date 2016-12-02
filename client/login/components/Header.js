import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const Header = ({
  children,
  username,
  password,
  onChangeUsername,
  onChangePassword }) => (
    <div>
      <FormGroup>
        <ControlLabel>
          Username:
        </ControlLabel>
        <FormControl
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={onChangeUsername}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>
          Password:
        </ControlLabel>
        <FormControl
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={onChangePassword}
        />
      </FormGroup>
        This is my login
        {children}
    </div>
);

export default Header;
