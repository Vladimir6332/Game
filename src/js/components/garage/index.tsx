import React from 'react';
import Tank from './tank';

const Garage: React.FC = () => {
  return (
    <section className="garage">
      <Tank />
      <div className="garage__weapons" />
      <div className="garage__statistics" />
      <div className="garage__weapons" />
    </section>
  );
};

export default Garage;
