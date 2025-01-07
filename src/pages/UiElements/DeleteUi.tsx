import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';
import TableOne from '../components/Tables/TableOne';
import TableTwo from '../components/Tables/TableTwo';
// import DatePickerOne from '../components/Forms/DatePicker/DatePickerOne';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
      <TableThree />
        <TableOne />
        <TableTwo />
        
      </div>
    </>
  );
};

export default Tables;
