import React, { useState } from 'react';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './index.css';

function WarehouseList() {
  const [searchTerm, setSearchTerm] = useState('');

  const [filters, setFilters] = useState({ city: '', cluster: '', spaceAvailable: '' });
  const navigate = useNavigate();

  const storeWarehouses = useSelector((reduxStoreData) => reduxStoreData.warehouselist) || [];
console.log(storeWarehouses)


  const filteredWarehouses = storeWarehouses.filter((warehouse) => {
    const nameMatch = warehouse.name.toLowerCase().includes(searchTerm.toLowerCase());
    const cityMatch = filters.city === '' || warehouse.city === filters.city;
    const clusterMatch = filters.cluster === '' || warehouse.cluster === filters.cluster;
    const spaceAvailableMatch =
      filters.spaceAvailable === '' || warehouse.space_available >= parseFloat(filters.spaceAvailable);

    return nameMatch && cityMatch && clusterMatch && spaceAvailableMatch;
  });

 
  return (
    <div className="main-container">
      <div className="search-container">
        <input
          className="input-search"
          type="text"
          placeholder="Search by warehouse name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='selection-container'>
        <select className='city-selection'
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        >
          <option value="">All Cities</option>
          { filteredWarehouses.map((warehouse,i)=>{
           return <option value={warehouse.city}>{warehouse.city}</option>
          })}
          
        </select>
        <select className='cluster-selection'
          value={filters.cluster}
          onChange={(e) => setFilters({ ...filters, cluster: e.target.value })}
        >
          <option value="">All Clusters</option>
          { filteredWarehouses.map((warehouse,i)=>{
           return <option value={warehouse.cluster}>{warehouse.cluster}</option>
          })}
        </select>
        <input className='space'
          type="number"
          placeholder="Space Available Limit"
          value={filters.spaceAvailable}
          onChange={(e) => setFilters({ ...filters, spaceAvailable: e.target.value })}
        />
      </div>
      <ul className="ul">
        {filteredWarehouses.map((warehouse) => (
         <li key={warehouse.id} className="warehouse-card" onClick={()=>{navigate(`/details/${warehouse.id}`)}}>
         <h2 className="warehouse-title">Name: {warehouse.name}</h2>
         <p className="warehouse-info">Code: {warehouse.code}</p>
         <p className="warehouse-info">City: {warehouse.city}</p>
         <p className="warehouse-info">Space Available: {warehouse.space_available}</p>
         <p className="warehouse-info">Type: {warehouse.type}</p>
         <p className="warehouse-info">Cluster: {warehouse.cluster}</p>
         <p className="warehouse-info">
           Is Registered: {warehouse.is_registered ? 'Yes' : 'No'}
         </p>
         <p className="warehouse-info">
           Is Live: {warehouse.is_live ? 'Yes' : 'No'}
         </p>
       </li>
        ))}
      </ul>
    </div>
  );
}

export default WarehouseList;
