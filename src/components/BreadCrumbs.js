import React from 'react';

const BreadCrumbs = ({ elements}) => (
  <div className="container-fluid">
    {/* Breadcrumbs */}
    <ol className="breadcrumb">
    {elements.map((crumb, index) => {
      return (
          <li className="breadcrumb-item" key={index}>
            <a href={crumb.link}>{crumb.name}</a>
          </li>
        )})}
    </ol>
  </div>
);

export default BreadCrumbs;
