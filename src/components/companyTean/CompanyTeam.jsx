import EmptyState from "@/components/shared/EmptyState";
import CarsoulComponent from "../sliders/CarsoulComponent";
import EmployeeCard from "./EmployeeCard";

export default function CompanyTeam({ employees = [] }) {
  if (employees.length === 0) {
    return (
      <section className="my-10 px-5">
        <EmptyState
          title="لا يوجد أعضاء فريق حالياً"
          subtitle="سيتم إضافة أعضاء الفريق قريباً"
        />
      </section>
    );
  }

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
