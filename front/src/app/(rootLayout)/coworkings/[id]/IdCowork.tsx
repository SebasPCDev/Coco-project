"use client";
import { useState, useEffect } from 'react';
// import { IProduct } from "@/components/Card/types";
// import { Params } from './types';
import { CoworkDetail } from '@/components/CoworkDetail';
import getCowork from './getCowork';

export const IdCowork = ({ params }) => {
    
    const [cowork, setCowork] = useState(null);
    const [redirect, setRedirect] = useState<boolean>(false);

    useEffect(() => {
        const fetchCowork = async () => {
            const item = await getCowork(params.id);
            setCowork(item);
        };

        fetchCowork();
        console.log(cowork);
        
    }, [params.id]);

    useEffect(() => {
        if (cowork === undefined) {
            setRedirect(true);
        }
    }, [cowork]);

    if (redirect === true) {
        window.location.href = '/404';
        return null;
    }

    return (
        <div>
            {cowork ? (
                <div className="">
                    <CoworkDetail {...cowork}/>
                </div>
            ) : (
                <div className="flex h-[40rem] w-full items-center justify-center">
                    <div className="flex-col gap-4 w-full flex items-center justify-center">
                      <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-600 rounded-full">
                
                      </div>
                    </div>
                  </div>
            )}
        </div>
    );
};

export default IdCowork;
