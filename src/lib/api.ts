const API_BASE_URL = 'http://localhost:8080/api/v1';


interface AuthResponse {
    token: string;
    message: string;
    status: number;
}

export interface Letter {
    id: string;
    title: string;
    content: string;
    deliveryDate: string;
    status: 'PENDING' | 'DELIVERED' | 'CANCELLED';
    reminders: number;
    tags: string[];
    hasImage: boolean;
    hasVoice: boolean;
    imageUrl?: string;
    voiceUrl?: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export interface CreateLetterData {
    title: string;
    content: string;
    deliveryDate: string;
    reminders?: number;
    tags?: string[];
    hasImage?: boolean;
    hasVoice?: boolean;
    imageUrl?: string;
    voiceUrl?: string;
}

interface UpdateLetterData extends Partial<CreateLetterData> { }

interface LettersResponse {
    letters: Letter[];
    total: number;
}

interface LetterResponse {
    letter: Letter;
    message?: string;
}



const makeRequest = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        ...options,
    };

    try {
        const response = await fetch(url, defaultOptions);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.message || 'An error occurred');
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Network error occurred');
    }
};

export const apiClient = {
    signUp: async (email: string, password: string, name: string): Promise<AuthResponse> => {
        return makeRequest<AuthResponse>('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    email,
                    password,
                    name,
                }
            }),
        });
    },

    signIn: async (email: string, password: string): Promise<AuthResponse> => {
        return makeRequest<AuthResponse>('/auth/signin', {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    email,
                    password,
                }
            }),
        });
    },

    signOut: async (): Promise<{ message: string }> => {
        return makeRequest<{ message: string }>('/auth/signout', {
            method: 'POST',
        });
    },

    getCurrentUser: async (): Promise<any> => {
        return makeRequest<any>('/auth/me', {
            method: 'GET',
        });
    },

    createLetter: async (letterData: CreateLetterData): Promise<LetterResponse> => {
        return makeRequest<LetterResponse>('/letters', {
            method: 'POST',
            body: JSON.stringify({
                data: letterData
            }),
        });
    },

    getLetters: async (params?: { status?: string; limit?: number; offset?: number }): Promise<LettersResponse> => {
        const searchParams = new URLSearchParams();
        if (params?.status) searchParams.append('status', params.status);
        if (params?.limit) searchParams.append('limit', params.limit.toString());
        if (params?.offset) searchParams.append('offset', params.offset.toString());

        const queryString = searchParams.toString();
        const endpoint = queryString ? `/letters?${queryString}` : '/letters';

        return makeRequest<LettersResponse>(endpoint, {
            method: 'GET',
        });
    },

    getLetter: async (id: string): Promise<LetterResponse> => {
        return makeRequest<LetterResponse>(`/letters/${id}`, {
            method: 'GET',
        });
    },
    updateLetter: async (id: string, letterData: UpdateLetterData): Promise<LetterResponse> => {
        return makeRequest<LetterResponse>(`/letters/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                data: letterData
            }),
        });
    },

    deleteLetter: async (id: string): Promise<{ message: string }> => {
        return makeRequest<{ message: string }>(`/letters/${id}`, {
            method: 'DELETE',
        });
    },
};