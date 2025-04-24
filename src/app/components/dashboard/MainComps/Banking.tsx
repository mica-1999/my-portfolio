"use client";
import { useState } from 'react';

export default function Banking() {
    const [hidden, setHidden] = useState(false);

    // Mock data for balance information
    const balanceData = {
        totalBalance: 8750.25,
        balanceMonth: 2450.75,
        withdrawal: 1250.50
    };

    // Format number with commas and 2 decimal places
    const formatNumber = (num: number) => {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    return (
        <div className="flex md:w-1/2 w-full">
            <div className="w-full rounded-xl bg-white shadow-md dark:bg-[#30334E]">
                <div className={hidden ? 'blur-sm' : ''}>
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h5 className="text-xl font-semibold text-gray-800 dark:text-[#d7d8ed]">Multibanco</h5>
                            <div>
                                <button onClick={() => setHidden(!hidden)} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white cursor-pointer">
                                    {hidden ?
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg> :
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    }
                                </button>
                            </div>
                        </div>
                        <h6 className="text-sm text-gray-600 dark:text-[#9698af]">Balance Overview</h6>
                    </div>
                    <div className="flex justify-evenly flex-wrap p-4">
                        <div className="flex gap-2 mb-3">
                            <div className="flex justify-center items-center w-10 h-10 bg-[#393C6A] rounded-md">
                                <span className="text-[#666CFF] text-lg">€</span>
                            </div>
                            <div>
                                <h5 className="text-base font-medium mb-0">{formatNumber(balanceData.totalBalance)}</h5>
                                <p className="text-sm text-gray-600 dark:text-[#9698af] mb-0">Total Balance</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mb-3">
                            <div className="flex justify-center items-center w-10 h-10 bg-[#3B4F48] rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#72E128]" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="text-base font-medium mb-0">{formatNumber(balanceData.balanceMonth)}</h5>
                                <p className="text-sm text-gray-600 dark:text-[#9698af] mb-0">This Month</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mb-3">
                            <div className="flex justify-center items-center w-10 h-10 bg-[#51374D] rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF4D49]" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="text-base font-medium mb-0">{formatNumber(balanceData.withdrawal)}</h5>
                                <p className="text-sm text-gray-600 dark:text-[#9698af] mb-0">New Transactions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}