import { useState } from "react";
import ActiveLayout from "../../../components/layouts/active-layout";
import { useGetPNMListQuery } from "../../../features/user/api/userApi";
import PNMList from "../../../features/user/components/pnm-list";
import useAuth from "../../../hooks/useAuth";
import PNMInfoModal from "../../../features/user/components/pnm-info-modal";
import { PNMUser } from "../../../types/userTypes";

const RecruitmentRoute = () => {
    const auth = useAuth();
    const [isPNMInfoModalOpen, setIsPNMInfoModalOpen] = useState<boolean>(false);
    const [selectedPNM, setSelectedPNM] = useState<string>(''); // Use string ID
    const [filteredPNMs, setFilteredPNMs] = useState<PNMUser[]>([]);

    const { data: pnms = [], isLoading } = useGetPNMListQuery(
        { userId: auth?.id || '', chapterId: auth?.chapter || '', semesterName: 'Spring 2025' },
        { skip: !auth }
    );

    return (
        <ActiveLayout>
            <div className="hidden lg:flex h-[184px] py-8 px-14">
                <div className="flex w-full justify-between gap-8">
                    <div className="flex-1 h-full bg-white rounded-2xl flex items-center shadow drop-shadow">
                        <div className="ml-10 font-bold text-3xl">Recruitment</div>
                    </div>
                </div>
            </div>
            <div className="lg:hidden flex pb-4 bg-[#E4EFF3]">
                <div className="flex w-full justify-between px-4">
                    <div className="flex-1 h-full bg-white rounded-lg p-1 flex justify-center items-center shadow drop-shadow">
                        <div className="font-bold text-xl">Recruitment</div>
                    </div>
                </div>
            </div>
            <PNMList
                pnms={pnms}
                onPNMInfoOpen={() => setIsPNMInfoModalOpen(true)}
                setSelectedPNM={setSelectedPNM} // Pass the setSelectedPNM handler
                setFilteredPNMs={setFilteredPNMs}
            />
            <PNMInfoModal
                pnms={pnms}
                selectedPNM={selectedPNM} // Pass the selected PNM ID
                filteredPNMs={filteredPNMs}
                isOpen={isPNMInfoModalOpen}
                onClose={() => setIsPNMInfoModalOpen(false)}
                setSelectedPNM={setSelectedPNM}
            />
        </ActiveLayout>
    );
};

export default RecruitmentRoute;
