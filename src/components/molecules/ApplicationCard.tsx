import { ApplicationStatus, getStatusColor, getStatusText } from '@/constants/constants';
import { capitalizeWords } from '@/constants/functions';
import { DataList } from '@/dto/ApplicationData.dto';
import classNames from 'classnames';

interface Props {
  application: DataList;
}
export default function ApplicationCard({ application }: Props) {
  const statusColor = getStatusColor(application.status as ApplicationStatus);
  const statusText = getStatusText(application.status as ApplicationStatus);

  return (
    <div className="my-4 w-80   cursor-pointer items-center justify-between rounded-xl bg-logoColorBlue px-10 py-16 opacity-90 drop-shadow-[0px_0px_10px_rgba(0,10,10,10)]">
      <div>
        <p className="py-3 text-base md:text-lg font-bold text-green-500"> Tracking Id</p>
        <p className="ml-1 text-xs md:text-sm font-bold text-white">
          {application.trackingId}
        </p>
      </div>
      {/* <div>
        <p className="py-3 text-lg font-bold text-green-500">Last Section</p>
        <p className=" text-sm font-bold text-white">
          {application.lastSection}
        </p>
      </div> */}
      <div className="">
        <p className="py-3 text-base md:text-lg font-bold text-green-500">Status</p>
        <p
          className={classNames(
            'rounded-md w-40 flex justify-center -ml-1 py-2 text-xs md:text-sm font-bold text-white',
            { 'bg-yellow-800': application.status === ApplicationStatus.DEFERRED },
            statusColor
          )}
        >
          {capitalizeWords(statusText)}
        </p>
      </div>
    </div>
  );
}
