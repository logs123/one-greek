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

    console.log(selectedEvent)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg ">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
                    <button
                        type="button"
                        className=""
                        onClick={onClose}
                    >
                        <IoIosClose size={32} color={'gray'} />
                    </button>
                </div>
                <QRCodeCanvas size={200} value={`onegreek.com/?chapterId=${selectedEvent.chapter}&eventId=${selectedEvent._id}`} />
            </div>
        </div>
    );
}

export default QRModal;