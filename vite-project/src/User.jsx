import React from 'react';

const User = ({ name, department, position, index, deleteUser }) => {
  return (
    <li>
      <p>{name}</p>
      <p>{department}</p>
      <p>{position}</p>
      <button onClick={() => deleteUser(index)}>Delete</button>
    </li>
  );
};

export default User;
