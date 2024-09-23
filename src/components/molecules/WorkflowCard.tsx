import { ApplicationStatus, WorkflowTypes } from '@/constants/constants';
import { capitalizeWords } from '@/constants/functions';
import { DataList } from '@/dto/ApplicationData.dto';
import { WorkflowDto } from '@/dto/Workflow.dto';
import classNames from 'classnames';

interface Props {
  workflow: WorkflowDto;
}
export default function WorkflowCard({ workflow }: Props) {
  return (
    <div className="my-4 flex flex-wrap w-2/6 cursor-pointer items-center justify-between rounded-xl bg-logoColorBlue px-10 py-8 opacity-90 drop-shadow-[0px_0px_10px_rgba(0,10,10,10)]">
      <div>
        <p className="py-3 text-lg font-bold text-green-500">Workflow Name</p>
        <p className="ml-1 text-sm font-bold text-white">
          {workflow.name}
        </p>
      </div>

      <div className="">
        <p className="py-3 text-lg font-bold text-green-500"> Type</p>
        <p
          className={classNames(
            `rounded-md w-28 flex justify-center -ml-1 py-2 text-sm font-bold text-white`,
            {
              'bg-red-600': workflow.type === WorkflowTypes.COUNTRY,
              'bg-logoColorGreen':
                workflow.type === WorkflowTypes.GENERAL,
              'bg-blue-800':
                workflow.type === WorkflowTypes.VISA,
            },
          )}
        >
          {capitalizeWords(workflow.type)}
        </p>
      </div>
      <div className='flex items-center flex-col'>
        <p className="py-3 text-lg font-bold text-green-500">Priority</p>
        <p className=" text-sm font-bold text-white">
          {workflow.priority}
        </p>
      </div>
    </div>
  );
}
