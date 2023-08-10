import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBrush,
  faPencil,
  faPalette,
  faScissors,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const HoverCards = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-8 mt-6 flex justify-center">
        Browse Featured Categories
      </h2>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card
          title="Paint"
          subtitle="Brushes, acryclic, watercolor, and more."
          to="/paint"
          icon={faBrush}
        />
        <Card
          title="Drawing"
          subtitle="Pencils, pens, sketchbooks, and more."
          to="/drawing"
          icon={faPencil}
        />
        <Card
          title="Canvas"
          subtitle="Variety of canvas styles including cotton and linen."
          to="/canvas"
          icon={faPalette}
        />
        <Card
          title="Fabric"
          subtitle="Cotton, linen, silk, velvet, and more."
          to="/fabric"
          icon={faScissors}
        />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, icon, to }) => {
  return (
    <Link
      to={to}
      className="w-full p-4 rounded border-[1px] border-slate-200 relative overflow-hidden group bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-[#2BA3C6] translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
      <FontAwesomeIcon
        icon={icon}
        className="mb-2 text-2xl text-blue-600 group-hover:text-white transition-colors relative z-10 duration-300"
      />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-gray-400 group-hover:text-gray-100 relative z-10 duration-300">
        {subtitle}
      </p>
    </Link>
  );
};

export default HoverCards;
