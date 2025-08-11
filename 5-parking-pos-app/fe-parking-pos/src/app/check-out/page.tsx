'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/apiClient';
import Modal from '@/app/components/Modal';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface ParkingTicket {
    id: string;
    licensePlate: string;
    vehicleType: 'MOTORCYCLE' | 'CAR' | 'TRUCK' | 'BUS';
    checkInTime: string;
    checkOutTime: string | null;
    totalPrice: number | null;
    paymentType: string;
    status: 'parked' | 'paid';
}

export default function CheckOutPage() {
    const router = useRouter();

    const [licensePlate, setLicensePlate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentTicket, setCurrentTicket] = useState<ParkingTicket | null>(null);
    const [paymentMethod, setPaymentMethod] = useState('CASH');

    const handleFindTicket = async (e: React.FormEvent) => {
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
            const ticket = await apiClient.getTicketStatus(licensePlate);
            setCurrentTicket(ticket);
            setShowModal(true);
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

    const handleCheckOut = async () => {
        if (!currentTicket) return;
        setIsLoading(true);

        try {
            currentTicket.paymentType = paymentMethod;
            const finishedTicket = await apiClient.checkOut(currentTicket);
            Swal.fire({
                icon: 'success',
                title: 'Check-out berhasil',
                html: `Check-out berhasil untuk plat nomor <strong>${finishedTicket.licensePlate}</strong>.<br/>Total biaya: <strong>Rp${finishedTicket.totalPrice}</strong><br/>Dibayar dengan <strong>${paymentMethod}</strong>.`,
            }).then(() => {
                router.push('/');
            });
            setShowModal(false);
            setCurrentTicket(null);
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

    const calculateDuration = (checkIn: string): string => {
        const checkInTime = new Date(checkIn);
        const now = new Date();

        // duration in seconds
        const duration = (now.getTime() - checkInTime.getTime()) / 1000;

        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        return `${hours} jam ${minutes} menit`;
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
                <h1 className="mb-6 text-center text-4xl font-extrabold text-gray-800">
                    Check-out
                </h1>
                <form onSubmit={handleFindTicket}>
                    <div className="mb-6">
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
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full rounded-md py-3 font-semibold transition duration-150 ease-in-out ${isLoading
                            ? 'cursor-not-allowed bg-emerald-300 text-white'
                            : 'bg-emerald-600 text-white shadow-lg hover:bg-emerald-700'
                            }`}
                    >
                        Cari Tiket
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-indigo-600 hover:underline">
                        Kembali
                    </Link>
                </div>
            </div>

            {showModal && currentTicket && (
                <Modal onClose={() => setShowModal(false)}>
                    <h2 className="mb-4 text-2xl font-bold text-gray-800">Konfirmasi Pembayaran</h2>
                    <div className="space-y-4 text-gray-700">
                        <p>
                            <span className="font-semibold">Plat Nomor:</span> {currentTicket.licensePlate}
                        </p>
                        <p>
                            <span className="font-semibold">Waktu Check-in:</span>{' '}
                            {new Date(currentTicket.checkInTime).toLocaleString()}
                        </p>
                        <p>
                            <span className="font-semibold">Durasi:</span> {calculateDuration(currentTicket.checkInTime)}
                        </p>
                        <p className="text-xl font-bold text-indigo-600">
                            <span className="font-semibold">Total Biaya:</span> Rp{currentTicket.totalPrice}
                        </p>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700">
                            Metode Pembayaran
                        </label>
                        <select
                            id="payment-method"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm text-gray-900"
                        >
                            <option value="CASH">Tunai</option>
                            <option value="DEBIT">Debit</option>
                            <option value="QRIS">QRIS</option>
                        </select>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={() => setShowModal(false)}
                            className="rounded-md px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200"
                            disabled={isLoading}
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleCheckOut}
                            disabled={isLoading}
                            className={`rounded-md px-4 py-2 font-semibold text-white transition-colors ${isLoading
                                ? 'bg-green-300'
                                : 'bg-green-600 hover:bg-green-700'
                                }`}
                        >
                            Bayar & Check-out
                        </button>
                    </div>
                </Modal>
            )}
        </main>
    );
}
