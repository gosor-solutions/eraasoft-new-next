import React from "react";
import CarsoulComponent from "../sliders/CarsoulComponent";
import EmployeeCard from "./EmployeeCard";

export default function CompanyTeam({ employees = [] }) {
  return (
    <div className="my-10">
      <CarsoulComponent>
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </CarsoulComponent>
    </div>
  );
}
