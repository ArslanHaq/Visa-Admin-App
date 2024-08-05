import { ApplicationStatus } from '@/constants/constants';
import { capitalizeFirstLetter } from '@/constants/functions';
import { DataList, InboxDto } from '@/dto/ApplicationData.dto';
import classNames from 'classnames';

interface Props {
  application: DataList;
}
export default function ApplicationCard({ application }: Props) {
  return (
    <div className="my-4 flex flex-wrap w-5/12 cursor-pointer items-center justify-between rounded-xl bg-logoColorBlue px-10 py-8 opacity-90 drop-shadow-[0px_0px_10px_rgba(0,10,10,10)]">
      <div>
        <p className="py-3 text-lg font-bold text-green-500"> Tracking Id</p>
        <p className="ml-1 text-sm font-bold text-white">
          {application.trackingId}
        </p>
      </div>
      <div>
        <p className="py-3 text-lg font-bold text-green-500">Last Section</p>
        <p className=" text-sm font-bold text-white">
          {application.lastSection}
        </p>
      </div>
      <div className="">
        <p className="py-3 text-lg font-bold text-green-500"> Status</p>
        <p
          className={classNames(
            `rounded-md px-3 -ml-1 py-2 text-sm font-bold text-white`,
            {
              'bg-red-600': application.status === ApplicationStatus.REJECTED,
              'bg-logoColorGreen':
                application.status === ApplicationStatus.APPROVED,
              'bg-blue-800':
                application.status === ApplicationStatus.INPROGRESS,
            },
          )}
        >
          {capitalizeFirstLetter(application.status)}
        </p>
      </div>
    </div>
  );
}
