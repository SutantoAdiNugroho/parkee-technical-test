'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/apiClient';
import Swal from 'sweetalert2';

const vehicleTypes = ['MOTORCYCLE', 'CAR', 'TRUCK', 'BUS'];

export default function CheckInPage() {
    const [licensePlate, setLicensePlate] = useState('');
    const [vehicleType, setVehicleType] = useState(vehicleTypes[0]);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!licensePlate) {
            Swal.fire({
                icon: 'error',
                title: 'Input Error',
                text: 'Harap isi plat nomor',
            });
            return;
        }

        setIsLoading(true);
        try {
            const newTicket = await apiClient.checkIn(licensePlate, vehicleType as any);
            Swal.fire({
                icon: 'success',
                title: 'Check-in berhasil',
                html: `Tiket berhasil dibuat untuk plat nomor <strong>${newTicket.licensePlate}</strong> (${newTicket.vehicleType}).`,
            });
            setLicensePlate('');
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Terjadi Kesalahan',
                text: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
                <h1 className="mb-6 text-center text-4xl font-extrabold text-gray-800">
                    Check-in
                </h1>
                <form onSubmit={handleCheckIn}>
                    <div className="mb-4">
                        <label htmlFor="license-plate" className="block text-sm font-medium text-gray-700">
                            Plat Nomor Kendaraan
                        </label>
                        <input
                            type="text"
                            id="license-plate"
                            value={licensePlate}
                            onChange={(e) => setLicensePlate(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
                            placeholder="B 1234 ABC"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="vehicle-type" className="block text-sm font-medium text-gray-700">
                            Jenis Kendaraan
                        </label>
                        <select
                            id="vehicle-type"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
                            disabled={isLoading}
                        >
                            {vehicleTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full rounded-md py-3 font-semibold transition duration-150 ease-in-out ${isLoading
                            ? 'cursor-not-allowed bg-indigo-300 text-white'
                            : 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
                            }`}
                    >
                        {isLoading ? 'Memproses...' : 'Check-in Sekarang'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-indigo-600 hover:underline">
                        Kembali
                    </Link>
                </div>
            </div>
        </main>
    );
}
