import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import useAuth from '../../../hooks/useAuth';
import { useGetPnmEventsQuery } from '../api/eventApi';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { format } from 'date-fns';
import Spinner from '../../../components/ui/spinner/spinner';
import CheckinButton from './checkin-button';
import { FaMapPin } from 'react-icons/fa';
import { FaStar } from "react-icons/fa";

const PNMEvents = () => {
    const auth = useAuth();

    const { data: events = [], isLoading } = useGetPnmEventsQuery({ userId: auth?.id ?? '', organizationId: auth?.organization ?? '' }, { skip: !auth?.id || !auth?.organization });

    const sortedEvents = Array.isArray(events)
        ? [...events].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
        : [];

    if (!auth || isLoading) {
        return (
            <div className='w-full h-64 justify-center items-center flex'>
                <Spinner />
            </div>
        );
    }

    return (
        <div className='w-full'>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{ delay: 3000 }}
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 30
                    },
                    1536: {
                        slidesPerView: 5,
                        spaceBetween: 30
                    }
                }}
                pagination={{ clickable: true }}
                style={{padding: '10px'}}
            >
                {sortedEvents?.map((event) => (
                    <SwiperSlide key={event._id}>
                        <div className='relative bg-white h-64 p-4 rounded-lg drop-shadow-lg'>
                            <p className='font-bold mb-1'>{event.name}</p>
                            <div className='flex flex-col md:flex-row justify-between mb-2'>
                                <p className='text-xs text-gray-500'>{format(new Date(event.start), 'M/dd/yy')}</p>
                                <p className='text-xs text-gray-500'>{format(new Date(event.start), 'h:mmaaa')}-{format(new Date(event.end), 'h:mmaaa')}</p>
                            </div>
                            <p className='text-xs text-gray-500'>Hosted by:</p>
                            {event.chapter && 
                                <div className='flex items-center mb-3 gap-1'>
                                    <p className='text-sm'>{event.chapter.name}</p>
                                    {auth.pnmInfo?.chaptersFollowing.includes(event.chapter._id) &&
                                        <FaStar size={12} color={'#d4af37'}/>
                                    }
                                </div>
                            }
                            {event.location?.name && (
                                <div className='flex items-center'>
                                    <p className='text-sm'>{event.location?.name}</p>
                                    
                                </div>
                            )}
                            {event.location?.address && ( 
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location.address)}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-blue-500 text-sm hover:underline flex items-center gap-2'
                                >
                                    <FaMapPin size={12} color='red'/>
                                    Address
                                </a>
                            )}
                            {event.isAttendee ? (
                                <div className='absolute w-full left-0 bottom-6 flex justify-center'>
                                    <div className='flex items-center h-full justify-center text-white rounded p-1 px-3 bg-gray-300'>
                                        <p>Checked In</p>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className='absolute bottom-6 left-0 w-full'>
                                    <div className='flex justify-center'>
                                        <CheckinButton
                                            userId={auth.id}
                                            eventId={event._id}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default PNMEvents;