const API_BASE_URL = 'http://localhost:8080';

interface ApiResponse<T> {
    status: number;
    data: T;
}

interface ApiErrorResponse {
    timestamp: string;
    status: number;
    error: string;
    path: string;
}

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

const handleResponse = async <T,>(response: Response): Promise<T> => {
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        const errorData: ApiErrorResponse = data;
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    return data as T;
};

export const apiClient = {
    checkIn: async (licensePlate: string, vehicleType: 'MOTORCYCLE' | 'CAR' | 'TRUCK' | 'BUS'): Promise<ParkingTicket> => {
        const response = await fetch(`${API_BASE_URL}/api/tickets/check-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ licensePlate, vehicleType }),
        });
        const apiResponse = await handleResponse<ApiResponse<ParkingTicket>>(response);
        return apiResponse.data;
    },

    checkOut: async (ticket: ParkingTicket): Promise<ParkingTicket> => {
        const response = await fetch(`${API_BASE_URL}/api/tickets/check-out`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ licensePlate: ticket.licensePlate, paymentType: ticket.paymentType }),
        });
        const apiResponse = await handleResponse<ApiResponse<ParkingTicket>>(response);
        return apiResponse.data;
    },

    getTicketStatus: async (licensePlate: string): Promise<ParkingTicket> => {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${licensePlate}/status`, {
            method: 'GET',
        });
        const apiResponse = await handleResponse<ApiResponse<ParkingTicket>>(response);
        return apiResponse.data;
    },
};
