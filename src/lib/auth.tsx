import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from './api';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    signUp: (email: string, password: string, name: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    error: string | null;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isAuthenticated = !!user;

    const clearError = () => setError(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await apiClient.getCurrentUser();
                setUser(userData);
            } catch (err) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const signUp = async (email: string, password: string, name: string) => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await apiClient.signUp(email, password, name);
            
            const userData = await apiClient.getCurrentUser();
            setUser(userData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Sign up failed';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };
    const signIn = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await apiClient.signIn(email, password);
            
            const userData = await apiClient.getCurrentUser();
            setUser(userData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Sign in failed';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            await apiClient.signOut();
            setUser(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Sign out failed';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated,
        signUp,
        signIn,
        signOut,
        error,
        clearError,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
