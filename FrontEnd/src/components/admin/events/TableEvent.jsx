import * as React from 'react';
import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { FaEdit, FaEye, FaSortUp, FaSortDown } from 'react-icons/fa';
import EditEventDialog from './EditEventDialog';
import ViewEventDialog from './ViewEventDialog';
import { LuLoader2 } from 'react-icons/lu';

export default function TableEvent({ events, filterValues, onFilterchange, status }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    onFilterchange({ ...filterValues, sort: `${key},${direction}` });
    setSortConfig({ key, direction });
  };

  const handleEditOpen = () => {
    setIsEditOpen(!isEditOpen);
  };

  const handleViewOpen = () => {
    setIsViewOpen(!isViewOpen);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <FaSortUp size={20} /> : <FaSortDown size={20} />;
    }
    return null;
  };

  return (
    <div className="space-y-10">
      <Table className="border" style={{ tableLayout: 'fixed', width: '100%' }}>
        <TableHead className="bg-[#f9fafb]">
          <TableRow>
            <TableCell className="cursor-pointer" onClick={() => handleSort('eventId')} style={{ width: '10%', whiteSpace: 'nowrap' }}>
              <div className="flex items-center">
                <span className="mr-2">Id</span>
                {getSortIcon('eventId')}
              </div>
            </TableCell>
            <TableCell className="cursor-pointer" onClick={() => handleSort('eventName')} style={{ width: '25%', whiteSpace: 'nowrap' }}>
              <div className="flex items-center">
                <span className="mr-2">Tên sự kiện</span>
                {getSortIcon('eventName')}
              </div>
            </TableCell>
            <TableCell style={{ width: '15%' }}>Hình ảnh</TableCell>
            <TableCell className="cursor-pointer" onClick={() => handleSort('percentage')} style={{ width: '15%', whiteSpace: 'nowrap' }}>
              <div className="flex items-center">
                <span className="mr-2">Phần trăm giảm giá</span>
                {getSortIcon('percentage')}
              </div>
            </TableCell>
            <TableCell className="cursor-pointer" onClick={() => handleSort('startTime')} style={{ width: '15%', whiteSpace: 'nowrap' }}>
              <div className="flex items-center">
                <span className="mr-2">Thời gian bắt đầu</span>
                {getSortIcon('startTime')}
              </div>
            </TableCell>
            <TableCell className="cursor-pointer" onClick={() => handleSort('endTime')} style={{ width: '15%', whiteSpace: 'nowrap' }}>
              <div className="flex items-center">
                <span className="mr-2">Thời gian hết hạn</span>
                {getSortIcon('endTime')}
              </div>
            </TableCell>
            <TableCell className="cursor-pointer" onClick={() => handleSort('status')} style={{ width: '10%', whiteSpace: 'nowrap' }}>
              <div className="flex items-center">
                <span className="mr-2">Trạng thái</span>
                {getSortIcon('status')}
              </div>
            </TableCell>
            <TableCell style={{ width: '5%' }}>Sửa</TableCell>
            <TableCell style={{ width: '5%' }}>Xem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {status !== 'loading' && events.length > 0 &&
            events.map((event, index) => (
              <TableRow key={index} hover tabIndex={-1}>
                <TableCell  style={{ wordWrap: 'break-word' }}>{event.eventId}</TableCell>
                <TableCell className=' max-w-sm' style={{ wordWrap: 'break-word' }}>{event.eventName}</TableCell>
                <TableCell>
                  <img
                    className="object-cover w-[4rem] rounded-md"
                    src={event.banner ? `${import.meta.env.VITE_API_URL}/Event/Banner/${event.banner}` : 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'}
                    alt=""
                  />
                </TableCell>
                <TableCell>{event.percentage}%</TableCell>
                <TableCell>{event.startTime}</TableCell>
                <TableCell>{event.endTime}</TableCell>
                <TableCell>{event.status ? 'Hiển thị' : 'Ẩn'}</TableCell>
                <TableCell>
                  <button
                    type="button"
                    className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800 hover:bg-sky-700 transition text-white text-base rounded-md py-1 px-2 focus:outline-none"
                    onClick={() => {
                      setIsEditOpen(true);
                      setCurrentEvent(event);
                    }}
                  >
                    <FaEdit size={20} />
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800 hover:bg-sky-700 transition text-white text-base rounded-md py-1 px-2 focus:outline-none"
                    onClick={() => {
                      setIsViewOpen(true);
                      setCurrentEvent(event);
                    }}
                  >
                    <FaEye size={20} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          {status !== 'loading' && events.length === 0 && (
            <TableRow>
              <TableCell colSpan={10} style={{ textAlign: 'center' }}>
                Không tìm thấy bất cứ sự kiện nào.
              </TableCell>
            </TableRow>
          )}
          {status === 'loading' && (
            <TableRow>
              <TableCell className='flex items-center justify-center w-full' colSpan={10} style={{ textAlign: 'center' }}>
                <LuLoader2 size={30} className='animate-spin' />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div>
        {currentEvent && (
          <EditEventDialog
            isOpen={isEditOpen}
            handleOpen={handleEditOpen}
            data={currentEvent}
          />
        )}
        {currentEvent && (
          <ViewEventDialog
            isOpen={isViewOpen}
            handleOpen={handleViewOpen}
            data={currentEvent}
          />
        )}
      </div>
    </div>
  );
}
