import React from 'react';
import { ActiveEvent } from '../../../types/eventTypes';
import { IoIosClose } from 'react-icons/io';
import { QRCodeCanvas } from 'qrcode.react';

interface QRModalProps {
    selectedEvent: ActiveEvent | null;
    isOpen: boolean;
    onClose: () => void;
}

const QRModal: React.FC<QRModalProps> = ({ selectedEvent, isOpen, onClose }) => {
    if (!isOpen || !selectedEvent) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="flex w-96 md:w-1/2 flex-col items-center bg-white p-6 rounded-2xl shadow-lg ">
                <div className="flex justify-between w-full items-center mb-4">
                    <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
                    <button
                        type="button"
                        className=""
                        onClick={onClose}
                    >
                        <IoIosClose size={32} color={'gray'} />
                    </button>
                </div>
                <div className='flex justify-center items-center w-full h-full'>
                    <QRCodeCanvas
                        value={`onegreek.com/?chapterId=${selectedEvent.chapter}&eventId=${selectedEvent._id}`}
                        style={{ width: '50%', height: '50%'}}
                    />
                </div>
            </div>
        </div>
    );
}

export default QRModal;